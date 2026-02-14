<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal-content">
      <h5>{{ title }}</h5>

      <p>¿Estás seguro que quieres eliminar el post <strong>"{{ post.title }}"</strong>?</p>

      <div class="text-end">
        <button type="button" class="btn btn-outline-secondary me-2" @click="close">Cancelar</button>
        <button type="button" class="btn btn-danger" @click="confirmDelete">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeleteModal",
  props: {
    value: Boolean,
    post: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default: "Eliminar Post"
    }
  },
  emits: ["input", "deleted"],
  computed: {
    isOpen: {
      get() { return this.value; },
      set(val) { this.$emit("input", val); }
    }
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    confirmDelete() {
      this.$emit("deleted", this.post.id);  // avisamos al padre que borre
      this.close();
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
  max-width: 400px;
  width: 100%;
}
</style>
