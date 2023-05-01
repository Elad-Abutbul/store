import React, { useContext } from "react";
import productCss from "../styles/product.module.css";
import axios from "axios";
import { contextApi } from "../contextApi";
export default function Prodact(props) {
  const valContext = useContext(contextApi);
console.log( props.val._id);
  
  const addToCart = async () => {
    debugger
    const res = await axios.post("http://localhost:3001/addToCart", {
      productId: props.val._id,
      userNameId: valContext._id,
    });
    const data = await res.data;
    if (data == "product added to cart!") {
      alert(data);
    } else {
      console.log("cannot added to cart");
    }
  };
  return (
    <div className={productCss.singleProduct}>
      <h2>{props.val.name}</h2>
      <h2>{props.val.description}</h2>
      <h2>{props.val.price}</h2>
      <img src={props.val.image} className={productCss.img} />
      {props.url == "product" && (
        <h1 className={productCss.plus} onClick={addToCart}>
          
          +
        </h1>
      )}
    </div>
  );
}
