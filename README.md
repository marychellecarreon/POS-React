# Basic React Tutorial


## Table of Contents
 - [Setup/Installation](#setup/installation)

This tutorial aims to teach you how to create a POS app "point of sale". For this case, my POS is a coffee product but this POS is generally applicable for all items with cashier interface. Feel free to fork it!

# Setup/Installation
Install [node.js](https://nodejs.org/en/)

Install [Create-react-app] (https://facebook.github.io/react/docs/installation.html) which will generate your starting files

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
Since we will create the app from scratch, on App.js, please remove everything inside return. 
The structure of your App.js should look similar as below.

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
   Main item in this POS system : buy, show or remove the order which we need to define in the "Product" Component as shown    below.
   
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

Let's create an array of product which we can create in another new component; for this case I have added the coffee menu, price and the image for each array which is saved in the image in the public folder.

We can define the function that we want before render [or after super(props)]. 
For this case, we have defined the calcTotal, createProduct and showProduct.

- calcTotal - compute for the cost of the item purchase (qty * price) per item.
- showProduct - alert on screen on the item chosen
- createProduct - Create another item/product not included in the item inside the array below.

```sh
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state={total:0, productList: [
    {name: "PUMPKIN SPICE LATTE", price: 10, img_id: "00"},
    {name: "SALTED CARAMEL MOCHA", price: 9, img_id: "01" },
    {name: "CARAMEL MACCHIATO", price: 8, img_id: "02" },
    {name: "CHOCOLATE MOCHA", price: 7, img_id: "03" },
    {name: "CAFE MOCHA", price: 6, img_id: "04"},
    {name: "CAPPUCINO", price: 5, img_id: "05"},
    {name: "CAFFE LATTE", price: 4, img_id: "06"},
    {name: "CAFFE AMERICANO", price: 4, img_id: "07"}]
  };
  this.calcTotal = this.calcTotal.bind(this);
    this.createProduct =this.createProduct.bind(this);
  }

  calcTotal(price) {
    this.setState({total: this.state.total + price})
  }

  showProduct(name) {
    alert("You are buying "+name);
  }

  createProduct(product) {
    this.setState({productList: this.state.productList.concat(product)
    });
  }

  render() {
  var component = this;
    var products = this.state.productList.map(
      function(prod){
    return(
       <h1><Product name={prod.name} price={prod.price}
       handleShow={component.showProduct}
       handleTotal={component.calcTotal}/></h1>
       <img src={process.env.PUBLIC_URL + 'img/img'+ prod.img_id +'.png'} />
      );
  });
  return(
        <ProductForm handleCreate={this.createProduct}/>
       {products}
            <Total total={this.state.total}/>
  )
}
}
export default ProductList;
```

# Handling Forms
 Create a new component: ProductForm with three inputs and a submit button
```sh
     class ProductForm extends Component {
     constructor(props) {
     super(props);
     this.submit = this.submit.bind(this);
      }
     submit(e) {
      e.preventDefault();
      var product = {
          name:this.refs.name.value,
          price:parseInt(this.refs.price.value)
       };
        this.props.handleCreate(product);
        this.refs.name.value="";
        this.refs.price.value="";
       }

      render() {
        return(
        <form onSubmit={this.submit} class="form-group">
        <input className="form-control" type="text" placeholder="ITEM" ref="name"/>
           <input className="form-control" type="text" placeholder="PRICE" ref="price"/>
        <button className="btn btn-success">ADD ANOTHER STARBUCKS PRODUCT</button>
       </form>
    );
  }
}
```
