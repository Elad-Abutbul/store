import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../../../contextApi";
import Product from "../../Product";
import { VIEW } from "../../../constans/hardCoded/viewPurchases/ViewHardCoded";
import useSearchByNameProduct from "../../../outSideFunction/functionViewPurchases.js/SearchByUserNameProduct";
export default function ViewPurchases() {
  const valContext = useContext(contextApi);
  const [name, setName] = useState("");
  const historyOfCart = valContext.userData.historyOfCart;
  const [products, setProducts] = useState([]);
  const { searchByNameProduct } = useSearchByNameProduct();
  useEffect(() => {
    searchByNameProduct(name, setProducts);
  }, [name]);
  return (
    <div>
      {historyOfCart.length !== 0 ? (
        <div>
          <input
            type="text"
            placeholder="search by name"
            onChange={(e) => setName(e.target.value)}
          />
          {products.length !== 0
            ? products.map((valProduct) => {
                return <Product valProduct={valProduct} />;
              })
            : historyOfCart.map((valProduct) => {
                return <Product valProduct={valProduct} />;
              })}
        </div>
      ) : (
        VIEW.NOPURCHASES
      )}
    </div>
  );
}
