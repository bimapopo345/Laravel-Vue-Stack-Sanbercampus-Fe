// src/main.js
import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "./services/api";
import { useAuthStore } from "./store/auth";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

// Set default Authorization header if token exists
const authStore = useAuthStore();
if (authStore.token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${authStore.token}`;
}

app.mount("#app");
