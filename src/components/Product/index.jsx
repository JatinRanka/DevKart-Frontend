import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchApi, isUserLoggedIn } from "../../helper";
import {
  ADD_PRODUCT_IN_CART,
  ADD_PRODUCT_IN_WISHLIST,
  REMOVE_PRODUCT_FROM_WISHLIST,
  useCart,
} from "../../context/cart";
import { getUserId, redirectToLoginPage } from "../../helper/utils";
import { toast } from "../../helper/toast";
import "./index.css";

const Product = ({ productDetails }) => {
  const history = useHistory();
  const [isCardDisabled, setIsCardDisabled] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const {
    _id,
    name,
    image,
    price,
    brand,
    productName,
    offer,
    quantity,
    inStock,
    level,
    fastDelivery,
  } = productDetails;

  const { state, dispatch } = useCart();
  const { wishlist, cartList } = state;

  const isProductInWishlist = (productId = _id) => {
    return wishlist?.find((product) => product._id === productId);
  };

  const isProductInCartList = (productId = _id) => {
    return cartList?.find((product) => product._id === productId);
  };

  const removeProductFromWishList = async (event) => {
    try {
      event.stopPropagation();
      setIsCardDisabled(true);
      const data = { product: _id, addInWishList: false };
      const userId = getUserId();
      const { message } = await fetchApi({
        method: "post",
        url: `/wishlists/${userId}`,
        data,
      });
      toast({ type: "success", message });

      dispatch({
        type: REMOVE_PRODUCT_FROM_WISHLIST,
        payload: { productId: _id },
      });
    } catch (error) {
      toast({ type: "error", message: error.message });
    } finally {
      setIsCardDisabled(false);
    }
  };

  const addProductInWishList = async (event) => {
    try {
      event.stopPropagation();
      if (!isUserLoggedIn()) return redirectToLoginPage(history);

      setIsCardDisabled(true);
      const data = { product: _id, addInWishList: true };
      const userId = getUserId();
      const { message } = await fetchApi({
        method: "post",
        url: `/wishlists/${userId}`,
        data,
      });
      toast({ type: "success", message });

      dispatch({
        type: ADD_PRODUCT_IN_WISHLIST,
        payload: { productId: _id },
      });
    } catch (error) {
      toast({ type: "error", message: error.message });
    } finally {
      setIsCardDisabled(false);
    }
  };

  const addProductInCartList = async (event) => {
    try {
      event.stopPropagation();

      if (!isUserLoggedIn()) return redirectToLoginPage(history);

      setIsButtonLoading(true);
      const data = { product: _id, quantity: quantity + 1 || 1 };
      const userId = getUserId();
      const { message } = await fetchApi({
        method: "post",
        url: `/carts/${userId}`,
        data,
      });

      toast({ type: "success", message });

      dispatch({
        type: ADD_PRODUCT_IN_CART,
        payload: { productId: _id },
      });
    } catch (error) {
      toast({ type: "error", message: error.message });
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <div
      className={`basic-shopping-card ${isCardDisabled ? "disabled" : ""}`}
      onClick={() => {
        history.push(`/products/${_id}`);
      }}
    >
      <img className="basic-shopping-card__img" alt={productName} src={image} />

      <div className="basic-shopping-card__header">
        <span className="discount small">{offer}% off</span>

        {isProductInWishlist() ? (
          <span
            className="icon material-icons"
            onClick={removeProductFromWishList}
            style={{ color: "red" }}
          >
            favorite
          </span>
        ) : (
          <span
            className="icon material-icons"
            onClick={addProductInWishList}
            style={{ color: "black" }}
          >
            favorite_border
          </span>
        )}
      </div>

      <div className="basic-shopping-card__body">
        <div className="header">
          <p className="brand">{brand}</p>
          <p className="description">{name} </p>
          <p className="price">Rs. {price}</p>
        </div>

        <div className="footer">
          {isProductInCartList() ? (
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <button
                className="btn secondary-btn"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <span className="btn__icon material-icons">shopping_cart</span>
                Go to cart
              </button>
            </Link>
          ) : (
            <button
              className={`btn primary-btn ${
                isButtonLoading ? " disabled" : ""
              }`}
              onClick={addProductInCartList}
              disabled={isButtonLoading}
            >
              <span className="btn__icon material-icons">shopping_cart</span>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
