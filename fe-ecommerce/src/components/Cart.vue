<!-- src/components/Cart.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
    <div v-if="cartItems.length > 0" class="space-y-4">
      <div
        v-for="item in cartItems"
        :key="item.product.id"
        class="flex items-center justify-between"
      >
        <div>
          <h2 class="font-semibold">{{ item.product.name }}</h2>
          <p>${{ item.product.price }} x {{ item.quantity }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="decrement(item)" class="btn btn-sm btn-secondary">
            -
          </button>
          <span>{{ item.quantity }}</span>
          <button @click="increment(item)" class="btn btn-sm btn-secondary">
            +
          </button>
          <button @click="removeItem(item)" class="btn btn-sm btn-error">
            Remove
          </button>
        </div>
      </div>
      <div class="flex justify-end font-bold">Total: ${{ total }}</div>
      <div class="flex justify-end">
        <button @click="checkout" class="btn btn-primary">Checkout</button>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/store/cart";
import { useRouter } from "vue-router";
import axios from "@/services/api";

const cartStore = useCartStore();
const router = useRouter();

const cartItems = computed(() => cartStore.items);
const total = computed(() => cartStore.totalPrice);

const increment = (item) => {
  cartStore.increment(item.product.id);
};

const decrement = (item) => {
  cartStore.decrement(item.product.id);
};

const removeItem = (item) => {
  cartStore.removeItem(item.product.id);
};

const checkout = async () => {
  try {
    // Data checkout yang akan dikirim ke backend
    const payload = cartItems.value.map((item) => ({
      idProduct: item.product.id,
      price: item.product.price,
      quantity: item.quantity,
      name: item.product.name,
    }));
    console.log("Payload:", payload); // Tambahkan log ini untuk debugging

    // Kirim data ke backend dan dapatkan snap token
    const response = await axios.post("/checkout", payload);
    const snapToken = response.data.snap_token;

    // Integrasi dengan Midtrans Snap
    window.snap.pay(snapToken, {
      onSuccess: function (result) {
        alert("Payment successful!");
        cartStore.clearCart(); // Kosongkan cart setelah checkout
        router.push("/orders"); // Redirect ke halaman pesanan
      },
      onPending: function (result) {
        alert("Payment pending. Please complete the payment.");
        console.log(result);
      },
      onError: function (result) {
        alert("Payment failed. Please try again.");
        console.error(result);
      },
      onClose: function () {
        alert("Payment popup closed.");
      },
    });
  } catch (error) {
    alert("Checkout failed. Please try again.");
    console.error(error);
  }
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
