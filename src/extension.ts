import * as vscode from "vscode";
import showPdf from "./showPdf";

let nextPdfUri: vscode.Uri | undefined;

export function activate(context: vscode.ExtensionContext) {
  const test = vscode.Uri;
  let showPdfCommand = vscode.commands.registerCommand(
    "floxtension.showexercise",
    async () => {
      nextPdfUri = await showPdf(nextPdfUri);
    }
  );

  // vscode.window.onDidChangeActiveTextEditor(async (editor) => {
  //     if (editor) {
  //         vscode.window.showInformationMessage(nextPdfUri?.toString());
  //         const test = editor;
  //     }
  // });

  let showCommandMenu = vscode.commands.registerCommand(
    "floxtension.showCommandMenu",
    function () {
      vscode.window
        .showQuickPick([
          { label: "Show Exercise", command: "floxtension.showexercise" },
          { label: "Befehl 2", command: "extension.command2" },
        ])
        .then((selection) => {
          if (selection) {
            if (selection.label === "Befehl 2") {
              vscode.window
                .showQuickPick([
                  { label: "test1", command: "ahh" },
                  { label: "test2", command: "ahh" },
                  { label: "test3", command: "ahh" },
                ])
                .then((selection2) => {
                  if (selection2) {
                    vscode.window.showInformationMessage(selection2.label);
                  }
                });
            }
            vscode.commands.executeCommand(selection.command);
          }
        });
    }
  );

  context.subscriptions.push(showPdfCommand);
  context.subscriptions.push(showCommandMenu);
}

export function deactivate() {}
