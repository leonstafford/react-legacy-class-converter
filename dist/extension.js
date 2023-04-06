const vscode = require('vscode');

function activate(context) {

  // Get the current editor
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;

    // Get the selected text
    const selection = editor.selection;
    const text = document.getText(selection);

    // Replace createReactClass with React.Component
    let convertedText = text.replace(/var\s+(\w+)\s+=\s+createReactClass\({/g, 'class $1 extends React.Component {');

    // Replace the propTypes section with static propTypes
    convertedText = convertedText.replace(/propTypes:\s*{/, 'static propTypes = {');

    // Replace function declarations with arrow functions
    convertedText = convertedText.replace(/(\w+)\s*:\s*function\s*\(/g, '$1 = (');

    // Replace this keyword with this.state
    convertedText = convertedText.replace(/this\.(props|state)\./g, 'this.');

    // Replace createReactClass with React.Component
    convertedText = convertedText.replace(/createReactClass\({/g, 'Component {');

    // Add the render method if it's missing
    if (!convertedText.includes('render()')) {
      convertedText += '\n  render() {\n    return null;\n  }\n';
    }

    // Replace this.state with this
    convertedText = convertedText.replace(/this\.state\./g, 'this.');

    // Replace refs with React.createRef()
    convertedText = convertedText.replace(/React\.createRef\(\)/g, 'createRef()');

    // Replace mixins with regular class methods
    convertedText = convertedText.replace(/mixins:\s*\[(.*?)\]/gms, (match, mixins) => {
      const mixinMethods = mixins
        .split(',')
        .map((mixin) => mixin.trim())
        .map((mixin) => `  ${mixin.split('.').pop()}() {}`)
        .join('\n');
      return `${mixinMethods}\n`;
    });

    // Replace getDefaultProps with a default value for static defaultProps
    convertedText = convertedText.replace(/getDefaultProps\(\)\s*{\s*return\s*{([\s\S]*?)\s*};\s*}/gm, 'static defaultProps = {$1};');

    // Replace propTypes with a default value for static propTypes
    convertedText = convertedText.replace(/propTypes:\s*{([\s\S]*?)}/gm, 'static propTypes = {$1};');

    // Replace getInitialState with a constructor that initializes state
    convertedText = convertedText.replace(/getInitialState\(\)\s*{\s*return\s*{([\s\S]*?)\s*};\s*}/gm, 'constructor(props) {\n    super(props);\n    this.state = {$1};\n  }');

    // Replace the old text with the new text
    editor.edit((editBuilder) => {
      editBuilder.replace(selection, convertedText);
    });
  }
}

module.exports = {
  activate
};
