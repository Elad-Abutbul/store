import React, { useState } from "react";
import useAddProductToDB from "../../../../../../../outSideFunction/functionMng/addProduct";
import useCheckNameExixt from "../../../../../../../outSideFunction/functionMng/checkIfNameExixtProduct";
import productMngCss from "../../../../../../../styles/productsMng.module.css";
import { PRODUCTS } from "../../../../../../../constans/hardCoded/mangement/productsMng/products";
import { validateImageUrl } from "../../../../../../../outSideFunction/checkImage/ImageValidation";
export default function AddArealProduct({ setShowAddProduct }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [linkImg, setLinkImg] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const { addProductToDB } = useAddProductToDB();
  const { chceckIfNameExixt } = useCheckNameExixt();

  const valid = async () => {
    if (!name || !desc || !linkImg || !type || !price) {
      alert("Fields Are Missing");
    } else if (await chceckIfNameExixt(name)) {
      alert("Name of the product already exists");
    } else if (!/^[0-9]+$/.test(price)) {
      alert("Enter a price without letters and spaces");
    } else if (!(await validateImageUrl(linkImg))) {
      alert("Invalid Image URL");
    } else {
      addProductToDB(name, desc, linkImg, type, price, setShowAddProduct);
    }
  };

  return (
    <div className={productMngCss.containerForm}>
      <input
        type="text"
        placeholder="Name Of The Product.."
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Desc Of The Product"
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price of The Product"
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Link To Img"
        onChange={(e) => setLinkImg(e.target.value)}
      />
      <select
        onChange={(e) => setType(e.target.value)}
        className={productMngCss.select}
      >
        <option value="" disabled selected>
          {PRODUCTS.ENTER_TYPE}
        </option>
        <option value="ring" className={productMngCss.option}>
          {PRODUCTS.RING}
        </option>
        <option value="bracelet" className={productMngCss.option}>
          {PRODUCTS.BRACELET}
        </option>
        <option value="necklace" className={productMngCss.option}>
          {PRODUCTS.BRACELET}
        </option>
        <option value="earring" className={productMngCss.option}>
          {PRODUCTS.EARRING}
        </option>
      </select>
      <button onClick={valid} className={productMngCss.btn}>
        {PRODUCTS.SUMBIT}
      </button>
    </div>
  );
}
