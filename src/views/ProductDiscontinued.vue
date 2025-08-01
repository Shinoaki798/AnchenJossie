<template>
  <div class="product-discontinued-container">
    <div class="message" v-if="isChinese">
      <h1>产品已停售</h1>
      <p>您所访问的产品 "{{ productName }}" 已不再销售。</p>
      <p>给您带来不便，我们深表歉意。请浏览我们的其他产品。</p>
      <router-link to="/zh/products" class="back-button">返回产品列表</router-link>
    </div>
    <div class="message" v-else>
      <h1>Product Discontinued</h1>
      <p>The product you are looking for, "{{ productName }}", is no longer for sale.</p>
      <p>We apologize for any inconvenience. Please browse our other products.</p>
      <router-link to="/products" class="back-button">Back to Products</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productNames: {
        'SiliRub-Economic-Extrusion': {
          en: 'Economic Extrusion Silicone Rubber',
          cn: '经济型挤出胶'
        },
        'SiliRub-Economic-Molding': {
          en: 'Economic Molding Silicone Rubber',
          cn: '经济型模压胶'
        }
      }
    };
  },
  computed: {
    isChinese() {
      return this.$route.path.startsWith('/zh/');
    },
    productSlug() {
      const pathParts = this.$route.path.split('/');
      return pathParts[pathParts.length - 1];
    },
    productName() {
      const productInfo = this.productNames[this.productSlug];
      if (!productInfo) {
        return this.productSlug; // Fallback to slug
      }
      return this.isChinese ? productInfo.cn : productInfo.en;
    }
  }
}
</script>

<style scoped>
.product-discontinued-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  text-align: center;
}
.message {
  max-width: 600px;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.back-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

.back-button:hover {
  background-color: #0056b3;
  color: white;
}
</style>
