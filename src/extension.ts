import * as vscode from "vscode";
import showPdf from "./showPdf";

let nextPdfUri: vscode.Uri | undefined;

export function activate(context: vscode.ExtensionContext) {
  const test = vscode.Uri;
  let showPdfCommand = vscode.commands.registerCommand(
    "floxtension.showexercise",
    async () => {
      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor) {
        vscode.window.showInformationMessage(
          `Type of active editor: ${activeEditor.viewColumn}`
        );
      } else {
        const visibleEditors = vscode.window.visibleTextEditors
          .map((editor) => editor.document.fileName)
          .join(", ");

        // Versuche herauszufinden, ob eine PDF-Datei als Webview oder Custom Editor geöffnet ist
        // const pdfEditors = vscode.window.tabGroups.all
        //   .flatMap((group) => group.tabs)
        //   .filter(
        //     (tab) =>
        //       tab.input &&
        //       tab.input.uri &&
        //       tab.input.uri.fsPath.endsWith(".pdf")
        //   )
        //   .map((tab) => tab.input.uri.fsPath)
        //   .join(", ");

        // const message = `Visible Text Editors: ${visibleEditors}\nVisible PDF Editors: ${pdfEditors}`;
        // vscode.window.showInformationMessage(message);
      }
      nextPdfUri = await showPdf(nextPdfUri);
    }
  );

  vscode.window.onDidChangeActiveTextEditor(async (editor) => {
    const tabGroups = vscode.window.tabGroups.all;
    let message = "Active Tabs:\n";
    tabGroups.forEach((group) => {
      const activeTab = group.activeTab;
      const groupInfo = `Group: ${group.viewColumn}, Active Tab: ${
        activeTab ? activeTab.label : "None"
      }\n`;
      message += groupInfo;
    });

    vscode.window.showInformationMessage(message);
  });

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
