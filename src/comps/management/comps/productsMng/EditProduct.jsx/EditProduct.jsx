import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productMng from "../../../../../styles/productsMng.module.css";
import useUpdateProduct from "../../../../../outSideFunction/functionMng/updateProductCEO";
import useCheckNameExixt from "../../../../../outSideFunction/functionMng/checkIfNameExixtProduct";
import productMngCss from "../../../../../styles/productsMng.module.css";
import { EDIT_PRODUCT } from "../../../../../constans/hardCoded/mangement/editProductMng/editProductHardCoded";
import { validateImageUrl } from "../../../../../outSideFunction/checkImage/ImageValidation";

export default function EditProduct() {
  const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const [desc, setDesc] = useState(location.state.description);
  const [price, setPrice] = useState(location.state.price);
  const [image, setImage] = useState(location.state.image);
  const { updateProduct } = useUpdateProduct();
  const { chceckIfNameExixt } = useCheckNameExixt();
  const nav = useNavigate();
  const valid = async () => {
    if (!name || !desc || !image || !price) {
      alert("Fields Are Missing");
    } else if (await chceckIfNameExixt(name, location.state._id)) {
      alert("Name of the product already exists");
    } else if (!/^[0-9]+$/.test(price)) {
      alert("Enter a price without letters and spaces");
    } else if (!(await validateImageUrl(image))) {
      alert("Invalid Image URL");
    } else {
      await updateProduct({
        name,
        description: desc,
        price,
        image,
        choose: false,
        productId: location.state._id,
        type: location.state.type,
      });
      nav(-1);
    }
  };
  return (
    <div>
      <div className={productMng.containerEditProduct}>
        <h1>
          {EDIT_PRODUCT.EDIT_PRODUCT} {location.state.name}
        </h1>
        <div className={productMng.containerForm}>
          <input
            type="text"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={desc}
            placeholder="Enter Desc"
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            value={price}
            type="text"
            placeholder="Enter Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            value={image}
            placeholder="Enter Image"
            onChange={(e) => setImage(e.target.value)}
          />
          <select className={productMngCss.select}>
            <option value="" disabled selected>
              {location.state.type}
            </option>
          </select>
          <button className={productMng.btn} onClick={valid}>
            {EDIT_PRODUCT.EDIT_PRODUCT}
          </button>
        </div>
      </div>
      <button onClick={() => nav(-1)}>{EDIT_PRODUCT.RETURN_BACK}</button>
    </div>
  );
}
