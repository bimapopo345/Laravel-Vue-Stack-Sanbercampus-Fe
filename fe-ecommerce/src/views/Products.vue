<!-- src/views/Products.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
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
