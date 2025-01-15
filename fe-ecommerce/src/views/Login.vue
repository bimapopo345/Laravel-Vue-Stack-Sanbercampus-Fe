<!-- src/views/Login.vue -->
<template>
  <div class="flex justify-center items-center h-screen bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-control">
            <label class="label">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Login</button>
          </div>
        </form>
        <p class="mt-4">
          Don't have an account?
          <router-link to="/register" class="text-blue-500"
            >Register here</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
    await authStore.fetchMe();
    router.push("/");
  } catch (error) {
    alert("Login failed. Please check your credentials.");
    console.error(error);
  }
};
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
