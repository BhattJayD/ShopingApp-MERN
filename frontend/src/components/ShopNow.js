import React, { useEffect, useState, useLayoutEffect } from "react";
import Global from "../Global";

import axios from "axios";
import Card from "./Card";
const ShopNow = (props) => {
  // console.log(props);

  var [products, setProducts] = useState([]);
  var [filterData, setfilterData] = useState([]);
  useLayoutEffect(() => {
    // console.log(Global.data);
    if (Global.data.length > 0) {
      setProducts(Global.data);
      const unique = [
        "All Products",
        ...new Set(Global.data.map((item) => item.category)),
      ];
      console.log(unique);
      setfilterData(unique);
      return;
    }
    setTimeout(() => {
      axios("http://192.168.0.8:5000/api/getData")
        .then((r) => {
          // console.log(r.data);
          Global.data = r.data;
          setProducts(r.data);
          var unique = [
            "All Products",
            ...new Set(r.data.map((item) => item.category)),
          ];
          console.log(unique);
          setfilterData(unique);
        })
        .catch((e) => console.log(e));
    }, 500);
  }, []);

  return (
    <div
      style={{
        marginTop: 65,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <select
        onChange={(e) => {
          console.log(e.target.value);
          if (e.target.value != "All Products") {
            setProducts(
              Global.data.filter(({ category }) => category == e.target.value)
            );
          } else {
            setProducts(Global.data);
          }
        }}
      >
        {filterData.map((i) => {
          return <option value={i}>{i}</option>;
        })}
      </select>
      {products.map((i) => {
        return <Card key={i.id} data={i} />;
      })}
    </div>
  );
};

export default ShopNow;
