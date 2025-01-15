<template>
  <div class="card bg-base-100 shadow-md p-4">
    <h2 class="text-xl font-bold mb-4">
      {{ isEdit ? "Edit Product" : "Add New Product" }}
    </h2>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="form-control mb-2">
        <label class="label">Name</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Product Name"
          class="input input-bordered"
          required
        />
      </div>
      <div class="form-control mb-2">
        <label class="label">Price</label>
        <input
          v-model.number="form.price"
          type="number"
          placeholder="Price"
          class="input input-bordered"
          required
        />
      </div>
      <div class="form-control mb-2">
        <label class="label">Description</label>
        <textarea
          v-model="form.description"
          placeholder="Description"
          class="textarea textarea-bordered"
        ></textarea>
      </div>
      <div class="form-control mb-2">
        <label class="label">Stock</label>
        <input
          v-model.number="form.stock"
          type="number"
          placeholder="Stock"
          class="input input-bordered"
          required
        />
      </div>
      <div class="form-control mb-2">
        <label class="label">Category</label>
        <select
          v-model="form.category_id"
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
        <label class="label">Image</label>
        <input
          type="file"
          @change="handleImageUpload"
          class="file-input file-input-bordered w-full"
        />
        <div v-if="existingImage && isEdit" class="mt-2">
          <img
            :src="existingImage"
            alt="Existing Image"
            class="w-32 h-32 object-cover"
          />
        </div>
      </div>
      <div class="flex justify-end space-x-2">
        <button type="button" @click="$emit('close')" class="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? "Update" : "Save" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "@/services/api";

const props = defineProps({
  initialData: {
    type: Object,
    default: null,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["success", "close"]);

const form = ref({
  name: "",
  price: 0,
  description: "",
  stock: 0,
  category_id: "",
});

const image = ref(null);
const existingImage = ref(null);
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
  formData.append("name", form.value.name);
  formData.append("price", form.value.price);
  formData.append("description", form.value.description);
  formData.append("stock", form.value.stock);
  formData.append("category_id", form.value.category_id);
  if (image.value) {
    formData.append("image", image.value);
  }

  try {
    if (props.isEdit && props.initialData) {
      const response = await axios.put(
        `/products/${props.initialData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      emit("success", response.data.product);
    } else {
      await axios.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      emit("success");
    }
    emit("close");
  } catch (error) {
    alert(
      props.isEdit ? "Failed to update product." : "Failed to add product."
    );
    console.error(error);
  }
};

// Jika edit, isi form dengan data awal
if (props.isEdit && props.initialData) {
  form.value = {
    name: props.initialData.name || "",
    price: props.initialData.price || 0,
    description: props.initialData.description || "",
    stock: props.initialData.stock || 0,
    category_id: props.initialData.category_id || "",
  };
  existingImage.value = props.initialData.image || null;
}

onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
