import { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const data = response.data;
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Unable to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [priceRange, category, rating]);

  useEffect(() => {
    applySorting();
  }, [sortBy]);

  const applyFilters = () => {
    let filtered = [...products];

    if (priceRange) {
      const [min, max] = priceRange.split("-");
      filtered = filtered.filter(
        (product) =>
          product.price >= parseInt(min) && product.price <= parseInt(max)
      );
    }

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (rating) {
      filtered = filtered.filter(
        (product) => product.rating.rate >= parseFloat(rating)
      );
    }

    setFilteredProducts(filtered);
  };

  const applySorting = () => {
    let sorted = [...filteredProducts];

    switch (sortBy) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating-asc":
        sorted.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  };

  return (
    <div>
      <h1 className="header">Products List</h1>
      <br/>
<div className="filter-sort">
      <div>
        <h2 className="header2">Filter By:</h2>
        <label>
          Price Range:
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">All</option>
            <option value="0-25">$0 - $25</option>
            <option value="25-50">$25 - $50</option>
            <option value="50-75">$50 - $75</option>
            <option value="75-100">$75 - $100</option>
            <option value="100-125">$100 - $125</option>
            <option value="125-150">$125 - $150</option>
          </select>
        </label>

        <label className="label">
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">Men Clothing</option>
            <option value="women's clothing">Women Clothing</option>
            <option value="jewelery">jewelery</option>
          </select>
        </label>
        <label className="label">
          Rating:
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">All</option>
            <option value="5">5+</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
          </select>
        </label>
      </div>

      <div>
        <h2 className="header2">Sort By:</h2>
        <label>
          Title:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </label>

        <label className="label">
          Price:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </label>

        <label className="label">
          Rating:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="rating-asc">Rating (Low to High)</option>
            <option value="rating-desc">Rating (High to Low)</option>
          </select>
        </label>
      </div>
      </div>
      {filteredProducts.map((product) => (
        <div className="product-list" key={product.id}>
          <h2>{product.title}</h2>
          <p>Price: {product.price}</p>
          <p>Category: {product.category}</p>
          <p>Rating: {product.rating.rate}</p>
        </div>
      ))}
    </div>
  );
}
