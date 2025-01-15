// src/store/products.js
import { defineStore } from "pinia";
import axios from "@/services/api";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find((product) => product.id === id);
    },
  },
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get("/products");
        this.products = response.data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    },
    async addProduct(productData) {
      try {
        const response = await axios.post("/products", productData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.products.push(response.data);
      } catch (error) {
        console.error("Failed to add product:", error);
      }
    },
    async updateProduct(id, productData) {
      try {
        const response = await axios.put(`/products/${id}`, productData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const index = this.products.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.products[index] = response.data.product;
        }
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`/products/${id}`);
        this.products = this.products.filter((p) => p.id !== id);
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    },
  },
});
