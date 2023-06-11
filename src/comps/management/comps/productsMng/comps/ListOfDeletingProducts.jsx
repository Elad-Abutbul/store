import React, { useContext } from "react";
import { contextApi } from "../../../../../contextApi";
import userMngCss from "../../../../../styles/userMng.module.css";
import { USERMNG } from "../../../../../constans/hardCoded/mangement/usersMng/UsersMngHardCoded";
import useAddProductToDB from "../../../../../outSideFunction/functionMng/addProduct";
import { getNecklaces } from "../../../../../outSideFunction/functionApp/getSpecificProducts/getNecklaces";
import { getBraclets } from "../../../../../outSideFunction/functionApp/getSpecificProducts/getBraclets";
import { getRing } from "../../../../../outSideFunction/functionApp/getSpecificProducts/getRings";
import { getEarrings } from "../../../../../outSideFunction/functionApp/getSpecificProducts/getEarrings";

export default function ListOfDeletingProducts() {
  const valContext = useContext(contextApi);
  const { addProductToDB } = useAddProductToDB();
  return (
    <div>
      {valContext.userData.deleteProducts?.length !== 0 ? (
        <table id={userMngCss.table}>
          <tbody>
            <tr>
              <th className={userMngCss.boxes}>Name Of Product</th>
              <th className={userMngCss.boxes}>Image Of Product</th>
              <th className={userMngCss.boxes}>revive</th>
            </tr>
            {valContext.userData.deleteProducts?.map((valProduct) => {
              console.log(valProduct);

              return (
                <tr>
                  <td className={userMngCss.boxes}>{valProduct.name}</td>
                  <td className={userMngCss.boxes}>
                    <img className={userMngCss.img} src={valProduct.image} />
                  </td>
                  <td
                    className={` ${userMngCss.boxes} ${userMngCss.vi}`}
                    onClick={() => {
                      addProductToDB(
                        valProduct.name,
                        valProduct.description,
                        valProduct.image,
                        valProduct.type,
                        valProduct.price
                      );
                      valContext.removeFromDeleteProductListCEO();
                      if (valProduct.type === "ring") {
                        return getRing(valContext.setRingProducts);
                      } else if (valProduct.type === "bracelet") {
                        return getBraclets(valContext.setBraceletProducts);
                      } else if (valProduct.type === "necklace") {
                        return getNecklaces(valContext.setNecklaceProducts);
                      } else {
                        return getEarrings(valContext.setEarringProducts);
                      }
                    }}
                  >
                    {USERMNG.VI}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No Products To Show..</p>
      )}
    </div>
  );
}
