# Basic React Tutorial

A basic react tutorial bootstraped with create-react app.
This tutorial aims to teach you how to create a POS app "point of sale". For this case, my POS is a coffee product but this POS is generally applicable for all items with cashier interface.

# Setup / Installation
Install [node.js](https://nodejs.org/en/)
Install [Create-react-app] (https://facebook.github.io/react/docs/installation.html)
Generate your starting files 

```sh
create-react-app my-app
```


After generating your starter files, your file should have like this:
  ```sh
      my-app/
         README.md
         node_modules/
         package.json
         public/
             index.html
             favicon.ico
         src/
             App.css
             App.js
             App.test.js
             index.css
             index.js
             logo.svg
```

In the project directory, run:
```sh
  npm start
```

Then, open the [http://localhost:3000](http://localhost:3000) in your browser.
Please note that the page will automatically make a reload everytime you edit.

 
You can now open your app in your preferred text editor.
Since we will create the app from scratch, on App.js, please remove everything inside return. The structure of your App.js should look similar as below.

```sh
   import React, { Component } from 'react';
   import logo from './logo.svg';
   import './App.css';

    class App extends Component {
       render() {
         return (
            <div className="App">
            </div>
               );
               }
              }
export default App;
```

Make sure also to delete all the details inside the App.css so that you can create the format / styling that you prefer.
  
 # Creating new components
   Components are the heart and soul of React.
   Let's create a new component called "Product". 
   Main item in POS system is to be able to buy, show or remove the order which we need to define in the "Product" Component.
   
   ```sh
    class Product extends Component {
    constructor(props) {
          super(props);
          this.state = {qty:0};
          this.buy = this.buy.bind(this);
          this.show = this.show.bind(this);
          this.remove = this.remove.bind(this);
     }
            buy() {
         this.setState({qty: this.state.qty + 1});
         this.props.handleTotal(this.props.price);
     }

         show() {
         this.props.handleShow(this.props.name);
     }

         remove() {
         this.setState({qty: this.state.qty - 1});
         this.props.handleTotal(-this.props.price);
     }

         render() {
         return (
          <h1>{this.props.name} = ${this.props.price}</h1>
          <h2>{this.state.qty} Orders  = 
          Price: ${this.state.qty*this.props.price}</h2>
          <button className="btn btn-success" onClick={this.buy}> + </button>
         <button className="btn btn-success" onClick={this.remove}> - </button>
         <button className="btn btn-success" onClick={this.show}> SHOW </button>
    );
  }
}
```
