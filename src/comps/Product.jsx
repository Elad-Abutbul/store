import React, { useContext, useEffect } from "react";
import productCss from "../styles/product.module.css";
import { contextApi } from "../contextApi";
import { URL } from "../constans/Url";
import useAddToCart from "../outSideFunction/functionProduct/AddToCartPost";
import useRadio from "../outSideFunction/functionProduct/UseRadio";
import useDeleteItem from "../outSideFunction/functionProduct/DeleteIteam";
import { PRODUCT } from "../constans/hardCoded/product/ProductHardCoded";
import { RANKSUSER } from "../constans/RanksUser";
import { CART } from "../constans/hardCoded/cart/CartHardCoded";
import useDeleteProduct from "../outSideFunction/functionMng/deleteProduct";
import editProductCEO from "./editProductCEO.png";
import { ROUTES } from "../constans/Routes";
import { useNavigate } from "react-router-dom";
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
  const { deleteTheProduct } = useDeleteProduct();
  const addToCart = () => {
    addToCartFunc(valProduct?._id, valContext, valProduct);
  };
  const nav = useNavigate();
  useEffect(() => {
    if (url === "onCart") checkRadio(valContext, valProduct, indexProduct);
  }, [radio]);

  const deleteIteam = () => {
    deleteItem(valContext, valProduct?._id, valProduct, indexProduct);
    valContext.setSelectedIteamToPay([]);
    TotalPurchases();
  };
  useEffect(() => {
    setRadio(false);
  }, [falseRadioAfterPay]);
  const rank = valContext.userData.rank;
  return (
    <div className={productCss.singleProduct}>
      {valContext.userData?.rank === RANKSUSER.CEO && url !== URL.ONCART && (
        <>
          <h1
            className={`${productCss.plusOrX} ${productCss.delete}`}
            onClick={() => deleteTheProduct(valProduct)}
          >
            {PRODUCT.X}
          </h1>
          <img
            onClick={() =>
              nav(
                `${ROUTES.ELADJEWELRY}${ROUTES.EDITPRODUCT}/${valProduct.type}`,
                { state: valProduct }
              )
            }
            className={`${productCss.editImg} ${productCss.img}`}
            src={editProductCEO}
            alt="edit product"
          />
        </>
      )}
      {url === URL.ONCART && (
        <h1
          className={`${productCss.plusOrX} ${productCss.delete}`}
          onClick={() => deleteIteam()}
        >
          {PRODUCT.X}
        </h1>
      )}
      <h2 className={productCss.h2}>{valProduct.name}</h2>
      <h2 className={productCss.h2}>{valProduct.description}</h2>
      <h2 className={productCss.h2}>
        {rank === RANKSUSER.CEO ? (
          <>
            {valProduct.price * 0.5}
            {CART.SHEKEL} {PRODUCT.CONSTPRISE}
          </>
        ) : (
          `${valProduct.price} ${CART.SHEKEL}`
        )}
      </h2>
      <img
        src={valProduct.image}
        className={`${productCss.img} ${productCss.productImg}`}
        alt={valProduct.name}
      />
      {url === URL.ADDTOCART && (
        <h1 className={productCss.plusOrX} onClick={addToCart}>
          {PRODUCT.PLUS}
        </h1>
      )}
      {url === URL.ONCART && (
        <div className={productCss.radioContainer}>
          <label className={productCss.radioLabel}>{PRODUCT.SELECTTOPAY}</label>

          <input
            type="radio"
            checked={radio}
            onClick={() => setRadio(!radio)}
            className={productCss.radioInput}
          />
        </div>
      )}
    </div>
  );
}
