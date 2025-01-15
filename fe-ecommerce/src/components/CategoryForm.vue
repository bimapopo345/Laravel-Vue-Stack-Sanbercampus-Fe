<!-- src/components/CategoryForm.vue -->
<template>
  <div class="card bg-base-100 shadow-md p-4">
    <h2 class="text-xl font-bold mb-4">Add New Category</h2>
    <form @submit.prevent="submitForm">
      <div class="form-control mb-2">
        <label class="label">Name</label>
        <input
          v-model="name"
          type="text"
          placeholder="Category Name"
          class="input input-bordered"
          required
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
import { ref } from "vue";
import axios from "@/services/api";

const name = ref("");

const submitForm = async () => {
  try {
    await axios.post("/categories", { name: name.value });
    alert("Category added successfully!");
    $emit("success");
    $emit("close");
  } catch (error) {
    alert("Failed to add category.");
    console.error(error);
  }
};
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
