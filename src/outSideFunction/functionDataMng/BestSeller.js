import { useContext } from "react";
import { contextApi } from "../../contextApi";

const useBestSeller = () => {
  const valContext = useContext(contextApi);
  let countArr = [];
  const bestSeller = () => {
    debugger;
    valContext.rankUser.forEach((user) =>
      user.historyOfCart.forEach((historyCart) =>
        valContext.allProducts.forEach((product) => {
          if (historyCart.name === product.name) {
            let indexCount = countArr.findIndex(
              (item) => item.name === historyCart.name
            );
            if (indexCount === -1) {
              return countArr.push({ count: 1, name: historyCart.name });
            } else {
              debugger;
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
