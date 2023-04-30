import React from "react";
import Prodact from "./Product";
export default function Products(props) {

  return (
    <div>
      
      {props.products.map((val,index) => {
        return <Prodact key={index} val={val} url={props.url} />;
      })}
    </div>
  );
}
