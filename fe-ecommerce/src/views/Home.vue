<!-- src/views/Home.vue -->
<template>
  <div
    class="flex flex-col items-center justify-center py-12 px-6 sm:px-10 lg:px-20 bg-base-100 min-h-screen"
  >
    <div class="w-full max-w-[1000px]">
      <h1
        class="font-poppins text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-5"
      >
        Welcome to E-Commerce
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/services/api";
import ProductCard from "@/components/ProductCard.vue";

const products = ref([]);

const fetchProducts = async () => {
  try {
    const response = await axios.get("/products");
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
