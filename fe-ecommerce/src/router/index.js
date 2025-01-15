// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Products from "@/views/Products.vue";
import Categories from "@/views/Categories.vue";
import Profile from "@/views/Profile.vue";
import Orders from "@/views/Orders.vue";
import Cart from "@/components/Cart.vue";
import VerifyOtp from "@/views/VerifyOtp.vue";
import CategoriesDetail from "@/views/CategoriesDetail.vue";

import { useAuthStore } from "@/store/auth";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  {
    path: "/verify-otp",
    name: "VerifyOtp",
    component: VerifyOtp,
    meta: { requiresAuth: true },
  },
  { path: "/products", name: "Products", component: Products },
  { path: "/categories", name: "Categories", component: Categories },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
    meta: { requiresAuth: true },
  },
  {
    path: "/categories/:id",
    name: "CategoriesDetail",
    component: CategoriesDetail,
  },
  // Tambahkan route lain sesuai kebutuhan
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware untuk proteksi route
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
