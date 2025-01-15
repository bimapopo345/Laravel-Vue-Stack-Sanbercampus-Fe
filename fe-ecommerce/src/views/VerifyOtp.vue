<!-- src/views/VerifyOtp.vue -->
<template>
  <div class="flex justify-center items-center h-screen bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Verify OTP</h2>
        <form @submit.prevent="verifyOtp">
          <div class="form-control">
            <label class="label">OTP Code</label>
            <input
              v-model="otp"
              type="number"
              placeholder="Enter OTP"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Verify</button>
          </div>
        </form>
        <p class="mt-4">
          Didn't receive OTP?
          <button @click="generateOtp" class="text-blue-500">Resend</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/services/api";

const otp = ref("");

const verifyOtp = async () => {
  try {
    await axios.post("/verify-otp", { otp: otp.value });
    alert("Account verified successfully!");
    // Redirect atau tindakan lain, misalnya ke halaman utama
    window.location = "/";
  } catch (error) {
    alert("OTP verification failed.");
    console.error(error);
  }
};

const generateOtp = async () => {
  try {
    await axios.post("/generate-otp");
    alert("OTP has been resent.");
  } catch (error) {
    alert("Failed to resend OTP.");
    console.error(error);
  }
};
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
