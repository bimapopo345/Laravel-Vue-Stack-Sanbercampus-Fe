<!-- src/components/ProductCard.vue -->
<template>
  <div class="card bg-base-100 shadow-xl">
    <figure>
      <img
        :src="product.image || defaultImage"
        alt="Product Image"
        class="h-48 w-full object-cover"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ product.name }}</h2>
      <p class="text-gray-700">{{ product.description }}</p>
      <p class="font-bold mt-2">${{ product.price }}</p>
      <div class="card-actions justify-end">
        <button v-if="!isAdmin" @click="addToCart" class="btn btn-primary">
          Add to Cart
        </button>
        <div v-if="isAdmin" class="flex space-x-2">
          <button @click="editProduct" class="btn btn-warning btn-sm">
            Edit
          </button>
          <button @click="deleteProduct" class="btn btn-error btn-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useCartStore } from "@/store/cart";
import { useRouter } from "vue-router";
import axios from "@/services/api";

const props = defineProps({
  product: Object,
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update"]);

const defaultImage = "https://via.placeholder.com/150";

const cartStore = useCartStore();
const router = useRouter();

const addToCart = () => {
  cartStore.addItem(props.product);
  alert("Product added to cart!");
};

const editProduct = () => {
  router.push(`/admin/products/edit/${props.product.id}`);
};

const deleteProduct = async () => {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await axios.delete(`/products/${props.product.id}`);
      alert("Product deleted successfully!");
      emit("update"); // Emit event untuk refresh list
    } catch (error) {
      alert("Failed to delete product.");
      console.error(error);
    }
  }
};
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
