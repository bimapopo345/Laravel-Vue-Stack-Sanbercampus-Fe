<!-- src/views/AdminProducts.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Manage Products</h1>
    <button @click="showCreateForm = true" class="btn btn-primary mb-4">
      Add New Product
    </button>

    <div v-if="showCreateForm">
      <ProductForm @success="fetchProducts" @close="showCreateForm = false" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :isAdmin="true"
        @update="fetchProducts"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/services/api";
import ProductCard from "@/components/ProductCard.vue";
import ProductForm from "@/components/ProductForm.vue";

const products = ref([]);
const showCreateForm = ref(false);

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
