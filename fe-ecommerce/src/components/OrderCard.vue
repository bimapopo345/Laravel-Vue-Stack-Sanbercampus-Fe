<!-- src/components/OrderCard.vue -->
<template>
  <div class="card bg-base-100 shadow-md">
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
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  order: Object,
});

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
