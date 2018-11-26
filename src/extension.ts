'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    const extConfiguration = vscode.workspace.getConfiguration("openfileatcursor");
    const filenameRegEx = extConfiguration.get<string>("filenameRegEx");
    const shouldDefaultToCurrentFile = extConfiguration.get<boolean>("shouldDefaultToCurrentFile");
    const shouldUseSelection = extConfiguration.get<boolean>("shouldUseSelection");

    if (filenameRegEx === undefined || shouldDefaultToCurrentFile === undefined || shouldUseSelection === undefined) {
        console.error("Configuration section is not valid.");
        return;
    }

    const regex = new RegExp(filenameRegEx);

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log(`Extension 'openfileatcursor' is now active!`);



    function showErrorMsg(message: string) {
        vscode.window.showErrorMessage(message);
        console.error(message);
    }

    function getFilenameFromPath(filepath: string) {
        let filename = filepath.split("/").pop();

        if (filename === undefined) {
            return "";
        }
        let filenameCoreMatch = filename.match('([\\w|\\-]+)');
        if (filenameCoreMatch === null) {
            return "";
        }
        return filenameCoreMatch[1];
    }

    function getFilenameFromCurrentFile(currentFilename: string) {
        let openedNormalizedFilePath = currentFilename.replace(/\\/g, '/');
        let filename = getFilenameFromPath(openedNormalizedFilePath);

        console.log(`Opened file is '${filename}' and path is '${openedNormalizedFilePath}'`);
        return filename;
    }

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json


    let disposableOpenRelatedCommand = vscode.commands.registerTextEditorCommand('extension.openRelatedFile', (texteditor: vscode.TextEditor) => {
        // The code you place here will be executed every time your command is executed
        let filename = getFilenameFromCurrentFile(texteditor.document.fileName);

        if (filename.length > 0)
        {
          filename = filename.trim();
          console.log(`ExecuteCommand quickOpen with file '${filename}'`);
          // open dialog Go to File (Ctrl-P) with the file
          vscode.commands.executeCommand('workbench.action.quickOpen', filename);
        }  
    });
    console.log(`Command "extension.openRelatedFile" registered.`);
    context.subscriptions.push(disposableOpenRelatedCommand);


    let disposableOpenFileAtCursorCommand = vscode.commands.registerTextEditorCommand('extension.openFileAtCursor', (texteditor: vscode.TextEditor) => {
        // The code you place here will be executed every time your command is executed

        const selection = texteditor.selection;
        let filename = "";

        if (selection.isEmpty || !shouldUseSelection) {
            let filenameUnderCursor = texteditor.document.getWordRangeAtPosition(selection.active, regex);
            if (filenameUnderCursor === undefined) {
                if (shouldDefaultToCurrentFile) {
                    filename = getFilenameFromCurrentFile(texteditor.document.fileName);
                } else {
                    showErrorMsg("Current position does not point to any word. Move cursor to word or select text.");
                    return;          
                }
            } else {
                const selectedWord = texteditor.document.getText(filenameUnderCursor);
                let lastPart = selectedWord.split('/').pop();
                if (lastPart !== undefined) {
                    filename = lastPart;
                }
                console.log(`Word at cursor is file:'${lastPart}' path:'${selectedWord}'`);
            }
        } else {
            filename = texteditor.document.getText(selection);
            console.log(`Selection is '${filename}'`);
        }

        if (filename.length > 0)
        {
          filename = filename.trim();
          console.log(`ExecuteCommand quickOpen with file '${filename}'`);
          // open dialog Go to File (Ctrl-P) with the file
          vscode.commands.executeCommand('workbench.action.quickOpen', filename);
        }  
    });
    console.log(`Command "extension.openFileAtCursor" registered.`);
    context.subscriptions.push(disposableOpenFileAtCursorCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {
}