<!-- src/components/Navbar.vue -->
<template>
  <header>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <router-link to="/" class="btn btn-ghost text-xl"
          >E-Commerce</router-link
        >
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li><router-link to="/products">Products</router-link></li>
          <li><router-link to="/categories">Categories</router-link></li>
          <li v-if="authStore.isAuthenticated">
            <router-link to="/cart">Cart</router-link>
          </li>
        </ul>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li v-if="!authStore.isAuthenticated">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!authStore.isAuthenticated">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="authStore.isAuthenticated">
            <router-link to="/profile">Profile</router-link>
          </li>
          <li v-if="authStore.isAuthenticated">
            <button @click="logout" class="btn btn-ghost">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
