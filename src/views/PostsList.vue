<template>
  <div class="container mt-4">
<div class="d-flex justify-content-between align-items-center mb-3">
  <h3 class="m-0">Publicaciones</h3>
  <button class="btn btn-primary" @click="showModal = true">
    Crear Post
  </button>
</div>

    <div class="mb-3">
        <select
            class="form-select"
            v-model="selectedCategory"
            @change="getPosts(1)"
        >
            <option value="">Todas las categorías</option>
            <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
            >
                {{ category.name }}
            </option>
        </select>
    </div>

    <!-- Tabla -->
    <div class="card shadow-sm">
      <div class="card-body p-0">
        <table class="table mb-0">
          <thead class="table-light">
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.title }}</td>
              <td>{{ post.user?.name }}</td>
              <td>{{ post.category?.name }}</td>
              <td>{{ formatDate(post.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Paginación -->
    <div class="d-flex justify-content-center mt-3">
      <nav v-if="lastPage > 1">
        <ul class="pagination">
          <li
            class="page-item"
            :class="{ disabled: currentPage === 1 }"
          >
            <button class="page-link" @click="changePage(currentPage - 1)">
              Anterior
            </button>
          </li>

          <li
            class="page-item"
            v-for="page in lastPage"
            :key="page"
            :class="{ active: page === currentPage }"
          >
            <button class="page-link" @click="changePage(page)">
              {{ page }}
            </button>
          </li>

          <li
            class="page-item"
            :class="{ disabled: currentPage === lastPage }"
          >
            <button class="page-link" @click="changePage(currentPage + 1)">
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
<PostModal
  v-model="showModal"
  :categories="categories"
  @saved="addPost"
/>
  </div>
</template>

<script>
import PostModal from "@/components/PostModal.vue";
import api from "@/services/api";

export default {
  name: "PostsList",
  components: { PostModal },
  data() {
    return {
      posts: [],
      currentPage: 1,
      lastPage: 1,
      categories: [],
      selectedCategory: "",
      showModal: false
    };
  },

  mounted() {
    this.getPosts();
    this.getCategories();
  },

methods: {
async getPosts(page = 1) {
  try {

    const params = { page };
    if (this.selectedCategory) {
      params.category_id = this.selectedCategory;
    }

    const response = await api.get("/posts", { params });
    const res = response.data;

    this.posts = res.data;
    this.currentPage = res.current_page;
    this.lastPage = res.last_page;
  } catch (error) {
    console.error("Error cargando posts", error);
  }
},

  async getCategories() {
    try {
      const response = await api.get("/categories");
      this.categories = response.data;
    } catch (error) {
      console.error("Error cargando categorías", error);
    }
  },

  changePage(page) {
    if (page < 1 || page > this.lastPage) return;
    this.getPosts(page);
  },

  formatDate(date) {
    return new Date(date).toLocaleDateString();
  },

  addPost(newPost) {
    this.posts.push(newPost);
  }
}
};
</script>
