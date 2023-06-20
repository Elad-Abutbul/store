import React, { useState } from "react";
import useAddProductToDB from "../../../../../../../outSideFunction/functionMng/addProduct";
import useCheckNameExixt from "../../../../../../../outSideFunction/functionMng/checkIfNameExixtProduct";
import productMngCss from "../../../../../../../styles/productsMng.module.css";
export default function AddArealProduct({ setShowAddProduct }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [linkImg, setLinkImg] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const { addProductToDB } = useAddProductToDB();
  const { chceckIfNameExixt } = useCheckNameExixt();

  const validateImageUrl = async (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

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
        <option value="" disabled selected  >
          Enter A Type
        </option>
        <option value="ring" className={productMngCss.option}>ring</option>
        <option value="bracelet" className={productMngCss.option}>bracelet</option>
        <option value="necklace" className={productMngCss.option}>necklace</option>
        <option value="earring" className={productMngCss.option}>earring</option>
      </select>
      <button onClick={valid} className={productMngCss.btn}>Submit</button>
    </div>
  );
}
