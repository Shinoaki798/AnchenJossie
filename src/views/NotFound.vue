<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist or has been moved.</p>
      <router-link to="/" class="home-link">Go to Homepage</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
}
.not-found-content {
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(60, 60, 120, 0.12);
}
h1 {
  font-size: 6rem;
  color: #3b82f6;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
}
h2 {
  font-size: 2rem;
  color: #22223b;
  margin-bottom: 1rem;
}
p {
  color: #4b5563;
  margin-bottom: 2rem;
}
.home-link {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #3b82f6;
  color: white;
  border-radius: 2rem;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
}
.home-link:hover {
  background: #2563eb;
}
</style>
