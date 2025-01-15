<!-- src/views/Register.vue -->
<template>
  <div class="flex justify-center items-center h-screen bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Register</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-control">
            <label class="label">Name</label>
            <input
              v-model="name"
              type="text"
              placeholder="Name"
              class="input input-bordered"
              required
            />
          </div>
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
          <div class="form-control">
            <label class="label">Confirm Password</label>
            <input
              v-model="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Register</button>
          </div>
        </form>
        <p class="mt-4">
          Already have an account?
          <router-link to="/login" class="text-blue-500"
            >Login here</router-link
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

const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const authStore = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  if (password.value !== password_confirmation.value) {
    alert("Passwords do not match!");
    return;
  }
  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    });
    alert("Registration successful. Please login.");
    router.push("/login");
  } catch (error) {
    alert("Registration failed. Please try again.");
    console.error(error);
  }
};
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
