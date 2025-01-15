// src/store/cart.js
import { defineStore } from "pinia";
import axios from "@/services/api";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    totalPrice: (state) =>
      state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
  },
  actions: {
    addItem(product) {
      const existingItem = this.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ product, quantity: 1 });
      }
    },
    removeItem(productId) {
      this.items = this.items.filter((item) => item.product.id !== productId);
    },
    increment(productId) {
      const item = this.items.find((item) => item.product.id === productId);
      if (item) {
        item.quantity += 1;
      }
    },
    decrement(productId) {
      const item = this.items.find((item) => item.product.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    async checkout() {
      try {
        const orderData = this.items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        }));
        await axios.post("/orders", { items: orderData });
        this.items = [];
      } catch (error) {
        throw error;
      }
    },
  },
});
