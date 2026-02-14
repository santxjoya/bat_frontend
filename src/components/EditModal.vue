<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal-content">
      <h5>{{ title }}</h5>

      <form @submit.prevent="submitPut">
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
          <button type="button" class="btn btn-outline-secondary me-2" @click="close">Cerrar</button>
          <button type="submit" class="btn btn-secondary">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "EditModal",
  props: {
    value: Boolean,
    postData: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: "Editar Post"
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ["input", "saved"],
  computed: {
    isOpen: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  data() {
    return {
      post: {
        id: null,
        title: "",
        content: "",
        category_id: ""
      }
    };
  },
  watch: {
    // Cuando se abre el modal, se llenan los datos del post
    isOpen(newVal) {
      if (newVal && this.postData) {
        this.post = { 
          id: this.postData.id,
          title: this.postData.title,
          content: this.postData.content,
          category_id: this.postData.category?.id || ""
        };
      }
    }
  },
  methods: {
    close() {
      this.isOpen = false;
      this.clearForm();
    },
    clearForm() {
      this.post = { id: null, title: "", content: "", category_id: "" };
    },
    async submitPut() {
      try {
        const response = await api.put(`/posts/${this.post.id}`, {
          title: this.post.title,
          content: this.post.content,
          category_id: this.post.category_id
        });
        this.$emit("saved", response.data);
        this.close();
      } catch (error) {
        console.error(error);
        alert("Error al actualizar el post. Revisa los datos e intenta de nuevo.");
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
