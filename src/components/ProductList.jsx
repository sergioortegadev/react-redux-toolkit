import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, readProducts, updateProduct } from "../redux/productsSlice";

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
        id: Date.now().toString(),
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
        .catch((error) => console.warn(error));
    }
  };

  const handleUpdateProduct = (prod) => {
    if (prod.title !== editedProduct.title || prod.price !== editedProduct.price) {
      const productToEdit = {
        ...editedProduct,
        title: editedProduct.title,
        price: parseInt(editedProduct.price),
      };
      dispatch(updateProduct(productToEdit));

      setEditedProduct(null);

      axios
        .put(`http://localhost:3001/products/${editedProduct.id}`, productToEdit)
        .then(() => {
          setNewProductName(INITIAL_PROD);
        })
        .catch((error) => console.warn(error));
    } else {
      setEditedProduct(null); //Si no se modifica title ni price que no haga request a DB ni al state de redux
    }
  };
  const handleDeleteProduct = (prodId) => {
    if (confirm(`Eliminar producto ID: ${prodId}?`)) {
      dispatch(deleteProduct(prodId));

      setEditedProduct(null);

      axios
        .delete(`http://localhost:3001/products/${prodId}`)
        .catch((error) => console.warn("Error al eliminar archivo: ", error));
    }
  };

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

        <button onClick={handleCreateProduct}>➕ Product</button>
      </aside>
      <h3>Product List</h3>
      <div className="cards">
        {products.data.map((product) => (
          <figure key={product.id}>
            {editedProduct?.id === product.id ? ( //Atento a "?" que permite "null"
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
                <button onClick={() => handleUpdateProduct(product)}>Guardar</button>
                <button onClick={() => setEditedProduct(null)}>Cancelar</button>
              </div>
            ) : (
              <>
                <img src={product.images[0]} alt={product.title} />
                <figcaption>{product.title}</figcaption>
                <h4>$ {product.price}</h4>
                <div className="edit-delete-btn">
                  <button onClick={() => setEditedProduct(product)}>✏</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>❌</button>
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
