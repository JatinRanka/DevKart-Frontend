import React, { useState } from "react";
import {
  useCart,
  UPDATE_MAX_PRICE_RANGE,
  SORT_PRICE,
  TOGGLE_FAST_DELIVERY_ONLY,
  TOGGLE_INCLUDE_OUT_OF_STOCK,
  RESET_FILTER_OPTIONS,
} from "../../context/cart";
import "./filter.css";

const Filter = ({ showFilter }) => {
  const { state, dispatch } = useCart();
  const { sortBy, includeOutOfStock, fastDeliveryOnly, maxPriceRange } = state;

  const filterClass = showFilter ? "filter filter-show" : "filter filter-hide";

  return (
    <div className={filterClass}>
      <div className="filter__title">
        <p className="heading-5">Filters</p>
        <button
          className="btn secondary-btn"
          onClick={() => {
            dispatch({
              type: RESET_FILTER_OPTIONS,
            });
          }}
        >
          Clear All
        </button>
      </div>
      <p className="heading bold">Sort By</p>

      <label>
        <input
          type="radio"
          name="sort"
          onChange={() => {
            dispatch({
              type: SORT_PRICE,
              payload: {
                sortBy: "LOW_TO_HIGH",
              },
            });
          }}
          checked={sortBy && sortBy === "LOW_TO_HIGH"}
        ></input>{" "}
        Price - Low to High
      </label>

      <br />

      <label>
        <input
          type="radio"
          name="sort"
          onChange={() => {
            dispatch({
              type: SORT_PRICE,
              payload: {
                sortBy: "HIGH_TO_LOW",
              },
            });
          }}
          checked={sortBy && sortBy === "HIGH_TO_LOW"}
        ></input>{" "}
        Price - High to Low
      </label>

      <p className="heading bold"> Filters </p>
      <label>
        <input
          type="checkbox"
          checked={includeOutOfStock}
          onChange={() => {
            dispatch({ type: TOGGLE_INCLUDE_OUT_OF_STOCK });
          }}
        />
        Include Out of Stock
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={fastDeliveryOnly}
          onChange={() => {
            dispatch({ type: TOGGLE_FAST_DELIVERY_ONLY });
          }}
        />
        Fast Delivery Only
      </label>

      <br />

      <p className="heading bold">
        Price range: <span style={{ fontWeight: 100 }}>Rs.{maxPriceRange}</span>
      </p>
      <input
        type="range"
        min={0}
        max={5000}
        value={maxPriceRange}
        step={200}
        onChange={(event) => {
          dispatch({
            type: UPDATE_MAX_PRICE_RANGE,
            payload: {
              maxPriceRange: event.target.value,
            },
          });
        }}
      />
    </div>
  );
};

export default Filter;
