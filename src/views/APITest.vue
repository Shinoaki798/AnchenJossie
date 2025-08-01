<template>
  <div>
    <h1>API Test</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Loading...",
    };
  },
  async created() {
    try {
      const response = await fetch("/api/hello");
      const data = await response.json();
      this.message = data.message;
    } catch (error) {
      this.message = "Error fetching data";
      console.error(error);
    }
  },
};
</script>
