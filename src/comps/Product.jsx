import React, { useContext, useEffect } from "react";
import productCss from "../styles/product.module.css";
import { contextApi } from "../contextApi";
import { URL } from "../constans/Url";
import useAddToCart from "../outSideFunction/functionProduct/AddToCartPost";
import useRadio from "../outSideFunction/functionProduct/UseRadio";
import useDeleteItem from "../outSideFunction/functionProduct/DeleteIteam";
import { PRODUCT } from "../constans/hardCoded/product/ProductHardCoded";

export default function Product({
  indexProduct,
  url,
  valProduct,
  falseRadioAfterPay,
  TotalPurchases,
}) {
  const { checkRadio, radio, setRadio } = useRadio();
  const { deleteItem } = useDeleteItem();
  const { addToCartFunc } = useAddToCart();
  const valContext = useContext(contextApi);

  const addToCart = () => {
    addToCartFunc(valProduct._id, valContext, valProduct);
  };

  useEffect(() => {
    checkRadio(valContext, valProduct, indexProduct);
  }, [radio]);

  const deleteIteam = () => {
    deleteItem(valContext, valProduct._id, valProduct, indexProduct);
    setRadio(false);
    TotalPurchases();
  };

  useEffect(() => {
    setRadio(false);
  }, [falseRadioAfterPay]);

  return (
    <div className={productCss.singleProduct}>
      {url === URL.ONCART && (
        <h1
          className={productCss.plusOrX}
          id={productCss.delete}
          onClick={() => deleteIteam()}
        >
          {PRODUCT.X}
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
          {PRODUCT.PLUS}
        </h1>
      )}
      {url === URL.ONCART && (
        <div>
          <label>{PRODUCT.SELECTPRODUCT}</label>
          <input
            type="radio"
            checked={radio}
            onClick={() => setRadio(!radio)}
          />
        </div>
      )}
    </div>
  );
}
