<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin/dashboard">Dashboard</router-link>
        <router-link to="/admin/articles">Manajemen Artikel</router-link>
        <router-link to="/admin/treatments">Manajemen Treatment</router-link>
        <router-link to="/admin/services">Manajemen Layanan</router-link>
        <router-link to="/admin/forum">Manajemen Forum</router-link>
        <router-link to="/">Kembali ke Situs</router-link>
      </nav>
    </aside>
    <main class="main-content">
      <!-- Halaman admin akan dirender di sini -->
      <router-view />
    </main>
  </div>
</template>

<script setup>
// Script bisa ditambahkan nanti jika perlu
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.sidebar-header {
  padding: 20px;
  text-align: center;
  background-color: #34495e;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
}
.sidebar-nav a {
  padding: 15px 20px;
  color: #bdc3c7;
  text-decoration: none;
  transition: background-color 0.2s;
}
.sidebar-nav a:hover {
  background-color: #34495e;
}
.sidebar-nav .router-link-exact-active {
  background-color: #c2185b;
  color: white;
}
.main-content {
  flex-grow: 1;
  padding: 30px;
  background-color: #f4f6f9;
}
</style>
