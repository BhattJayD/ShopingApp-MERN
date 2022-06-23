import "./App.css";
import React from "react";
import Global from "./Global";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddToCart from "./components/AddToCart";
import ShopNow from "./components/ShopNow";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            left: 0,
            height: 60,
            background: "#0c152f",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            zIndex: 1,
            color: "#fff",
          }}
        >
          <h3>Fresh Stock</h3>
        </div>
        <Routes>
          <Route path="/" element={<ShopNow />} />
          <Route exact path="/cart" element={<AddToCart />} />
        </Routes>
      </div>
    </Router>
  );
}
