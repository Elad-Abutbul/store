import React from "react";
import Prodact from "./Product";
export default function Products(props) {

  return (
    <div>
      
      {props.products.map((val) => {
        return <Prodact val={val} />;
      })}
    </div>
  );
}
