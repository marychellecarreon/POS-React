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
          <center><h1>{this.props.name} = ${this.props.price}</h1></center>
          <center><h2>{this.state.qty} Orders  = Price: ${this.state.qty*this.props.price}</h2></center>
          <center><button className="btn btn-success" onClick={this.buy}> + </button>
                  <button className="btn btn-success" onClick={this.remove}> - </button>
                  <button className="btn btn-success" onClick={this.show}> SHOW </button></center>
          </div>
    );
  }
}

class Total extends Component {
  render() {
    return (
           <h3>Total Cost : $ {this.props.total} </h3>
  );
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
      <div className="container">
          <div className="row">
              <div className="col-md-4">
                   <input className="form-control" type="text" placeholder="ITEM" ref="name"/>
              </div>
              <div className="col-md-4">
                   <input className="form-control" type="text" placeholder="PRICE" ref="price"/>
              </div>
              <div className="col-md-4">
                    <button className="btn btn-success">ADD ANOTHER STARBUCKS PRODUCT</button>
              </div>
          </div>
    </div>
      </form>
    );
  }
}

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
               <div className="col col-xs-12 col-md-3">
                  <h1><Product name={prod.name} price={prod.price}
                  handleShow={component.showProduct}
                  handleTotal={component.calcTotal}/></h1>
               <div className="coffee">
                 <img src={process.env.PUBLIC_URL + 'img/img'+ prod.img_id +'.png'} className="img-responsive"/>
         </div>
         </div>
      );
  });
  return(
    <div className="container">
        <ProductForm handleCreate={this.createProduct}/>
       {products}
       <Total total={this.state.total}/>
    </div>
  )
}
}


export default ProductList;
