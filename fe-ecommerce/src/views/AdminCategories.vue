<!-- src/views/AdminCategories.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Manage Categories</h1>
    <button @click="showCreateForm = true" class="btn btn-primary mb-4">
      Add New Category
    </button>

    <div v-if="showCreateForm">
      <CategoryForm
        @success="fetchCategories"
        @close="showCreateForm = false"
      />
    </div>

    <div class="space-y-4">
      <div
        v-for="category in categories"
        :key="category.id"
        class="flex items-center justify-between"
      >
        <span>{{ category.name }}</span>
        <div class="space-x-2">
          <button
            @click="editCategory(category)"
            class="btn btn-sm btn-warning"
          >
            Edit
          </button>
          <button
            @click="deleteCategory(category.id)"
            class="btn btn-sm btn-error"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/services/api";
import CategoryForm from "@/components/CategoryForm.vue";
import { useRouter } from "vue-router";

const categories = ref([]);
const showCreateForm = ref(false);
const router = useRouter();

const fetchCategories = async () => {
  try {
    const response = await axios.get("/categories");
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const deleteCategory = async (id) => {
  if (confirm("Are you sure you want to delete this category?")) {
    try {
      await axios.delete(`/categories/${id}`);
      alert("Category deleted.");
      fetchCategories();
    } catch (error) {
      alert("Failed to delete category.");
      console.error(error);
    }
  }
};

const editCategory = (category) => {
  router.push(`/admin/categories/edit/${category.id}`);
};

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
