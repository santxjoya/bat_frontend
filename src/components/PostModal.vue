<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal-content">
      <h5>{{ title }}</h5>

      <form @submit.prevent="submitPost">
        <!-- Título -->
        <div class="mb-3">
          <label class="form-label">Título</label>
          <input type="text" v-model="post.title" class="form-control" required maxlength="255">
        </div>

        <!-- Contenido -->
        <div class="mb-3">
          <label class="form-label">Contenido</label>
          <textarea v-model="post.content" class="form-control" rows="4" required></textarea>
        </div>

        <!-- Categoría -->
        <div class="mb-3">
          <label class="form-label">Categoría</label>
          <select v-model="post.category_id" class="form-select" required>
            <option value="" disabled>Selecciona una categoría</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="text-end">
          <button type="button" class="btn btn-secondary me-2" @click="close">Cerrar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PostModal",
  props: {
    modelValue: Boolean,
    title: {
      type: String,
      default: "Crear Post"
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue", "saved"],
  data() {
    return {
      post: {
        title: "",
        content: "",
        category_id: ""
      }
    };
  },
  computed: {
    isOpen: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    }
  },
  methods: {
    close() {
      this.isOpen = false;
      this.clearForm();
    },
    clearForm() {
      this.post = { title: "", content: "", category_id: "" };
    },
    async submitPost() {
      try {
        const response = await axios.post("/api/posts", this.post);
        this.$emit("saved", response.data);
        this.close();
      } catch (error) {
        console.error(error);
        alert("Error al crear el post. Revisa los datos e intenta de nuevo.");
      }
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  max-width: 500px;
  width: 100%;
}
</style>
