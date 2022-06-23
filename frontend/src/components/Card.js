import React from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

import "./Card.css";

const Carts = (props) => {
  const navigate = useNavigate();
  return (
    <div className="card">
      {/* {JSON.stringify(i)} */}
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          // background: "red",
          maxWidth: "100%",
          minWidth: "75%",
        }}
      >
        <p>{props.data.category}</p>
        <p style={{ fontWeight: "bold", marginLeft: 20 }}>{props.data.title}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img className="image" src={props.data.image} alt="logo" />
      </div>
      <p style={{}}>cost {props.data.price}$</p>
      <div className="dec">
        <p>{props.data.description}</p>
      </div>
      {/* <p>rating {props.data.rating.rate}</p> */}
      <StarRatings
        rating={props.data.rating.rate}
        starDimension="20px"
        starSpacing="5px"
        starRatedColor="#F7EC09"
        starEmptyColor="#D3EBCD"
      />
      <p>available products {props.data.rating.count}</p>
      <button
        className="click"
        onClick={() => {
          // console.log(props.data.id);
          navigate("/cart", { state: { product: props.data.id } });
        }}
        style={{ background: "#56a93e", color: "#fff" }}
      >
        add to cart
      </button>
    </div>
  );
};

export default Carts;
