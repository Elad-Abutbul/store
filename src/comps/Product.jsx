import React, { useContext } from "react";
import productCss from "../styles/product.module.css";
import axios from "axios";
import { contextApi } from "../contextApi";
import { URL } from "../constans/constans";

export default function Prodact({ index, url, valProduct }) {
  const valContext = useContext(contextApi);
  const addToCart = async () => {
    const res = await axios.post("http://localhost:3001/addToCart", {
      productId: valProduct._id,
      userNameId: valContext.userData._id,
    });
    const data = await res.data;
    if (data === "product added to cart!") {
      alert(data);
      valContext.addToCart(valProduct);
    } else {
      console.log("cannot added to cart");
    }
  };
  const deleteIteam = async () => {
    try {
      const res = await axios.post("http://localhost:3001/deleteIteam", {
        productId: valProduct._id,
        userNameId: valContext.userData._id,
      });
      const data = await res.data;
      if (data === "Product deleted from cart") {
        alert(data);
        valContext.deleteFromCart(index);
      } else {
        console.error(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={productCss.singleProduct}>
      {url === URL.ONCART && (
        <h1
          className={productCss.plusOrX}
          id={productCss.delete}
          onClick={deleteIteam}
        >
          ×
        </h1>
      )}

      <h2>name: {valProduct.name}</h2>
      <h2>description: {valProduct.description}</h2>
      <h2>price: {valProduct.price}₪ </h2>
      <img
        src={valProduct.image}
        className={productCss.img}
        alt={valProduct.name}
      />
      {url === URL.ADDTOCART && (
        <h1 className={productCss.plusOrX} onClick={addToCart}>
          +
        </h1>
      )}
      {url === URL.ONCART && <h1 className={productCss.plusOrX}>✓</h1>}
    </div>
  );
}
