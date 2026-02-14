<template>
  <div class="login-page">
    <div class="login-container">
      <div class="card shadow-lg p-5 login-card">
        <h4 class="text-center mb-4">Crear Cuenta</h4>

        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input
            type="text"
            v-model="name"
            class="form-control"
            placeholder="Tu nombre"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Correo</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            placeholder="ejemplo@email.com"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Confirmar Contraseña</label>
          <input
            type="password"
            v-model="password_confirmation"
            class="form-control"
          />
        </div>

        <button class="btn btn-primary w-100" @click="register">
          Registrarse
        </button>

        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>

        <div class="text-center mt-3">
          <router-link to="/login">
            ¿Ya tienes cuenta? Iniciar sesión
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "RegisterView",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      error: null
    };
  },
  methods: {
    async register() {
      this.error = null;

      if (!this.name || !this.email || !this.password) {
        this.error = "Todos los campos son obligatorios";
        return;
      }

      try {
        await api.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        });

        this.$router.push("/login");
      } catch (error) {
        this.error = "Error al registrar usuario";
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.login-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
}
</style>
