import React from 'react';
import { isAuthenticated, getCartProducts } from '../repository';
import {  Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import Cards from './Card';
import ProductItem from './ProductItem';
import { getProducts } from '../repository';

export default class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			total: 0,
			name : props.location.aboutProps,
			count:0,
			toShow: false,
			date : 'Click to see the date',
			showMe : true,
			redeemed : false,
			currName: 0
		}
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
	
	bringDate=()=>{
		const username = {
			name: this.state.name
		};
		Axios.post('http://localhost:5000/api/getDate', username)
			.then(res => {
				const value = res.data;
				console.log(value);
				this.setState({ date: value });
			}); 
	}
	countCall=()=>{
		const username = {
			name: this.state.name
		};
		Axios.post('http://localhost:5000/api/getCount', username)
			.then(res => {
				const value = res.data;
				console.log(value);
				this.setState({ count: value, toShow: true });
			}); 
	}
	
	redeem=(name)=>{
		console.log(name);
		this.setState({showMe:false, redeemed:true, currName: name});
	}
	
	clearCart = () => {
		localStorage.removeItem('cart');
	}
	render() {
		if (!isAuthenticated()) return (<Redirect to="/login" />);
		const { products, total } =  this.state;
		const cnt = this.state.count;
		const n1 = "Butter Chicken";
		const n2 = "Saag Paneer";
		const n3 = "Gajar ka Halwa";
		return (
			<div className=" container">
				<h1>Hii {this.state.name}, Just a step away from Delicious food</h1>
				<h3 className="card-title">Checkout</h3>
				<hr/>
				{this.state.showMe?
					<div>
					{
						products.map((product, index) => 
							<div key={index}>
								<p>
									{product.name} 
									<small> (quantity: {product.qty})</small>
									<span className="float-right text-primary">Rs {product.qty * product.price}</span>
								</p><hr/>
							</div>
						)
					}
				</div>: ''}
				
				<button onClick = {this.countCall}>Press me, Surprise for You</button>
				

				{this.state.count===1 && this.state.toShow  ? <div><h4>Today is your first Visit</h4><hr/><h4>In your second visit you will earn one item among three items : Butter Chicken, Saag Paneer and Gajar ka Halwa</h4></div> : ''}
				
				{this.state.count===2 && this.state.toShow ? 
					<div>
						<h4>You made your first visit on <button onClick={this.bringDate}>{this.state.date}</button></h4><hr/>
						<h4>Today is your second visit and you can redeem one dish among three items which are mentioned in the second visit entry in the loyalty program.</h4>
						<hr/>
						<h6>Butter Chicken</h6>
						<button onClick={(n1)=>this.redeem(n1)}>Redeem</button>
						
						<h6>Saag Paneer</h6>
						<button onClick={(n2)=>this.redeem(n2)}>Redeem</button>
						
						<h6>Gajar ka Halwa</h6>
						<button onClick={(n3)=>this.redeem(n3)}>Redeem</button>
						{this.state.redeemed ? <div>
							{	products.map((product, index) => 
								<div key={index}>
										{
											this.state.currName===product.name ? <div>
												{
													<p>	
														{product.name} 
														<small> (quantity: {product.qty +1})</small>
														<span className="float-right text-primary">Rs {product.qty * product.price}</span>			
													</p>
												}
											</div>:<div>
											<p>
														{product.name} 
														<small> (quantity: {product.qty})</small>
														<span className="float-right text-primary">Rs {product.qty * product.price}</span>			
													</p>
											</div>
										}
										<hr/>
								</div>
							)}
						</div>:''}
						<hr/>
					</div> : ''}
					{this.state.count===3 && this.state.toShow ? 
					<div>
						<h4>Today is your third visit</h4><hr/>
						<h4>In your second visit you will earn one item among three items : Tandoori Chicken, Chana Dal and Aloo Gobhi</h4>
						
					</div> : ''}
					
				{ products.length ? <div><h4><small>Total Amount:</small><span className="float-right text-primary">Rs {total}</span></h4><hr/></div>: ''}
				
				{ !products.length ? <h3 className="text-warning">No item on the cart</h3>: ''}
				
				{ products.length ? <button className="btn btn-success float-right" onClick={() => alert('Proceed to Pay')}>Pay</button>: '' }
				
				<Link to="/"><button className="btn btn-danger float-right" onClick={this.clearCart} style={{ marginRight: "10px" }}>Cancel</button></Link>
				<br/><br/><br/>
			</div>
		);
	}
}
