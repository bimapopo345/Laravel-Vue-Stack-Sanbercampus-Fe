<!-- src/views/Profile.vue -->
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Profile</h1>
    <div v-if="user && profile">
      <div class="flex items-center space-x-4 mb-4">
        <img
          :src="profile.image || defaultImage"
          alt="Profile Image"
          class="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 class="text-xl">{{ user.name }}</h2>
          <p>{{ user.email }}</p>
        </div>
      </div>
      <div class="space-y-4">
        <div>
          <label class="label">Bio</label>
          <textarea
            v-model="bio"
            class="textarea textarea-bordered w-full"
            placeholder="Your bio"
          ></textarea>
        </div>
        <div>
          <label class="label">Age</label>
          <input
            v-model="age"
            type="number"
            class="input input-bordered w-full"
            placeholder="Your age"
          />
        </div>
        <div>
          <label class="label">Profile Image</label>
          <input
            type="file"
            @change="handleImageUpload"
            class="file-input file-input-bordered w-full"
          />
        </div>
        <div>
          <button @click="updateProfile" class="btn btn-primary">
            Update Profile
          </button>
        </div>
      </div>
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
import axios from "@/services/api";

const user = ref(null);
const profile = ref(null);
const bio = ref("");
const age = ref("");
const profileImage = ref(null);
const defaultImage = "https://via.placeholder.com/150";
const error = ref(null);

const fetchProfile = async () => {
  try {
    const response = await axios.get("/profile");
    user.value = response.data.user;
    profile.value = response.data.profile;
    bio.value = profile.value.bio || "";
    age.value = profile.value.age || "";
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    if (err.response) {
      error.value = err.response.data.message || "Gagal memuat profil.";
    } else {
      error.value = "Gagal memuat profil.";
    }
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    profileImage.value = file;
  }
};

const updateProfile = async () => {
  const formData = new FormData();
  formData.append("bio", bio.value);
  formData.append("age", age.value);
  if (profileImage.value) {
    formData.append("image", profileImage.value);
  }

  try {
    const response = await axios.put("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Profile updated successfully!");
    // Update local state dengan data terbaru dari respons
    user.value = response.data.user;
    profile.value = response.data.profile;
    bio.value = profile.value.bio || "";
    age.value = profile.value.age || "";
    // Reset profileImage
    profileImage.value = null;
  } catch (err) {
    alert("Failed to update profile.");
    console.error("Update Error:", err);
  }
};

onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
