import React from 'react';
import { Link } from 'react-router-dom';
import { getCartProducts } from '../repository';
import CartItem from './CartItem';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			total: 0,
			startDate : new Date(),
			name : ' ',
			count: 0
		};
		
		this.handleInputChange =this.handleInputChange.bind(this);
	}

	componentWillMount() {
		let cart = localStorage.getItem('cart');
		if (!cart) return; 
		getCartProducts(cart).then((products) => {
			let total = 0;
			for (var i = 0; i < products.length; i++) {
				total += products[i].price * products[i].qty;
			}
	    	this.setState({ products, total });
	    });
	}

	removeFromCart = (product) => {
		let products = this.state.products.filter((item) => item.id !== product.id);
		let cart = JSON.parse(localStorage.getItem('cart'));
		delete cart[product.id.toString()];
		localStorage.setItem('cart', JSON.stringify(cart));
		let total = this.state.total - (product.qty * product.price) 
		this.setState({products, total});
	}

	clearCart = () => {
		localStorage.removeItem('cart');
		this.setState({products: []});
	}
	
	handleChange (e){
		console.log(e.getDate());
		this.setState({
		  startDate: e
		});
	  };

	handleInputChange(event) {
		this.setState({name: event.target.value});
	  }
	  

	insertion =()=>{
			console.log(this.state.name);
			console.log(this.state.date);
			var prod = new String(" ");
			var comma = new String(" , ");
			const products = this.state.products;

			products.map((product) => prod = prod.concat(product.name,comma));
			console.log(prod);
			var yr = this.state.startDate.getFullYear();
			const fyr = yr.toString();
			var mnth = this.state.startDate.getMonth();
			const fmnth = mnth.toString();
			var day = this.state.startDate.getDate();
			const fday = day.toString();
			var dt = new String(" ");
			dt = dt.concat(fyr,"-",fmnth,"-",fday);
			//console.log(dt);
			const visitor = {
				name: this.state.name,
				ID : this.state.total,
				date : dt,
				products: prod
			}
			
			axios.post('http://localhost:5000', visitor)
			.then(res => {
				const user = res.data;
				this.setState({ name: user.name });
			});  
			
			 
			
	  }
	render() {
		const { products, total } =  this.state;
		return (
			<div className=" container">
				<h3 className="card-title">Cart</h3>
				<hr/>
				<DatePicker
					selected={this.state.startDate}
					onChange={(e) => this.handleChange(e)}
					dateFormat = "yyyy-MM-dd"
				/>
				<hr/>
				<label>Please enter your username here: </label>
                  <input type="text" className="form-control" name={this.state.name} onChange={this.handleInputChange}/>
                <hr/>
				{
					products.map((product, index) => <CartItem product={product} remove={this.removeFromCart} key={index}/>)
				}
				<hr/>
				{ products.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">Rs {total}</span></h4><hr/></div>: ''}

				{ !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
				<Link to={{pathname: '/checkout',
					aboutProps:this.state.name
					}} ><button onClick = {this.insertion} className="btn btn-success float-right">Checkout</button></Link>
				<button className="btn btn-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Clear Cart</button>
				<br/><br/><br/>
			</div>
		);
	}
}
