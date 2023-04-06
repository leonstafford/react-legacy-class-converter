import { convertReactClassToComponent } from '../src/convert-react-class-to-component';

describe('convertReactClassToComponent', () => {
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
    expect(convertReactClassToComponent(sourceCode)).toBe(expectedOutput);
  });

  it('should add a render method if missing', () => {
    const sourceCode = `
      var MyComponent = createReactClass({
        helloWorld: function() {
          console.log('Hello, world!');
        }
      });
    `;
    const expectedOutput = `
      class MyComponent extends React.Component {
        render() {
          return null;
        }

        helloWorld() {
          console.log('Hello, world!');
        }
      }
    `;
    expect(convertReactClassToComponent(sourceCode)).toBe(expectedOutput);
  });

  // Add more test cases here
});