import { convertLegacyReactClassToComponent } from '../src/convert-react-class-to-component';

describe('convertLegacyReactClassToComponent', () => {
  it('should convert createReactClass to class extends React.Component', () => {
    const sourceCode = `
      var MyComponent = createReactClass({
        render: function() {
          return <div>Hello, {this.props.name}!</div>;
        }
      });
    `;
    const expectedOutput = `
      class MyComponent extends React.Component {
        render() {
          return <div>Hello, {this.props.name}!</div>;
        }
      }
    `;
    expect(convertLegacyReactClassToComponent(sourceCode)).toBe(expectedOutput);
  });

  // Add more test cases here
});