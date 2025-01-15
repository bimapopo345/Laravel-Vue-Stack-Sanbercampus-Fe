<!-- src/components/ProductForm.vue -->
<template>
  <div class="card bg-base-100 shadow-md p-4">
    <h2 class="text-xl font-bold mb-4">Add New Product</h2>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="form-control mb-2">
        <label class="label">Name</label>
        <input
          v-model="name"
          type="text"
          placeholder="Product Name"
          class="input input-bordered"
          required
        />
      </div>
      <div class="form-control mb-2">
        <label class="label">Price</label>
        <input
          v-model="price"
          type="number"
          placeholder="Price"
          class="input input-bordered"
          required
        />
      </div>
      <div class="form-control mb-2">
        <label class="label">Description</label>
        <textarea
          v-model="description"
          placeholder="Description"
          class="textarea textarea-bordered"
        ></textarea>
      </div>
      <div class="form-control mb-2">
        <label class="label">Stock</label>
        <input
          v-model="stock"
          type="number"
          placeholder="Stock"
          class="input input-bordered"
          required
        />
      </div>
      <div class="form-control mb-2">
        <label class="label">Category</label>
        <select v-model="category_id" class="select select-bordered" required>
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
        <label class="label">Image</label>
        <input
          type="file"
          @change="handleImageUpload"
          class="file-input file-input-bordered w-full"
        />
      </div>
      <div class="flex justify-end space-x-2">
        <button type="button" @click="$emit('close')" class="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/services/api";

const name = ref("");
const price = ref(0);
const description = ref("");
const stock = ref(0);
const category_id = ref("");
const image = ref(null);
const categories = ref([]);

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get("/categories");
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const submitForm = async () => {
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("price", price.value);
  formData.append("description", description.value);
  formData.append("stock", stock.value);
  formData.append("category_id", category_id.value);
  if (image.value) {
    formData.append("image", image.value);
  }

  try {
    await axios.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Product added successfully!");
    $emit("success");
    $emit("close");
  } catch (error) {
    alert("Failed to add product.");
    console.error(error);
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
