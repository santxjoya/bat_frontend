<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        BATConectadosHonduras
      </router-link>

      <div class="ms-auto" v-if="isAuthenticated">
        <button class="btn btn-outline-light btn-sm" @click="logout">
          Cerrar Sesión
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem("token");
    },
    showLogout() {
      return this.isAuthenticated && this.$route.path !== "/login";
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    }
  }
};
</script>
