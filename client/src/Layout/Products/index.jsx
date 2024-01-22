import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { WishlistContext } from "../../Context/WishlistContext";

const Products = () => {
  const [product, setProduct] = useState("");
  async function axiosData() {
    try {
      const response = await axios.get("http://localhost:8000/products/");
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    axiosData();
  }, []);
  const { toggleWishlist, wishlist } = useContext(WishlistContext);

  return (
    <div className="products">
      {product &&
        product.map((item) => (
          <div className="product" key={item._id}>
            <div className="img">
              <img src={item.image} />
            </div>
            <div className="name">
              <h1>{item.name}</h1>
            </div>
            <div className="desc">{item.desc}</div>
            <div className="price">{item.price}</div>
            <div className="addToWishlist">
                <button onClick={()=>toggleWishlist(item)}>Add to Wishlist</button>    
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
