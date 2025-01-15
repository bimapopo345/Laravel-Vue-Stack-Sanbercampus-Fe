<!-- src/components/Footer.vue -->
<template>
  <footer class="footer footer-center bg-base-300 text-base-content p-4">
    <div>
      <p>&copy; {{ currentYear }} - All rights reserved by E-Commerce</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentYear = ref(new Date().getFullYear());

onMounted(() => {
  // Update tahun secara otomatis setiap hari
  setInterval(() => {
    currentYear.value = new Date().getFullYear();
  }, 1000 * 60 * 60 * 24);
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
