<!-- src/components/CategoryCard.vue -->
<template>
  <div class="card bg-base-100 shadow-xl">
    <figure>
      <img
        :src="category.image || defaultImage"
        alt="Category Image"
        class="h-48 w-full object-cover"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ category.name }}</h2>
      <div class="card-actions justify-end">
        <router-link :to="`/categories/${category.id}`" class="btn btn-primary"
          >View Products</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  category: Object,
});

const defaultImage = "https://via.placeholder.com/150";
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
