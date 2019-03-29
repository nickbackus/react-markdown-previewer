import React, { Component } from 'react';
import marked from "marked";
import './App.css';

const placeholder = 
`
# React Markdown Previewer
## Cool Sub Heading Text
### Super Sub Sub Heading:
  
Here is some inline code, \`<div></div>\`, between backticks.

\`\`\`
// Here is some multi-line code:

int foobar (foo, bar) {
  if ( "What language is this code?")
    return "It doesn't matter its just an example thats why the code doesn't make a lot of sense";
  else
    return "English?";
}

\`\`\`
  
**Fee Fi Fo Fum Im giant**
 _Im ~~Italian~~ Italic!_

You can make [links](http://www.nickbackus.com)

> Here Is A Block Quote

Whats that thing called that you put stuff on?

Oh ya | Tables | This is a header
------------ | ------------- | ------------- 
You can be here... | with me... | make your kitchen table...
jealous  | Has this gotten weird? | If It has, please contact me with a job offer

- Last but not least this is a list
  - A bulleted list!
     - With different types of bullets for different indentation

1. This is a numbered list
1. I totally lied about the bulleted list being last by the way
1. I mean, obviously because this is already below it


![Here is a placeholder picture](http://nickbackus.com/images/placeholder.png)
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {input: placeholder};
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e) {
    this.setState({input: e.target.value});
  }
  
  render() {
    return (
      <div>
        <div className="container col-12 bg-secondary rounded border">
          <p className="text-light text-center pt-2">Editor</p>
          <Editor value={this.state.input} onChange={this.handleChange}/>
        </div>
        <div className="container col-12 bg-secondary rounded border my-1">
          <p className="text-light text-center pt-2">Previewer</p>
          <Preview value={this.state.input}/>
        </div>
        <footer className="container col-12 bg-secondary text-light rounded border my-1 p-3">
          <p>Created Using React & Bootstrap</p>
          <p>Nick Backus 2018</p>
        </footer>
      </div>
     );
  }
}

class Editor extends React.Component {
  render() {
    return <textarea className="rounded border border-light mx-auto bg-light p-4" value={this.props.value} onChange={this.props.onChange} id="editor" />
  }
}

class Preview extends Component {
  render() {
    let value = this.props.value;
    console.log("value: " + value);
    
    let newValue = {__html: marked(value, {xhtml: true, breaks:true})};
    newValue.__html = newValue.__html.replace(/<pre><code>/ig, "<pre class='bg-dark text-light rounded p-1 m-2'><code>").replace(/<img/ig, "<img class='col-12 p-5'").replace(/<blockquote>/ig, "<blockquote class='blockquote text-secondary p-1 m-2 bg-white rounded border'>").replace(/<table>/ig, "<table class='table border rounded p-1 m-2'");
    console.log("marked: ", newValue)
    
    return <div id="preview" dangerouslySetInnerHTML={newValue} className="border bg-light rounded mx-auto my-2 p-4"/>;
  }
}

export default App;
