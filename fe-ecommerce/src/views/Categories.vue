<!-- src/views/Categories.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Categories</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <CategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/services/api";
import CategoryCard from "@/components/CategoryCard.vue";

const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await axios.get("/categories");
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
