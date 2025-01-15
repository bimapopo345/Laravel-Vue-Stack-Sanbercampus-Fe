<!-- src/views/AdminOrders.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Manage Orders</h1>
    <div v-if="orders.length > 0" class="space-y-4">
      <OrderCard v-for="order in orders" :key="order.id" :order="order" />
    </div>
    <div v-else>
      <p>No orders found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/services/api";
import OrderCard from "@/components/OrderCard.vue";

const orders = ref([]);

const fetchOrders = async () => {
  try {
    const response = await axios.get("/orders");
    orders.value = response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
