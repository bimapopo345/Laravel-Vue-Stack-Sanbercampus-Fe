<!-- src/views/AdminProductEdit.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Edit Product</h1>

    <!-- Loading State -->
    <div v-if="loading">
      <p>Loading...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- Form Edit Produk -->
    <div v-else-if="product">
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
          <button type="submit" class="btn btn-primary" :disabled="updating">
            {{ updating ? "Updating..." : "Update" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/services/api";

const route = useRoute();
const router = useRouter();

const product = ref(null);
const categories = ref([]);
const newImage = ref(null);
const error = ref(null);
const loading = ref(true);
const updating = ref(false);
const defaultImage = "https://via.placeholder.com/150";

// Fungsi untuk mengambil data produk
const fetchProduct = async () => {
  try {
    const response = await api.get(`/products/${route.params.id}`);
    console.log("Product Fetch Response:", response.data); // Debugging
    if (response.data) {
      // Sesuaikan dengan struktur respons API
      product.value = response.data;
    } else {
      throw new Error("Product data is missing.");
    }
  } catch (err) {
    console.error("Failed to fetch product:", err);
    error.value = err.response?.data?.message || "Failed to load product.";
  } finally {
    loading.value = false;
  }
};

// Fungsi untuk mengambil data kategori
const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    categories.value = response.data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    error.value = err.response?.data?.message || "Failed to load categories.";
  }
};

// Fungsi untuk menangani upload gambar baru
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    newImage.value = file;
  }
};

// Fungsi untuk memperbarui produk
const updateProduct = async () => {
  updating.value = true;
  const formData = new FormData();
  formData.append("name", product.value.name);
  formData.append("price", product.value.price);
  formData.append("description", product.value.description);
  formData.append("stock", product.value.stock);
  formData.append("category_id", product.value.category_id);
  if (newImage.value) {
    formData.append("image", newImage.value);
  }

  // Tambahkan _method=PUT sesuai dengan yang Anda lakukan di Postman
  formData.append("_method", "PUT");

  console.log("Form Data:", {
    name: product.value.name,
    price: product.value.price,
    description: product.value.description,
    stock: product.value.stock,
    category_id: product.value.category_id,
    image: newImage.value ? newImage.value.name : "No Image",
  });

  try {
    const response = await api.post(`/products/${product.value.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Update Product Response:", response.data); // Debugging
    alert("Product updated successfully!");
    router.push("/admin/products");
  } catch (err) {
    console.error("Failed to update product:", err);
    alert(err.response?.data?.message || "Failed to update product.");
  } finally {
    updating.value = false;
  }
};

// Fungsi untuk kembali ke daftar produk
const goBack = () => {
  router.push("/admin/products");
};

// Inisialisasi data saat komponen dimuat
onMounted(() => {
  fetchProduct();
  fetchCategories();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
