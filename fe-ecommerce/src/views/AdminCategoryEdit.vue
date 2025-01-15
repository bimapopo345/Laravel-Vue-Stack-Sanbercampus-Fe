<!-- src/views/AdminCategoryEdit.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Edit Category</h1>
    <div v-if="category">
      <form @submit.prevent="updateCategory">
        <div class="form-control mb-2">
          <label class="label">Name</label>
          <input
            v-model="category.name"
            type="text"
            placeholder="Category Name"
            class="input input-bordered"
            required
          />
        </div>
        <div class="flex justify-end space-x-2">
          <button @click="goBack" type="button" class="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary">Update</button>
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

const category = ref(null);
const error = ref(null);

const fetchCategory = async () => {
  try {
    const response = await axios.get(`/categories/${route.params.id}`);
    category.value = response.data;
  } catch (err) {
    console.error("Failed to fetch category:", err);
    error.value = err.response?.data?.message || "Failed to load category.";
  }
};

const updateCategory = async () => {
  try {
    await axios.put(`/categories/${category.value.id}`, {
      name: category.value.name,
    });
    alert("Category updated successfully!");
    router.push("/admin/categories");
  } catch (err) {
    console.error("Failed to update category:", err);
    alert(err.response?.data?.message || "Failed to update category.");
  }
};

const goBack = () => {
  router.push("/admin/categories");
};

onMounted(() => {
  fetchCategory();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
