// src/store/auth.js
import { defineStore } from "pinia";
import axios from "@/services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post("/login", credentials);
        this.token = response.data.access_token;
        this.user = response.data.user;
        localStorage.setItem("token", this.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
      } catch (error) {
        throw error;
      }
    },
    async register(data) {
      try {
        const response = await axios.post("/register", data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
    async fetchMe() {
      try {
        const response = await axios.get("/me");
        this.user = response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
