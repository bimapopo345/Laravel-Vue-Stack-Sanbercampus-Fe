<!-- src/views/AdminProductEdit.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Edit Product</h1>
    <div v-if="product">
      <form @submit.prevent="updateProduct" enctype="multipart/form-data">
        <div class="form-control mb-2">
          <label class="label">Name</label>
          <input
            v-model="product.name"
            type="text"
            placeholder="Product Name"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control mb-2">
          <label class="label">Price</label>
          <input
            v-model.number="product.price"
            type="number"
            placeholder="Price"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control mb-2">
          <label class="label">Description</label>
          <textarea
            v-model="product.description"
            placeholder="Description"
            class="textarea textarea-bordered"
          ></textarea>
        </div>
        <div class="form-control mb-2">
          <label class="label">Stock</label>
          <input
            v-model.number="product.stock"
            type="number"
            placeholder="Stock"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control mb-2">
          <label class="label">Category</label>
          <select
            v-model="product.category_id"
            class="select select-bordered"
            required
          >
            <option disabled value="">Select Category</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-control mb-2">
          <label class="label">Current Image</label>
          <img
            :src="product.image || defaultImage"
            alt="Product Image"
            class="w-32 h-32 object-cover mb-2"
          />
        </div>
        <div class="form-control mb-2">
          <label class="label">Change Image</label>
          <input
            type="file"
            @change="handleImageUpload"
            class="file-input file-input-bordered w-full"
          />
        </div>
        <div class="flex justify-end space-x-2">
          <button @click="goBack" type="button" class="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? "Updating..." : "Update" }}
          </button>
        </div>
      </form>
    </div>
    <div v-else-if="error">
      <p class="text-red-500">{{ error }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/services/api";

const route = useRoute();
const router = useRouter();

const product = ref(null);
const categories = ref([]);
const newImage = ref(null);
const error = ref(null);
const loading = ref(false);
const defaultImage = "https://via.placeholder.com/150";

// Fetch product data
const fetchProduct = async () => {
  try {
    const response = await axios.get(`/products/${route.params.id}`);
    product.value = response.data;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    error.value = err.response?.data?.message || "Failed to load product.";
  }
};

// Fetch categories data
const fetchCategories = async () => {
  try {
    const response = await axios.get("/categories");
    categories.value = response.data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    error.value = err.response?.data?.message || "Failed to load categories.";
  }
};

// Handle image upload
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    newImage.value = file;
  }
};

// Update product
const updateProduct = async () => {
  loading.value = true;
  const formData = new FormData();
  formData.append("name", product.value.name);
  formData.append("price", product.value.price);
  formData.append("description", product.value.description);
  formData.append("stock", product.value.stock);
  formData.append("category_id", product.value.category_id);
  if (newImage.value) {
    formData.append("image", newImage.value);
  }

  try {
    const response = await axios.put(
      `/products/${product.value.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert("Product updated successfully!");
    product.value = response.data.product; // Update local product data
    router.push("/admin/products");
  } catch (err) {
    console.error("Failed to update product:", err);
    alert(err.response?.data?.message || "Failed to update product.");
  } finally {
    loading.value = false;
  }
};

// Navigate back to products list
const goBack = () => {
  router.push("/admin/products");
};

// Initialize data on component mount
onMounted(() => {
  fetchProduct();
  fetchCategories();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
