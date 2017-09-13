import React, { Component } from 'react';
import './App.css';

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
      <div>
       <p>{this.props.name} = ${this.props.price}</p>
       <button className="btn btn-primary" onClick={this.buy}>Buy</button>
       <button className="btn btn-primary" onClick={this.show}>Show</button>
       <button className="btn btn-primary" onClick={this.remove}>Remove</button>
       <h3>{this.state.qty}</h3>
       <h3>${this.state.qty*this.props.price}</h3>
       <hr />
       </div>
    );
  }
}

class Total extends Component {
  render() {
    return (
      <div>
      <h3>Total Balance:${this.props.total} </h3>
      </div>
    )
  }
}

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
    // alert(product.name+ " has been added");
    this.refs.name.value="";
    this.refs.price.value="";
  }

  render() {
    return(
      <form onSubmit={this.submit} class="form-group">
        <input className="form-control" type="text" placeholder="ITEM" ref="name"/>
        <input className="form-control" type="text" placeholder="PRICE" ref="price"/>
        <br/>
        <button className="btn btn-success">ADD ANOTHER STARBUCKS PRODUCT</button>
      </form>
    );
  }
}

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state={total:0, productList: [
    {name: "Pumpkin Spice Latte", price: 10},
    {name: "Salted Caramel Mocha", price: 9},
    {name: "Caramel Macchiato", price: 8},
    {name: "Chocolate Mocha", price: 7},
    {name: "Caffe Mocha", price: 6},
    {name: "Caffucino", price: 5},
    {name: "Caffe Latte", price: 4},
    {name: "Caffe Americano", price: 4}]
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
      <Product name={prod.name} price={prod.price}
             handleShow={component.showProduct}
             handleTotal={component.calcTotal}/>
      );
  });
  return(
    <div>
        <ProductForm handleCreate={this.createProduct}/>
       {products}
       <Total total={this.state.total}/>
    </div>
  )
}
}


export default ProductList;
