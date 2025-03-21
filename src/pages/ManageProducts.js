// src/components/ManageProducts.js
import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext"; // Use ProductContext for product management
import "./ManageProducts.css";

const ManageProducts = () => {
  const {
    products,
    setProducts,
    loading: productsLoading,
    error: productsError,
    updateProduct,
    deleteProduct,
    refetchProducts, // Assuming ProductContext provides a refetch method
  } = useProducts();
  const [localError, setLocalError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "Men's Fashion", // Default category
    description: "",
    specs: [""], // Array for specifications
    reviews: [""], // Array for reviews
    inStock: true,
  });
  const [editingProduct, setEditingProduct] = useState(null); // For editing existing products

  // Fetch products on mount (public access, no authentication or admin required)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await refetchProducts(); // Publicly fetch products without token or auth
        setLocalError(null);
      } catch (err) {
        console.error("Error fetching products (public access):", err);
        // Override any access restriction errors from backend or context
        if (err.message && err.message.includes("Admin access required")) {
          setLocalError("Products are publicly accessible. Please ensure server and context allow public access.");
        } else {
          setLocalError(`Failed to load products: ${err.message || "Please check server status and try again."}`);
        }
      }
    };

    fetchProducts();
  }, [refetchProducts]);

  // Handle form input changes for new or editing product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "specs" || name === "reviews") {
      const index = parseInt(e.target.dataset.index, 10);
      const updatedArray = [...(editingProduct || newProduct)[name]];
      updatedArray[index] = value;
      setEditingProduct(prev => prev ? { ...prev, [name]: updatedArray } : null);
      setNewProduct(prev => ({ ...prev, [name]: updatedArray }));
    } else {
      setEditingProduct(prev => prev ? { ...prev, [name]: value } : null);
      setNewProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  // Add a new spec or review field
  const addField = (field) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
    if (editingProduct) {
      setEditingProduct(prev => ({
        ...prev,
        [field]: [...prev[field], ""],
      }));
    }
  };

  // Remove a spec or review field
  const removeField = (field, index) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
    if (editingProduct) {
      setEditingProduct(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  // Add a new product (public access, no authentication or admin required)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await refetchProducts(); // Publicly fetch latest products
      alert("Product added successfully!");
      setNewProduct({
        name: "",
        price: "",
        image: "",
        category: "Men's Fashion",
        description: "",
        specs: [""],
        reviews: [""],
        inStock: true,
      });
      setLocalError(null);
    } catch (err) {
      console.error("Error adding product (public access):", err);
      if (err.message && err.message.includes("Admin access required")) {
        setLocalError("Products can be added publicly. Please ensure server and context allow public access.");
      } else {
        setLocalError(`Failed to add product: ${err.message || "Please check server status and try again."}`);
      }
      alert(`Failed to add product: ${err.message || "Please check server status and try again."}`);
    }
  };

  // Update an existing product (public access, no authentication or admin required)
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct._id) return;
    try {
      const updatedData = {
        ...editingProduct,
        price: parseFloat(editingProduct.price) || 0,
        inStock: editingProduct.inStock === "true" || editingProduct.inStock === true,
      };
      await updateProduct(editingProduct._id, updatedData);
      await refetchProducts(); // Publicly refetch to ensure UI updates
      alert("Product updated successfully!");
      setEditingProduct(null);
      setLocalError(null);
    } catch (err) {
      console.error("Error updating product (public access):", err);
      if (err.message && err.message.includes("Admin access required")) {
        setLocalError("Products can be updated publicly. Please ensure server and context allow public access.");
      } else {
        setLocalError(`Failed to update product: ${err.message || "Please check server status and try again."}`);
      }
      alert(`Failed to update product: ${err.message || "Please check server status and try again."}`);
    }
  };

  // Delete a product (public access, no authentication or admin required)
  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      await refetchProducts(); // Publicly refetch to ensure UI updates
      alert("Product deleted successfully!");
      setLocalError(null);
    } catch (err) {
      console.error("Error deleting product (public access):", err);
      if (err.message && err.message.includes("Admin access required")) {
        setLocalError("Products can be deleted publicly. Please ensure server and context allow public access.");
      } else {
        setLocalError(`Failed to delete product: ${err.message || "Please check server status and try again."}`);
      }
      alert(`Failed to delete product: ${err.message || "Please check server status and try again."}`);
    }
  };

  // Start editing a product (public access, no authentication or admin required)
  const handleEdit = (product) => {
    setEditingProduct({ ...product, inStock: product.inStock.toString() });
    setNewProduct({
      name: "",
      price: "",
      image: "",
      category: "Men's Fashion",
      description: "",
      specs: [""],
      reviews: [""],
      inStock: true,
    });
  };

  // Handle retry for products with detailed logging (public access, no authentication or admin required)
  const handleRetry = () => {
    if (refetchProducts) {
      console.log("Attempting to refetch products (public access)...");
      refetchProducts()
        .then(() => {
          console.log("Refetch successful");
          setLocalError(null); // Clear error on success
        })
        .catch((err) => {
          console.error("Refetch failed (public access):", err);
          if (err.message && err.message.includes("Admin access required")) {
            setLocalError("Products are publicly accessible. Please ensure server and context allow public access.");
          } else {
            setLocalError(`Failed to load products: ${err.message}. Please check server status and try again.`);
          }
        });
    } else {
      console.warn("refetchProducts is not available in ProductContext. Consider adding it or updating ProductContext.");
      // Fallback: manually trigger fetch (public access)
      fetch("http://localhost:5000/api/products", {
        headers: {
          // No token or auth required for public access
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
          return response.json();
        })
        .then((data) => {
          setProducts(data || []);
          setLocalError(null); // Clear error on success
        })
        .catch((err) => {
          console.error("Manual refetch failed (public access):", err);
          if (err.message && err.message.includes("Admin access required")) {
            setLocalError("Products are publicly accessible. Please ensure server and context allow public access.");
          } else {
            setLocalError(`Failed to load products: ${err.message}. Please check server status and try again.`);
          }
        });
    }
  };

  return (
    <div className="manage-products-container">
      <h1>Manage Products</h1>

      {localError && (
        <div className="error-message">
          <p>{localError}</p>
          <button onClick={handleRetry} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {productsLoading ? (
        <p>Loading products...</p>
      ) : localError || productsError ? (
        <div className="error-message">
          <p>{localError || productsError}</p>
          <button onClick={handleRetry} className="retry-btn">
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Product Form (Add/Edit) */}
          <div className="product-form">
            <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={(editingProduct || newProduct).name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (Kshs.)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={(editingProduct || newProduct).price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={(editingProduct || newProduct).image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={(editingProduct || newProduct).category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Men's Fashion">Men's Fashion</option>
                  <option value="Women's Fashion">Women's Fashion</option>
                  <option value="Children's Fashion">Children's Fashion</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Wrist Watches">Wrist Watches</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={(editingProduct || newProduct).description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Specifications</label>
                {(editingProduct || newProduct).specs.map((spec, index) => (
                  <div key={index} className="array-field">
                    <input
                      type="text"
                      value={spec}
                      onChange={handleInputChange}
                      name="specs"
                      data-index={index}
                      placeholder={`Spec ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeField("specs", index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => addField("specs")}
                >
                  Add Spec
                </button>
              </div>
              <div className="form-group">
                <label>Reviews</label>
                {(editingProduct || newProduct).reviews.map((review, index) => (
                  <div key={index} className="array-field">
                    <input
                      type="text"
                      value={review}
                      onChange={handleInputChange}
                      name="reviews"
                      data-index={index}
                      placeholder={`Review ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeField("reviews", index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => addField("reviews")}
                >
                  Add Review
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="inStock">In Stock</label>
                <select
                  id="inStock"
                  name="inStock"
                  value={(editingProduct || newProduct).inStock.toString()}
                  onChange={handleInputChange}
                  required
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          {/* Product List */}
          <div className="product-list">
            <h2>Existing Products</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>Kshs. {product.price.toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageProducts;