# Open File At Cursor, an extension for `vscode`

Use a keyboard shortuct to jump to file it's name is mentioned in the edited file (under the cursor). 

## Features

This extension is inspired by [Open file From Path](https://marketplace.visualstudio.com/items?itemName=jack89ita.open-file-from-path) extension. But instead of searching for the file it uses vscode's built-in functionality (command `quickOpen`).

## Shortcut
```
Open file : alt+d
```

## Extension Settings
 
* `openfileatcursor.filenameRegEx`: Custom matching regExp to detect the unquoted file (defaul words with dots and -). Default value:  `([\\w|\\.|\\-]+)`
* `openfileatcursor.shouldDefaultsToCurrentFile`: Use current file name (without extension) if no word is at the cursor location. Otherwise show error. Default value: `true`.
* `openfileatcursor.shouldUseSelection`: Use text selection to look for instead of a word at cursor position. Default value: `true`.

## Release Notes

### 0.0.1

Initial release.


-----------------------------------------------------------------------------------------------------------
