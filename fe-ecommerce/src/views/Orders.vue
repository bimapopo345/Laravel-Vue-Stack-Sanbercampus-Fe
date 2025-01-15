<!-- src/views/Orders.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Your Orders</h1>
    <div v-if="orders.length > 0" class="space-y-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="card bg-base-100 shadow-md"
      >
        <div class="card-body">
          <h2 class="card-title">Order #{{ order.order_id }}</h2>
          <p>Product: {{ order.product.name }}</p>
          <p>Quantity: {{ order.quantity }}</p>
          <p>Total Price: ${{ order.total_price }}</p>
          <p>
            Status:
            <span :class="statusClass(order.status)">{{ order.status }}</span>
          </p>
          <p>Address: {{ order.address }}</p>
          <p>Ordered At: {{ formatDate(order.created_at) }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>You have no orders.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/services/api";

const orders = ref([]);

const fetchOrders = async () => {
  try {
    const response = await axios.get("/orders");
    orders.value = response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
};

const statusClass = (status) => {
  switch (status) {
    case "pending":
      return "badge badge-warning";
    case "success":
      return "badge badge-success";
    case "cancel":
      return "badge badge-error";
    default:
      return "badge";
  }
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.badge {
  padding: 0.5em 1em;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: white;
}

.badge-warning {
  background-color: #f59e0b; /* Yellow */
}

.badge-success {
  background-color: #10b981; /* Green */
}

.badge-error {
  background-color: #ef4444; /* Red */
}
</style>
