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

import AdminCategories from "@/views/AdminCategories.vue";
import AdminOrders from "@/views/AdminOrders.vue";
import AdminProducts from "@/views/AdminProducts.vue";
import AdminCategoryEdit from "@/views/AdminCategoryEdit.vue";
import AdminProductEdit from "@/views/AdminProductEdit.vue";

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
  // Rute Admin
  {
    path: "/admin/products",
    name: "AdminProducts",
    component: AdminProducts,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: "/admin/products/edit/:id",
    name: "AdminProductEdit",
    component: AdminProductEdit,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: "/admin/categories",
    name: "AdminCategories",
    component: AdminCategories,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: "/admin/categories/edit/:id",
    name: "AdminCategoryEdit",
    component: AdminCategoryEdit,
    meta: { requiresAuth: true, isAdmin: true },
  },
  {
    path: "/admin/orders",
    name: "AdminOrders",
    component: AdminOrders,
    meta: { requiresAuth: true, isAdmin: true },
  },
  // Tambahkan rute lain sesuai kebutuhan
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware untuk proteksi route
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Cek autentikasi
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "Login" });
    return;
  }

  // Cek admin
  if (to.meta.isAdmin && !authStore.isAdmin) {
    next({ name: "Home" });
    return;
  }

  next();
});

export default router;
