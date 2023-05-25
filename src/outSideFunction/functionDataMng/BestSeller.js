import { useContext } from "react";
import { contextApi } from "../../contextApi";

const useBestSeller = () => {
  const valContext = useContext(contextApi);
  let countArr = [];
  const bestSeller = () => {
    valContext.rankUser.map((user) =>
      user.historyOfCart.map((historyCart) =>
        valContext.allProducts.map((product) => {
          if (historyCart.name === product.name) {
            let indexCount = countArr.findIndex(
              (item) => item.name === historyCart.name
            );
            if (indexCount === -1) {
              return countArr.push({ count: 1, name: historyCart.name });
            } else {
              return countArr[indexCount].count++;
            }
          }
        })
      )
    );
  };
  return { bestSeller, countArr };
};
export default useBestSeller;
