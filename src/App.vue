<template>
  <div id="app">
    <AppNavbar />
    <router-view />
  </div>
</template>
<style>
body {
  background: linear-gradient(135deg, #f1f5f9, #D9D9D9);
  margin: 0;
  min-height: 100vh;
}
</style>
<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  name: "App",
  components: {
    AppNavbar
  }
};
</script>
