import React, { useContext, useEffect, useState } from "react";
import productCss from "../styles/product.module.css";
import axios from "../axiosConfig";

import { contextApi } from "../contextApi";
import { URL } from "../constans/constans";

export default function Product({
  indexProduct,
  url,
  valProduct,
  falseRaioAfterPay,
  deleteIteam,
  sum,
}) {
  const [radio, setRadio] = useState(false);
  const valContext = useContext(contextApi);
  const addToCart = async () => {
    const res = await axios.post("/addToCart", {
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
  useEffect(() => {
    if (radio) {
      valContext.addProductToSelectedIteamToPay(valProduct, indexProduct);
    } else {
      valContext.deleteProductFromSelectedIteamToPay(valProduct, indexProduct);
    }
  }, [radio]);
  useEffect(() => {
    setRadio(false);
  }, [falseRaioAfterPay]);
  return (
    <div className={productCss.singleProduct}>
      {url === URL.ONCART && (
        <h1
          className={productCss.plusOrX}
          id={productCss.delete}
          onClick={() => deleteIteam(valProduct._id, indexProduct)}
        >
          ×
        </h1>
      )}
      <h2 className={productCss.h2}>{valProduct.name}</h2>
      <h2 className={productCss.h2}>{valProduct.description}</h2>
      <h2 className={productCss.h2}>{valProduct.price}₪ </h2>
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
      {url === URL.ONCART && (
        <input
          type="radio"
          checked={valProduct.choose}
          onClick={() => setRadio(!radio)}
        />
      )}
    </div>
  );
}
