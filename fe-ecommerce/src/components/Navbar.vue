<!-- src/components/Navbar.vue -->
<template>
  <header>
    <div class="navbar bg-base-100">
      <!-- Logo / Brand -->
      <div class="flex-1">
        <router-link to="/" class="btn btn-ghost text-xl"
          >E-Commerce</router-link
        >
      </div>

      <!-- Menu Utama -->
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li><router-link to="/products">Products</router-link></li>
          <li><router-link to="/categories">Categories</router-link></li>
          <li v-if="authStore.isAuthenticated">
            <router-link to="/cart">Cart</router-link>
          </li>

          <!-- Dropdown Admin -->
          <li v-if="authStore.isAdmin" class="dropdown dropdown-hover">
            <a tabIndex="0" class="btn btn-ghost rounded-btn">
              Admin
              <svg
                class="fill-current ml-2"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </a>
            <ul
              tabIndex="0"
              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
            >
              <li>
                <router-link to="/admin/products">Manage Products</router-link>
              </li>
              <li>
                <router-link to="/admin/categories"
                  >Manage Categories</router-link
                >
              </li>
              <li>
                <router-link to="/admin/orders">Manage Orders</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- Menu Login/Register atau Profile/Logout -->
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
