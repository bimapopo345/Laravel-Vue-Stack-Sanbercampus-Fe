<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Manage Products</h1>
    <button @click="showCreateForm = true" class="btn btn-primary mb-4">
      Add New Product
    </button>

    <div v-if="showCreateForm">
      <ProductForm @success="handleSuccess" @close="showCreateForm = false" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in productsStore.products"
        :key="product.id"
        :product="product"
        :isAdmin="true"
        @update="productsStore.fetchProducts"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/services/api";
import ProductCard from "@/components/ProductCard.vue";
import ProductForm from "@/components/ProductForm.vue";
import { useProductsStore } from "@/store/products";

const productsStore = useProductsStore();
const showCreateForm = ref(false);

const handleSuccess = () => {
  alert("Product added successfully!");
  showCreateForm.value = false;
  productsStore.fetchProducts();
};

onMounted(() => {
  productsStore.fetchProducts();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
