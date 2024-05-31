import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

const showPdf = async (nextPdfUri: vscode.Uri | undefined) => {
  if (vscode.window.activeTextEditor) {
    const currentFile = vscode.window.activeTextEditor.document.fileName;
    const currentDir = path.dirname(currentFile);

    const pdfFiles = fs
      .readdirSync(currentDir)
      .filter((file) => file.endsWith(".pdf"))
      .sort();
    const currentIndex = pdfFiles.indexOf(path.basename(currentFile));
    const nextIndex = (currentIndex + 1) % pdfFiles.length;
    const nextPdf = path.join(currentDir, pdfFiles[nextIndex]);
    nextPdfUri = vscode.Uri.file(nextPdf);

    const uri = vscode.Uri.file(nextPdf);
    await vscode.commands.executeCommand("workbench.action.splitEditorRight");
    await vscode.commands.executeCommand("vscode.open", uri);
    await vscode.commands.executeCommand(
      "workbench.action.closeEditorsToTheLeft"
    );
  } else if (nextPdfUri) {
    const visibleEditors = vscode.window.visibleTextEditors.map((editor) =>
      editor.document.uri.toString()
    );
    const nextPdfUriString = nextPdfUri.toString();
    await vscode.commands.executeCommand(
      "workbench.action.closeActiveEditor",
      nextPdfUri
    );
  }

  return nextPdfUri;
};

export default showPdf;
