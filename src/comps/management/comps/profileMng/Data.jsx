import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "../../../../contextApi";
import { CART } from "../../../../constans/hardCoded/cart/CartHardCoded";
import { USERMNG } from "../../../../constans/hardCoded/mangement/usersMng/UsersMngHardCoded";
import Product from "../../../Product";
import { DATA } from "../../../../constans/hardCoded/mangement/dataMng/DataMngHardCoded";
import useBestSeller from "../../../../outSideFunction/functionDataMng/BestSeller";
import useBestProductDB from "../../../../outSideFunction/functionDataMng/GetFromDBbestProduct";
export default function Data() {
  const valContext = useContext(contextApi);
  const [bestProduct, setBestProduct] = useState([]);
  let sumAll = 0;
  const { bestSeller, countArr } = useBestSeller();
  const { bestProductDB } = useBestProductDB();
  const allPurchases = () => {
    return valContext.rankUser.forEach((valRankUser) =>
      valRankUser.historyOfCart.forEach(
        (valHistory) => (sumAll += valHistory.price)
      )
    );
  };
  allPurchases();

  useEffect(() => {
    bestSeller();
    let sortCount = countArr.sort((a, b) => b.count - a.count);
    bestProductDB(sortCount, setBestProduct);
  });
  return (
    <div>
      <h3>
        {USERMNG.ALL_PURCHASES}: {valContext.sumAllPurchases}
        {CART.SHEKEL}
        <div>
          <h4>{DATA.BEST_SELLER}</h4>
          {bestProduct?.map((valProduct) => {
            return <Product valProduct={valProduct} />;
          })}
        </div>
      </h3>
    </div>
  );
}
