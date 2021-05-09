import React, { createContext, useContext, useReducer } from "react";

export const ADD_PRODUCT_IN_WISHLIST = "ADD_PRODUCT_IN_WISHLIST";
export const REMOVE_PRODUCT_FROM_WISHLIST = "REMOVE_PRODUCT_FROM_WISHLIST";
export const ADD_PRODUCT_IN_CART = "ADD_PRODUCT_IN_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const UPDATE_MAX_PRICE_RANGE = "UPDATE_MAX_PRICE_RANGE";
export const SORT_PRICE = "SORT_PRICE";
export const TOGGLE_INCLUDE_OUT_OF_STOCK = "TOGGLE_INCLUDE_OUT_OF_STOCK";
export const TOGGLE_FAST_DELIVERY_ONLY = "TOGGLE_FAST_DELIVERY_ONLY";
export const RESET_FILTER_OPTIONS = "RESET_FILTER_OPTIONS";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_CARTLIST = "SET_CARTLIST";
export const SET_WISHLIST = "SET_WISHLIST";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  let { productsList, cartList, wishlist } = state;

  switch (type) {
    case SET_PRODUCTS: {
      const { productsList } = payload;

      return {
        ...state,
        productsList,
      };
    }

    case SET_WISHLIST: {
      const { wishlist } = payload;
      return {
        ...state,
        wishlist,
      };
    }

    case ADD_PRODUCT_IN_WISHLIST: {
      const { productId } = payload;
      const productToAdd = productsList.find((product) => {
        return product._id === productId;
      });

      if (wishlist == null) wishlist = [];

      const updatedWishList = [...wishlist, { ...productToAdd }];

      return {
        ...state,
        wishlist: updatedWishList,
      };
    }

    case REMOVE_PRODUCT_FROM_WISHLIST: {
      const { productId: productIdToRemove } = payload;
      const updatedWishList = wishlist.filter(
        (product) => product._id !== productIdToRemove
      );

      return {
        ...state,
        wishlist: updatedWishList,
      };
    }

    case SET_CARTLIST: {
      const { cartList } = payload;

      return {
        ...state,
        cartList,
      };
    }

    case ADD_PRODUCT_IN_CART: {
      const { productId: productIdToAddInCart } = payload;
      let isProductAvailableInCart = false;
      if (cartList == null) cartList = [];

      let updatedCartList = cartList.map((product) => {
        if (product._id !== productIdToAddInCart) {
          return product;
        } else {
          isProductAvailableInCart = true;
          return { ...product, quantity: product.quantity + 1 };
        }
      });

      if (!isProductAvailableInCart) {
        const productToAdd = productsList.find((product) => {
          return product._id === productIdToAddInCart;
        });
        updatedCartList = [...cartList, { ...productToAdd, quantity: 1 }];
      }

      return {
        ...state,
        cartList: updatedCartList,
      };
    }

    case REMOVE_PRODUCT_FROM_CART: {
      const { productId: productIdToRemoveFromCart } = payload;
      const productToUpdate = cartList.find(
        (product) => product._id === productIdToRemoveFromCart
      );

      let updatedCartList;

      if (productToUpdate.quantity === 1) {
        updatedCartList = cartList.filter(
          (product) => product._id !== productIdToRemoveFromCart
        );
      } else {
        updatedCartList = cartList.map((product) => {
          product._id === productIdToRemoveFromCart &&
            (product = {
              ...product,
              quantity: product.quantity - 1,
            });
          return product;
        });
      }

      return {
        ...state,
        cartList: updatedCartList,
      };
    }

    case UPDATE_MAX_PRICE_RANGE: {
      const { maxPriceRange } = payload;
      return {
        ...state,
        maxPriceRange,
      };
    }

    case SORT_PRICE: {
      const { sortBy } = payload;
      return {
        ...state,
        sortBy,
      };
    }

    case TOGGLE_INCLUDE_OUT_OF_STOCK: {
      return {
        ...state,
        includeOutOfStock: !state.includeOutOfStock,
      };
    }

    case TOGGLE_FAST_DELIVERY_ONLY: {
      return {
        ...state,
        fastDeliveryOnly: !state.fastDeliveryOnly,
      };
    }

    case RESET_FILTER_OPTIONS: {
      return {
        ...state,
        sortBy: null,
        includeOutOfStock: false,
        fastDeliveryOnly: false,
      };
    }

    default:
      break;
  }
};

const cartProviderInitialState = {
  productsList: [],
  cartList: null,
  wishlist: null,
  sortBy: null,
  includeOutOfStock: false,
  fastDeliveryOnly: false,
  maxPriceRange: 5000,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartProviderInitialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
