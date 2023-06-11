import React, { useState } from "react";
import productsCSS from "../../../../../../styles/productsMng.module.css";
import AddArealProduct from "./comps/AddArealProduct";
export default function AddProducts() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  return (
    <>
      {showAddProduct === false && (
        <div
          className={`${productsCSS.containerAddProducts} ${productsCSS.addProduct} }`}
          onClick={() => setShowAddProduct(true)}
        >
          <h2 className={productsCSS.addProduct}>ADD PRODUCT+</h2>
        </div>
      )}
      {showAddProduct && (
        <AddArealProduct setShowAddProduct={setShowAddProduct} />
      )}
    </>
  );
}
