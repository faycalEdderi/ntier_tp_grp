import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Product.css";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
    });
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3001/products/getProducts"
            );
            setProducts(response.data);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la récupération des produits");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // Retrieve the token from local storage
            if (isEditing) {
                await axios.put(
                    `http://localhost:3001/products/edit/${selectedProduct._id}`,
                    { name: product.name },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token in the request headers
                        },
                    }
                );
                alert(`Produit ${product.name} modifiée avec succès`);
            } else {
                const response = await axios.post(
                    "http://localhost:3001/products/create",
                    { name: product.name },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token in the request headers
                        },
                    }
                );
                alert(`Product ${response.data.name} créée avec succès`);
            }
            setProduct({ name: "", description: "", price: "" });
            setIsEditing(false);
            setSelectedProduct(null);
            fetchProducts(); // Refresh the list of products
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la création ou de la modification du produit");
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token"); // Retrieve the token from local storage
            await axios.delete(`http://localhost:3001/products/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
            });
            alert("Product supprimée avec succès");
            fetchProducts(); // Refresh the list of product
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la suppression du produit");
        }
    };

    const handleSelect = async (id) => {
        try {
            const response = await axios.get(
                `http://localhost:3001/products/getProduct/${id}`
            );
            setSelectedProduct(response.data);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la récupération du product");
        }
    };

    const handleEdit = (product) => {
        setProduct({
            name: product.name,
            description: product.description,
            price: product.price,
        });
        setSelectedProduct(product);
        setIsEditing(true);
    };

    return (
        <div className='container'>
            {selectedProduct && (
                <div>
                    <h2>Détails du produit</h2>
                    <p>Titre: {selectedProduct.name}</p>
          <p>Date: {new Date(selectedProduct.date).toLocaleString()}</p>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input
          type='text'
          placeholder='Nom du produit'
                    value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
        <button type='submit'>{isEditing ? "Modifier" : "Ajouter"}</button>
            </form>
            <h2>Liste des produits</h2>
            <ul>
                {products.map((prod) => (
                    <li key={prod._id}>
                        {prod.name}
                        <div>
              <button onClick={() => handleSelect(prod._id)}>Détails</button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(prod._id);
                                }}
                            >
                                Supprimer
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(prod);
                                }}
                            >
                                Modifier
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddProduct;
