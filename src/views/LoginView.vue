<template>
  <div class="login-page">
    <!-- FORM LOGIN -->
    <div class="login-container">
      <div class="card shadow-lg p-5 login-card">
        <h4 class="text-center mb-4">Iniciar Sesión</h4>

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
            placeholder="********"
          />
        </div>

        <button class="btn btn-outline-secondary w-100" @click="login">
          Ingresar
        </button>

        <div class="text-center mt-3">
          <router-link to="/register" class="text-decoration-none text-secondary">
            ¿No tienes cuenta? Registrarse
          </router-link>
        </div>

        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import api from "@/services/api";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: null
    };
  },
  methods: {
    async login() {
      this.error = null;

      if (!this.email || !this.password) {
        this.error = "Todos los campos son obligatorios";
        return;
      }

      try {
        const response = await api.post("/login", {
          email: this.email,
          password: this.password
        });
        localStorage.setItem("token", response.data.token);
        this.$router.push("/");
      } catch (error) {
        this.error = "Credenciales incorrectas";
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
