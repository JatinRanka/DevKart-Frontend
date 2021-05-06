import React, { useState } from 'react';
import Product from '../../components/Product';
import Filter from './Filter';
import { useCart } from '../../context/cart';
import './index.css';

const getSortedData = ({ productsList, sortBy }) => {
	if (!sortBy) return productsList;

	let sortedProductsList = [...productsList];
	switch (sortBy) {
		case 'LOW_TO_HIGH':
			return sortedProductsList.sort((product1, product2) => {
				return product1.price - product2.price;
			});

		case 'HIGH_TO_LOW':
			return sortedProductsList.sort((product1, product2) => {
				return product2.price - product1.price;
			});

		default:
			return sortedProductsList;
	}
};

const getFilteredData = ({
	productsList,
	includeOutOfStock,
	fastDeliveryOnly,
	maxPriceRange
}) => {
	productsList = productsList.filter((product) => {
		if (product.price > maxPriceRange) {
			return null;
		}

		if (fastDeliveryOnly && !product.fastDelivery) {
			return null;
		}

		if (!includeOutOfStock && !product.inStock) {
			return null;
		}

		return product;
	});

	return productsList;
};

const ProductsList = () => {
	const [showFilter, setShowFilter] = useState(false);
	const { state } = useCart();
	const {
		productsList,
		sortBy,
		includeOutOfStock,
		fastDeliveryOnly,
		maxPriceRange
	} = state;
	const sortedProductsList = getSortedData({ productsList, sortBy });
	const filteredProductsList = getFilteredData({
		productsList: sortedProductsList,
		includeOutOfStock,
		fastDeliveryOnly,
		maxPriceRange
	});

	const handleFilterShow = () => {
		setShowFilter((showFilter) => !showFilter);
	};

	return (
		<div className="products-list-container">
			<Filter showFilter={showFilter} />
			<div className="products-list">
				{filteredProductsList.map((productDetails) => {
					return (
						<Product
							key={productDetails._id}
							productDetails={productDetails}
						/>
					);
				})}
			</div>

			<button
				className="btn primary-btn icon-only-btn filter-toggle-btn"
				onClick={handleFilterShow}
			>
				<span className="icon material-icons">
					{showFilter ? 'close' : 'filter_alt'}
				</span>
			</button>
		</div>
	);
};

export default ProductsList;
