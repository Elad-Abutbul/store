import React, { useEffect, useState } from "react";
import axios from 'axios'
import Prodact from "./Product";
import searchCss from "../styles/search.module.css";
export default function Search() {
  const [products, setProducts] = useState([]);
  const [req, setReq] = useState('');
  useEffect(() => {
    const getIteams = async () => {
      if (req !== '') {
        const res = await axios.post('http://localhost:3001/search', {getItem:req});
        const data = await res.data
        console.log('elad');
        setProducts(data);
      } else {
        setProducts([])
      }
     
    }
    getIteams()
  },[req])

  return (
    <div>
      <h1>search</h1>
      <input type="text" placeholder="search by name.." onChange={(e) => setReq(e.target.value)} className={searchCss.inp}/>
      {products?.map((val) => {
        return <Prodact val={val} url='getAddToCart'/>
      })}
    </div>
  );
}
