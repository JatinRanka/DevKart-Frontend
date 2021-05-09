import React from 'react';
import CartProduct from './CartProduct';
import { useCart } from '../../context/cart';
import emptyCartImage from '../../assets/images/empty-cart.svg';
import './index.css';

const renderEmptyCart = () => {
	return (
		<div className="empty-cart-container">
			<img className="empty-cart-img" src={emptyCartImage} />
			<p className="heading-4">Cart is empty.</p>
		</div>
	);
};

const CartList = () => {
	const { state } = useCart();
	const { cartList } = state;

	return (
		<div className="cart-list">
			{!cartList || cartList.length === 0
				? renderEmptyCart()
				: cartList.map((productDetails) => {
						return (
							<CartProduct
								key={productDetails._id}
								productDetails={productDetails}
							/>
						);
				  })}
		</div>
	);
};

export default CartList;
