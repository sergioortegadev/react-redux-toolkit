import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readProducts } from "../redux/productsSlice";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [newProductName, setNewProductName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => {
        //console.log(res);
        dispatch(readProducts(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  const handleCreateProduct = () => {
    if (newProduct) {
      //const newProduct
    }
  };

  const handleUpdateProduct = () => {};
  const handleDeleteProduct = () => {};

  return (
    <>
      <h2>Product CRUD</h2>
      <aside>
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
        />
        <button onClick={handleCreateProduct}>Add Product</button>
      </aside>
      <h3>Product List</h3>
      <div className="cards">
        {products.data.map((product) => (
          <figure key={product.id}>
            <img src={product.images[0]} alt={product.title} />
            <figcaption>{product.title}</figcaption>
            <h4>$ {product.price}</h4>
          </figure>
        ))}
      </div>
    </>
  );
};

export default ProductList;
