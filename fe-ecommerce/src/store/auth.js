// src/store/auth.js
import { defineStore } from "pinia";
import api from "@/services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role?.name === "admin",
  },
  actions: {
    async login(credentials) {
      try {
        const response = await api.post("/login", credentials);
        this.token = response.data.access_token;
        localStorage.setItem("token", this.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        await this.fetchMe();
      } catch (error) {
        throw error;
      }
    },
    async register(data) {
      try {
        const response = await api.post("/register", data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    },
    async fetchMe() {
      try {
        const response = await api.get("/me");
        this.user = response.data;
      } catch (error) {
        throw error;
      }
    },
  },
});
