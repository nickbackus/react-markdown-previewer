import React, { Component } from 'react';
import marked from "marked";
import './App.css';

const placeholder = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](http://www.nickbackus.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Heres another item 
1. The list goes on...


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
