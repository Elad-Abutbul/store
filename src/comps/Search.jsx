import React, { useEffect, useState } from "react";
import Product from "./Product";
import searchCss from "../styles/search.module.css";
import { URL } from "../constans/Url";
import useSearch from "../outSideFunction/functionSearch/SearchInProducts";
import { SEARCH } from "../constans/hardCoded/search/searchHardCoded";
export default function Search() {
  const [products, setProducts] = useState([]);
  const [req, setReq] = useState("");
  const { search } = useSearch();
  useEffect(() => {
    const getIteams = () => {
      search(req, setProducts);
    };
    getIteams();
  }, [req]);

  return (
    <div className={searchCss.container}>
      <h1 className={searchCss.h1}>{SEARCH.SEARCH}</h1>
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => setReq(e.target.value)}
        className={searchCss.input}
      />
      <div className={searchCss.products}>
        {products?.map((valProduct) => {
          return <Product valProduct={valProduct} url={URL.ADDTOCART} />;
        })}
      </div>
    </div>
  );
}
