import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  readProducts,
  updateProduct,
} from "../redux/productsSlice";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const INITIAL_PROD = {
    title: "",
    price: 0,
    images: ["https://cdn.dummyjson.com/product-images/30/3.jpg"],
  };
  const [newProductName, setNewProductName] = useState(INITIAL_PROD);
  const [editedProduct, setEditedProduct] = useState(null);

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
    if (newProductName.title) {
      const newProduct = {
        id: Date.now(),
        title: newProductName.title,
        price: newProductName.price,
        images: newProductName.images,
      };
      dispatch(createProduct(newProduct));
      axios
        .post("http://localhost:3001/products", newProduct)
        .then(() => {
          setNewProductName(INITIAL_PROD);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleUpdateProduct = (prod) => {
    console.log(prod);
    console.log(editedProduct);
    if (
      prod.title !== editedProduct.title ||
      prod.price !== editedProduct.price
    ) {
      const productToEdit = {
        ...editedProduct,
        title: editedProduct.title,
        price: parseInt(editedProduct.price),
      };
      dispatch(updateProduct(productToEdit));
      console.log("producto actualizado: ");
      console.log(editedProduct);
      setEditedProduct(null);
      /*   axios
        .post("http://localhost:3001/products", productToEdit)
        .then(() => {
          setNewProductName(INITIAL_PROD);
        })
        .catch((error) => console.error(error)); */
    } else {
      console.log("producto sin cambios");
      setEditedProduct(null);
    }
  };
  const handleDeleteProduct = () => {};

  return (
    <>
      <h2>Product CRUD</h2>
      <aside>
        <input
          type="text"
          name="title"
          placeholder="Nombre Producto"
          value={newProductName.title}
          onChange={(e) =>
            setNewProductName({
              ...newProductName,
              title: e.target.value,
            })
          }
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newProductName.price}
          onChange={(e) =>
            setNewProductName({
              ...newProductName,
              price: e.target.value,
            })
          }
        />

        <button onClick={handleCreateProduct}>Add Product</button>
      </aside>
      <h3>Product List</h3>
      <div className="cards">
        {products.data.map((product) => (
          <figure key={product.id}>
            {editedProduct?.id === product.id ? (
              <div className="update-inputs">
                <img src={product.images[0]} alt={product.title} />
                <input
                  type="text"
                  name="title"
                  value={editedProduct.title}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      title: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      price: parseInt(e.target.value),
                    })
                  }
                />
                <button onClick={(e) => handleUpdateProduct(product)}>
                  Guardar
                </button>
              </div>
            ) : (
              <>
                <img src={product.images[0]} alt={product.title} />
                <figcaption>{product.title}</figcaption>
                <h4>$ {product.price}</h4>
                <div className="edit-delete-btn">
                  <button onClick={() => setEditedProduct(product)}>✏</button>
                  <button>❌</button>
                </div>
              </>
            )}
          </figure>
        ))}
      </div>
    </>
  );
};

export default ProductList;
