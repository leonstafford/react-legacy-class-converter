import { vscode } from require('vscode');
import { convertLegacyReactClassToComponent } from '../src/convert-react-class-to-component';

function activate(context) {

  // Get the current editor
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;

    // Get the selected text
    const selection = editor.selection;
    const text = document.getText(selection);

    const convertedText = convertLegacyReactClassToComponent(text);

    // Replace the old text with the new text
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, convertedText);
    });
  }
}

module.exports = {
  activate
};
