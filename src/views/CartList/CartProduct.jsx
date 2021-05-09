import React, { useState } from 'react';
import {
	ADD_PRODUCT_IN_CART,
	REMOVE_PRODUCT_FROM_CART,
	useCart
} from '../../context/cart';
import { fetchApi, getUserId } from '../../helper';
import { toast } from '../../helper/toast';
import './CartProduct.css';

const Product = ({ productDetails }) => {
	const [isCardDisabled, setIsCardDisabled] = useState(false);

	const {
		_id,
		name,
		image,
		price,
		productName,
		offer,
		inStock,
		level,
		fastDelivery,
		quantity
	} = productDetails;

	const { dispatch } = useCart();

	const removeProductInCartList = async () => {
		try {
			setIsCardDisabled(true);
			const data = { product: _id, quantity: quantity - 1 };
			const userId = getUserId();
			const { message } = await fetchApi({
				method: 'post',
				url: `/carts/${userId}`,
				data
			});
			toast({ type: 'success', message });

			dispatch({
				type: REMOVE_PRODUCT_FROM_CART,
				payload: { productId: _id }
			});
		} catch (error) {
			toast({ type: 'error', message: error.message });
		} finally {
			setIsCardDisabled(false);
		}
	};

	const addProductInCartList = async () => {
		try {
			setIsCardDisabled(true);
			const data = { product: _id, quantity: quantity + 1 || 1 };
			const userId = getUserId();
			const { message } = await fetchApi({
				method: 'post',
				url: `/carts/${userId}`,
				data
			});

			toast({ type: 'success', message });

			dispatch({
				type: ADD_PRODUCT_IN_CART,
				payload: { productId: _id }
			});
		} catch (error) {
			toast({ type: 'error', message: error.message });
		} finally {
			setIsCardDisabled(false);
		}
	};

	return (
		<div className={`small-horizontal-card ${isCardDisabled ? 'disabled' : ''}`}>
			<img className="small-horizontal-card__img" src={image} alt="img" />

			<div className="small-horizontal-card__body">
				<div className="header">
					<p className="">{name}</p>
					<p className="">Rs. {price}</p>
				</div>

				<div className="footer">
					<button
						className="btn secondary-btn icon-only-btn icon-only-btn-sm"
						onClick={removeProductInCartList}
					>
						<span className="icon material-icons">remove</span>
					</button>
					<span>{quantity}</span>
					<button
						className="btn secondary-btn icon-only-btn icon-only-btn-sm"
						onClick={addProductInCartList}
					>
						<span className="icon material-icons">add</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Product;
