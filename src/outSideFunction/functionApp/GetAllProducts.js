import { useState } from "react";
import axios from "../../axiosConfig";
import { ROUTES } from "../../constans/Routes";
import { TYPEIMG } from "../../constans/hardCoded/app/TypeproductImg";
import { GET } from "../../constans/hardCoded/app/AxiosGetOnStart";
const useProductData = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [ringProducts, setRingProducts] = useState([]);
  const [braceletProducts, setBraceletProducts] = useState([]);
  const [necklaceProducts, setNecklaceProducts] = useState([]);
  const [earringProducts, setEarringProducts] = useState([]);
  const [typeProductImg, setTypeProductImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const resAllProduct = await axios.get(GET.GETALLPRODUCTS);
      const dataAllProducts = resAllProduct.data;
      setAllProducts(dataAllProducts);

      const resRing = await axios.get(GET.ALLRINGS);
      const dataRing = resRing.data;
      setRingProducts(dataRing);

      const resBracelet = await axios.get(GET.ALLBRACELETS);
      const dataBracelet = resBracelet.data;
      setBraceletProducts(dataBracelet);

      const resNecklace = await axios.get(GET.ALLNECKLACES);
      const dataNecklace = resNecklace.data;
      setNecklaceProducts(dataNecklace);

      const resEarring = await axios.get(GET.ALLEARIINGS);
      const dataEarring = resEarring.data;
      setEarringProducts(dataEarring);

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
      console.log(err);
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
  };
};

export default useProductData;