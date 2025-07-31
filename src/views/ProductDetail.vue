<template>
  <div v-if="product" class="product-detail-page fade-in">
    <div class="main-content">
      <div class="container">
        <router-link :to="productListPath" class="return-button">{{ returnButtonText }}</router-link>
        <div class="page-title">{{ product.title }}</div>
        <div class="subtitle">{{ product.subtitle }}</div>

        <div class="images" v-if="product.images && product.images.length">
          <img v-for="(image, index) in product.images" :key="index" :src="image.src" :alt="image.alt">
        </div>

        <div v-for="(section, index) in product.sections" :key="index" class="content-section">
          <div class="section-title">{{ section.title }}</div>

          <div v-for="(block, bIndex) in section.content" :key="bIndex">
            <!-- Features Section -->
            <div v-if="block.type === 'features'">
              <ul class="characteristics">
                <li v-for="(feature, fIndex) in block.data" :key="fIndex">
                  <span v-if="typeof feature === 'string'">{{ feature }}</span>
                  <div v-else>
                    <span>{{ feature.text }}</span>
                    <ul class="sub-characteristics">
                      <li v-for="(subpoint, sIndex) in feature.subpoints" :key="sIndex">{{ subpoint }}</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Table Section -->
            <div v-if="block.type === 'table'">
              <table>
                <tbody>
                  <tr v-for="(row, rIndex) in block.data.rows" :key="rIndex">
                    <component v-for="(cell, cIndex) in row" :key="cIndex" :is="cell.tag || 'td'" :colspan="cell.colspan" :rowspan="cell.rowspan">
                      {{ cell.text }}
                    </component>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Applications Section -->
            <div v-if="block.type === 'applications'">
              <ul class="application-list">
                <li v-for="(item, aIndex) in block.data" :key="aIndex">
                  <span v-if="typeof item === 'string'">{{ item }}</span>
                  <div v-else>
                    <span>{{ item.text }}</span>
                    <ul class="sub-characteristics">
                      <li v-for="(subpoint, sIndex) in item.subpoints" :key="sIndex">{{ subpoint }}</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Storage/Packaging Section -->
            <div v-if="block.type === 'storage'">
              <p>{{ block.data }}</p>
            </div>
          </div>
        </div>

        <div class="footnote" v-if="product.footnotes && product.footnotes.length">
          <p v-for="(note, nIndex) in product.footnotes" :key="nIndex">{{ note }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="error" class="loading-error">
    <p>{{ error }}</p>
  </div>
  <div v-else class="loading">
    <div class="skeleton-container">
      <!-- Header skeleton -->
      <div class="skeleton-header">
        <div class="skeleton-line skeleton-title"></div>
        <div class="skeleton-line skeleton-subtitle"></div>
      </div>
      
      <!-- Content skeleton -->
      <div class="skeleton-content">
        <div class="skeleton-section">
          <div class="skeleton-line skeleton-heading"></div>
          <div class="skeleton-line skeleton-text"></div>
          <div class="skeleton-line skeleton-text short"></div>
        </div>
        
        <div class="skeleton-section">
          <div class="skeleton-line skeleton-heading"></div>
          <div class="skeleton-line skeleton-text"></div>
          <div class="skeleton-line skeleton-text"></div>
          <div class="skeleton-line skeleton-text short"></div>
        </div>
        
        <div class="skeleton-section">
          <div class="skeleton-line skeleton-heading"></div>
          <div class="skeleton-line skeleton-text"></div>
          <div class="skeleton-line skeleton-text short"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const product = ref(null);
const error = ref(null);

const lang = computed(() => route.path.startsWith('/zh') ? 'cn' : 'en');

const productListPath = computed(() => {
  return lang.value === 'cn' ? '/zh/products' : '/products';
});

const returnButtonText = computed(() => {
  return lang.value === 'cn' ? '← 返回产品列表' : '← Back to Products';
});

const fetchProductData = async () => {
  try {
    const productSlug = route.params.slug;
    // Normalize to handle potential case differences or extra slashes
    const cleanSlug = productSlug.replace(/\/$/, '');
    const response = await fetch(`/products-data/${lang.value}/${cleanSlug}.json`);
    if (!response.ok) {
      throw new Error(`Product data not found for ${cleanSlug}`);
    }
    product.value = await response.json();
    error.value = null;
  } catch (e) {
    console.error(e);
    error.value = `Sorry, we could not load the product data. Please check the URL or go back to the products page.`;
    product.value = null;
  }
};

// Fetch data on component mount and when route changes
onMounted(fetchProductData);
watch(() => route.params.slug, fetchProductData);
</script>

<style scoped>
.return-button {
  display: inline-block;
  margin-bottom: 20px;
  color: #007c00;
  text-decoration: none;
  font-weight: bold;
}

.return-button:hover {
  text-decoration: underline;
}

.product-detail-page {
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

body {
    font-family: "Playfair Display", serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1;
    position: relative;
}

.container {
    max-width: 1100px;
    margin: 30px auto;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.page-title {
    font-size: 2.2em;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: center;
}

.subtitle {
    font-size: 1.2em;
    color: #666;
    text-align: center;
    margin-bottom: 30px;
}

.images {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.images img {
    width: 300px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.content-section {
    margin-bottom: 20px;
}

.section-title {
    font-size: 1.4em;
    color: #007c00;
    margin-top: 30px;
    margin-bottom: 10px;
}

ul.characteristics {
    margin-bottom: 30px;
    padding-left: 20px;
}

ul.characteristics li {
    margin-bottom: 5px;
}

ul.sub-characteristics {
    margin-top: 5px;
    padding-left: 20px;
}

.application-list {
    margin-bottom: 30px;
    padding-left: 20px;
}

.application-list li {
    margin-bottom: 5px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 0.95em;
}

table,
th,
td {
    border: 1px solid #ccc;
}

th,
td {
    padding: 10px;
    text-align: center;
}

th {
    background-color: #e0f0e0;
}

.footnote {
    font-size: 0.85em;
    margin-top: 20px;
    color: #666;
}

.loading, .loading-error {
  text-align: center;
  padding: 50px;
  font-size: 1.2em;
}

.skeleton-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.skeleton-header {
  margin-bottom: 40px;
}

.skeleton-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.skeleton-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-line {
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-title {
  height: 32px;
  width: 60%;
  margin-bottom: 16px;
}

.skeleton-subtitle {
  height: 20px;
  width: 40%;
}

.skeleton-heading {
  height: 24px;
  width: 30%;
  margin-bottom: 8px;
}

.skeleton-text {
  height: 16px;
  width: 100%;
}

.skeleton-text.short {
  width: 75%;
}

@keyframes skeleton-loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
