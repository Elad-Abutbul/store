import { useState } from "react";
import { ROUTES } from "../../constans/Routes";
import { TYPEIMG } from "../../constans/hardCoded/app/TypeproductImg";
import { getRing } from "./getSpecificProducts/getRings";
import { getBraclets } from "./getSpecificProducts/getBraclets";
import { getNecklaces } from "./getSpecificProducts/getNecklaces";
import { getEarrings } from "./getSpecificProducts/getEarrings";
import { getAllProductsSpecific } from "./getSpecificProducts/getAllProductsSpecific";
const useProductData = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [ringProducts, setRingProducts] = useState([]);
  const [braceletProducts, setBraceletProducts] = useState([]);
  const [necklaceProducts, setNecklaceProducts] = useState([]);
  const [earringProducts, setEarringProducts] = useState([]);
  const [typeProductImg, setTypeProductImg] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      await getAllProductsSpecific(setAllProducts);
      await getRing(setRingProducts);
      await getBraclets(setBraceletProducts);
      await getNecklaces(setNecklaceProducts);
      await getEarrings(setEarringProducts);
      setTypeProductImg([
        {
          link: ROUTES.RINGS,
          src: TYPEIMG.RINGS.SRC,
          alt: TYPEIMG.RINGS.ALT,
          button: TYPEIMG.RINGS.BUTTON,
        },
        {
          link: ROUTES.BRACELETS,
          src: TYPEIMG.BRACELETS.SRC,
          alt: TYPEIMG.BRACELETS.ALT,
          button: TYPEIMG.BRACELETS.BUTTON,
        },
        {
          link: ROUTES.NECKLACES,
          src: TYPEIMG.NECKLACES.SRC,
          alt: TYPEIMG.NECKLACES.ALT,
          button: TYPEIMG.NECKLACES.BUTTON,
        },
        {
          link: ROUTES.EARRINGS,
          src: TYPEIMG.ERRINGS.SRC,
          alt: TYPEIMG.ERRINGS.ALT,
          button: TYPEIMG.ERRINGS.BUTTON,
        },
      ]);

      setLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return {
    ringProducts,
    braceletProducts,
    necklaceProducts,
    earringProducts,
    typeProductImg,
    loading,
    getAllProducts,
    allProducts,
    setAllProducts,
    setRingProducts,
    setBraceletProducts,
    setNecklaceProducts,
    setEarringProducts,
  };
};

export default useProductData;
