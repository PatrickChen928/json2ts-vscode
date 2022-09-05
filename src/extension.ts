// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as copyPaste from "copy-paste";
let request = require("request");
import json2ts from "@cyly/json2ts";
import { isJson } from "./util";

export function activate(context: vscode.ExtensionContext) {
    let clipboardJson2ts = vscode.commands.registerCommand("convert.json2ts", () => {
        copyPaste.paste((error, content) => {
            if (isJson(content)) {
                convert(content);
            } else {
                vscode.window.showErrorMessage("Clipboard has no valid JSON content.");
            }
        });
    });

    let restJson2ts = vscode.commands.registerCommand("rest.json2ts", () => {
        copyPaste.paste((error, content) => {
            if (content && content.indexOf("http") > -1) {
                callRestService(content);
            } else {
                vscode.window.showInputBox({ prompt: "Insert your REST-Service URL." })
                    .then((userInput) => {
                        if (content && content.indexOf("http") > -1) {
                            callRestService(userInput);
                        } else {
                            vscode.window.showErrorMessage("No valid REST-Service URL.");
                        }
                    });
            }
        });

        function callRestService(url: string) {
            vscode.window.setStatusBarMessage("Call " + url + "...");
            request(url, (error, response, body) => {
                if (isJson(body)) {
                    convert(body);
                } else {
                    vscode.window.showErrorMessage("REST-Service has no valid JSON result.");
                }
            });
        }
    });

    context.subscriptions.push(clipboardJson2ts, restJson2ts);
}

function convert(content: string) {
    vscode.window.setStatusBarMessage("Convert JSON to TypeScript interfaces...");

    try {
        let result = json2ts(content, {
            comment: "block",
            parseArray: true,
            optimizeArrayOptional: true,
            genType: "interface"
        });
        vscode.window.activeTextEditor.edit((editBuilder) => {
            let startLine = vscode.window.activeTextEditor.selection.start.line;
            let lastCharIndex = vscode.window.activeTextEditor.document.lineAt(startLine).text.length;
            let position = new vscode.Position(startLine, lastCharIndex);
            editBuilder.insert(position, result);

            vscode.window.setStatusBarMessage("Here are your TypeScript interfaces... Enjoy! :)");
        });
    } catch(e) {}
}

// this method is called when your extension is deactivated
export function deactivate() {
}