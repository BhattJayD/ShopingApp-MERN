import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ImBackward } from "react-icons/im";
import Global from "../Global";
import axios from "axios";
import "./AddToCart.css";
import { wait } from "@testing-library/user-event/dist/utils";
const AddToCart = (props, id) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [myCart, setMyCart] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    var tmp = Global.data.filter(({ id }) => id === location.state.product);
    console.log(tmp);
    tmp[0]["count"] = 1;
    tmp[0]["total"] = tmp[0].price;

    if (Global.cart.indexOf(tmp[0]) !== -1) {
      setMyCart(Global.cart);
      subTotal();
      return;
    } else {
      Global.cart.push(tmp[0]);
      tmp[0]["total"] = tmp[0].price;
      tmp[0]["count"] = 1;
      Global.sum = tmp[0].price;
      console.log(Global.cart);
      setMyCart(tmp);
      subTotal();
    }
  }, []);

  const subTotal = () => {
    var sum = 0;
    for (let i = 0; i < myCart.length; i++) {
      sum += myCart[i].total;
      setCount(sum);
    }
  };

  const buyProduct = () => {
    var dataString = "cost=" + count;
    console.log(dataString);
    var option = {
      method: "post",
      url: "http://192.168.0.8:5000/api/checkout",
      body: dataString,
    };

    axios
      .post(
        "http://192.168.0.8:5000/api/checkout",
        new URLSearchParams({
          cost: "500",
        })
      )
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
    // .post("http://192.168.0.8:5000/api/checkout", { body: { cost: count } })
  };

  // console.log(location.state.product);
  return (
    <div
      style={{
        marginTop: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{ zIndex: 10, position: "absolute", left: 5, top: 20 }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <ImBackward color="#fff" />
      </div>
      <div className="carts">
        {myCart.map((i) => {
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
              key={i.id * Math.random()}
            >
              <p
                style={{
                  width: "85%",
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                {i.title}
              </p>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={i.image}
                  alt="product"
                  style={{ height: 100, width: 100 }}
                />
                <div
                  style={{
                    display: "flex",
                    background: "#18978F",
                    position: "absolute",
                    color: "#fff",
                    bottom: 5,
                    width: "50%",
                    borderRadius: 10,
                    justifyContent: "space-evenly",
                  }}
                >
                  <div
                    onClick={() => {
                      if (i.count > 1) {
                        i.count = i.count - 1;
                        i["total"] = i.price * i.count;
                        setCount(count - 1);
                        subTotal();
                      }
                    }}
                    style={{ fontWeight: "bold", fontSize: 20 }}
                  >
                    -
                  </div>
                  <div style={{ fontWeight: "bold", fontSize: 20 }}>
                    {i.count}
                  </div>
                  <div
                    onClick={() => {
                      // console.log("click");
                      i.count = i.count + 1;
                      i["total"] = i.price * i.count;
                      setCount(count + 1);
                      subTotal();
                    }}
                    style={{ fontWeight: "bold", fontSize: 20 }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p>cart value {myCart.length > 0 && count}$</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            console.log(count);
            buyProduct();
          }}
          style={{
            background: "#56a93e",
            color: "#fff",
            width: "60%",
            height: 40,
          }}
          className="click"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
