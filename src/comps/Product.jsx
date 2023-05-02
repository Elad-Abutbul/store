import React, { useContext } from "react";
import productCss from "../styles/product.module.css";
import axios from "axios";
import { contextApi } from "../contextApi";
export default function Prodact(props) {
  const valContext = useContext(contextApi);
  const addToCart = async () => {
    const res = await axios.post("http://localhost:3001/addToCart", {
      productId: props.val._id,
      userNameId: valContext.userData._id,
    });
    const data = await res.data;
    if (data === "product added to cart!") {
      alert(data);
      valContext.addToCart(props.val);
    } else {
      console.log("cannot added to cart");
    }
  };
  const deleteIteam = async () => {
    try {
      const res = await axios.post("http://localhost:3001/deleteIteam", {
        productId: props.val._id,
        userNameId: valContext.userData._id,
      });
      const data = await res.data;
      if (data === "Product deleted from cart") {
        alert(data);
        valContext.deleteFromCart(props.index)
      } else {
        console.error(data);
      }
    } catch (err) {
      console.log(err);
    }
    props.refresh();
  };
  return (
    <div className={productCss.singleProduct}>
      {props.url === "cart" && (
        <h1
          className={productCss.plusOrX}
          id={productCss.delete}
          onClick={deleteIteam}
        >
          ×
        </h1>
      )}

      <h2>name: {props.val.name}</h2>
      <h2>description: {props.val.description}</h2>
      <h2>price: {props.val.price}₪ </h2>
      <img
        src={props.val.image}
        className={productCss.img}
        alt={props.val.name}
      />
      {props.url === "AddToCart" && (
        <h1 className={productCss.plusOrX} onClick={addToCart}>
          +
        </h1>
      )}
      {props.url === "cart" && <h1 className={productCss.plusOrX}>✓</h1>}
    </div>
  );
}
