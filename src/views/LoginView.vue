<template>
  <div class="container mt-5" style="max-width: 400px;">
    <h3 class="mb-4 text-center">Iniciar Sesión</h3>

    <div class="card p-4 shadow">
      <div class="mb-3">
        <label>Email</label>
        <input
          type="email"
          v-model="email"
          class="form-control"
          placeholder="Correo"
        />
      </div>

      <div class="mb-3">
        <label>Password</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          placeholder="Contraseña"
        />
      </div>

      <button class="btn btn-primary w-100" @click="login">
        Ingresar
      </button>

      <div v-if="error" class="alert alert-danger mt-3">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
        const response = await axios.post("http://127.0.0.1:8000/api/login", {
          email: this.email,
          password: this.password
        });

        localStorage.setItem("token", response.data.access_token);

        this.$router.push("/");
      } catch (error) {
        this.error = "Credenciales incorrectas";
      }
    }
  }
};
</script>
