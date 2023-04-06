export const convertLegacyReactClassToComponent = sourceCode => {
  // Replace createReactClass with React.Component
  let convertedText = sourceCode.replace(/var\s+(\w+)\s+=\s+createReactClass\({/g, 'class $1 extends React.Component {');

  // Replace the propTypes section with static propTypes
  convertedText = convertedText.replace(/propTypes:\s*{/, 'static propTypes = {');

  // Replace render: function with render()
  convertedText = convertedText.replace(/render:\s*function\s*\(\)/g, 'render()');

  // Replace the ending } with };
  convertedText = convertedText.replace(/(\s*)\}\s*\);(\s*)/g, '$1}$2');

  // Replace refs with React.createRef()
  convertedText = convertedText.replace(/React\.createRef\(\)/g, 'createRef()');

  // Replace mixins with regular class methods
  convertedText = convertedText.replace(/mixins:\s*\[(.*?)\]/gms, (match, mixins) => {
    const mixinMethods = mixins.split(',').map(mixin => mixin.trim()).map(mixin => `  ${mixin.split('.').pop()}() {}`).join('\n');
    return `${mixinMethods}\n`;
  });

  // Replace getDefaultProps with a default value for static defaultProps
  convertedText = convertedText.replace(/getDefaultProps\(\)\s*{\s*return\s*{([\s\S]*?)\s*};\s*}/gm, 'static defaultProps = {$1};');

  // Replace getInitialState with a constructor that initializes state
  convertedText = convertedText.replace(/getInitialState\(\)\s*{\s*return\s*{([\s\S]*?)\s*};\s*}/gm, 'constructor(props) {\n    super(props);\n    this.state = {$1};\n  }');

  return convertedText;
};