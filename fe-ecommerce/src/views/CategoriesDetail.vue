<!-- src/views/CategoriesDetail.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Category: {{ category.name }}</h1>
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
import { useRoute } from "vue-router";
import axios from "@/services/api";
import ProductCard from "@/components/ProductCard.vue";

const route = useRoute();
const category = ref({});
const products = ref([]);

const fetchCategoryAndProducts = async () => {
  try {
    const categoryId = route.params.id;
    const categoryResponse = await axios.get(`/categories/${categoryId}`);
    category.value = categoryResponse.data;

    // Asumsikan backend mengembalikan produk terkait kategori
    products.value = categoryResponse.data.products || [];
  } catch (error) {
    console.error("Failed to fetch category or products:", error);
  }
};

onMounted(() => {
  fetchCategoryAndProducts();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
