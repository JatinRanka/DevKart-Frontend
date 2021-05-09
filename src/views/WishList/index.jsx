import React from "react";
import Product from "../../components/Product";
import { useCart } from "../../context/cart";
import emptyWishlistImage from "../../assets/images/empty-wishlist.svg";
import "./index.css";

const renderEmptyWishlist = () => {
  return (
    <div className="empty-wish-list-container">
      <img className="empty-wish-list-img" src={emptyWishlistImage} />
      <p className="heading-4">Wishlist is empty.</p>
    </div>
  );
};

const WishList = () => {
  const { state } = useCart();
  const { wishlist } = state;

  return (
    <div className="wish-list">
      {!wishlist || wishlist.length === 0
        ? renderEmptyWishlist()
        : wishlist?.map((productDetails) => {
            return (
              <Product
                key={productDetails._id}
                productDetails={productDetails}
              />
            );
          })}
    </div>
  );
};

export default WishList;
