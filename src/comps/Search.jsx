import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import Product from "./Product";
import searchCss from "../styles/search.module.css";
import { URL } from "../constans/constans";

export default function Search() {
  const [products, setProducts] = useState([]);
  const [req, setReq] = useState("");

  useEffect(() => {
    const getIteams = async () => {
      if (req !== "") {
        const res = await axios.post("/search", {
          getItem: req,
        });
        const data = await res.data;
        setProducts(data);
      } else {
        setProducts([]);
      }
    };
    getIteams();
  }, [req]);

  return (
    <div className={searchCss.container}>
      <h1 className={searchCss.h1}>Search</h1>
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => setReq(e.target.value)}
        className={searchCss.input}
      />
      <div className={searchCss.products}>
        {products?.map((valProduct) => {
          return (
            <Product
              key={valProduct._id}
              valProduct={valProduct}
              url={URL.ADDTOCART}
            />
          );
        })}
      </div>
    </div>
  );
}
