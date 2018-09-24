# Open File At Cursor, an extension for `vscode`

Simple [VSCode extension](https://marketplace.visualstudio.com/items?itemName=ivoh.openfileatcursor) to use a keyboard shorcut to jump to file its name is mentioned in the edited file (under the cursor). Can help to navigate source code of language wihtout installed intellisense support or multi-language projects where components are just loosely coupled via their name references. Can jump with one click to referenced files in text. e.g. shell file can reference sql file or python file or java/scala class loader parameter, etc...

## Features

This extension is inspired by [Open file From Path](https://marketplace.visualstudio.com/items?itemName=jack89ita.open-file-from-path) extension. But instead of implementing searching for the file it uses vscode's built-in functionality (command `quickOpen`).

## Shortcut
```
Open file : alt+d
```

## Extension Settings
 
* `openfileatcursor.filenameRegEx`: Custom matching regExp to detect the unquoted file (defaul words with dots and -). Default value:  `([\\w|\\.|\\-]+)`
* `openfileatcursor.shouldDefaultToCurrentFile`: Use current file name (without file extension) if no word is at the cursor location. Otherwise show error. Default value: `true`. This can help to navigate to test files, configuration files, sql files or other type of files having the same base name or different extension than the current file.
* `openfileatcursor.shouldUseSelection`: Use text selection than the current word under cursor in case text is selected. Default value: `true`.

## Release Notes

### 0.1.0

Initial release.


-----------------------------------------------------------------------------------------------------------
