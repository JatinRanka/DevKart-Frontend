import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useCart, ADD_PRODUCT_IN_CART } from "../../context/cart";
import { getUserId } from "../../helper";
import { fetchApi } from "../../helper/fetchApi";
import { toast } from "../../helper/toast";
import { isUserLoggedIn } from "../../helper";
import "./index.css";

const ProductPage = () => {
  const history = useHistory();
  const { productId } = useParams();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [product, setProduct] = useState(null);

  const { state, dispatch } = useCart();
  const { wishlist, cartList } = state;

  const isProductInCartList = (productId = product._id) => {
    return cartList?.find((product) => product._id === productId);
  };

  const addProductInCartList = async () => {
    try {
      if (!isUserLoggedIn()) return redirectToLoginPage(history);

      setIsButtonLoading(true);
      const data = {
        product: product._id,
        quantity: product.quantity + 1 || 1,
      };
      const userId = getUserId();
      const { message } = await fetchApi({
        method: "post",
        url: `/carts/${userId}`,
        data,
      });

      toast({ type: "success", message });

      dispatch({
        type: ADD_PRODUCT_IN_CART,
        payload: { productId: product._id },
      });
    } catch (error) {
      toast({ type: "error", message: error.message });
    } finally {
      setIsButtonLoading(false);
    }
  };

  const fetchProduct = async () => {
    try {
      setIsPageLoading(true);
      const { product } = await fetchApi({
        method: "get",
        url: `/products/${productId}`,
      });

      setProduct(product);
    } catch (error) {
      toast({ type: "error", message: error.message });
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="product-page-container">
      {isPageLoading || !product ? (
        <h3>Loading...</h3>
      ) : (
        <div className="product-page-inner-container">
          <img src={product.image} alt={product.name} />
          <div className="product-details">
            <p className="heading-5">{product.brand}</p>
            <p className="heading-3">{product.name}</p>
            <span className="price heading-5">Rs. {product.price}</span>
            <p>{product.description}</p>
            {isProductInCartList() ? (
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <button className="btn secondary-btn cart-btn">
                  <span className="btn__icon material-icons">
                    shopping_cart
                  </span>
                  Go to cart
                </button>
              </Link>
            ) : (
              <button
                className={`btn primary-btn cart-btn${
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
      )}
    </div>
  );
};

export default ProductPage;
