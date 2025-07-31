<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>{{ currentLanguage === 'en' ? 'Contact Information' : '联系信息' }}</h3>
        <p>{{ currentLanguage === 'en' ? '222 Zhujiang Rd., Nanjing, China' : '中国南京市珠江路222号' }}</p>
        <p>{{ currentLanguage === 'en' ? 'Email: info@anchenjossie.com' : '邮箱: info@anchenjossie.com' }}</p>
        <p>{{ currentLanguage === 'en' ? 'Sales: sales@anchenjossie.com' : '销售: sales@anchenjossie.com' }}</p>
      </div>
      
      <div class="footer-section">
        <h3>{{ currentLanguage === 'en' ? 'Quick Links' : '快速链接' }}</h3>
        <ul>
          <li><router-link :to="getProductsLink">{{ currentLanguage === 'en' ? 'Products' : '产品' }}</router-link></li>
          <li><router-link :to="getContactLink">{{ currentLanguage === 'en' ? 'Contact Us' : '联系我们' }}</router-link></li>
          <li><router-link to="/">{{ currentLanguage === 'en' ? 'Home' : '首页' }}</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section">
        <h3>{{ currentLanguage === 'en' ? 'About Us' : '关于我们' }}</h3>
        <p>{{ currentLanguage === 'en' ? 
          'Global Supplier of High-Quality Silicone Products. Bridging technology and materials between China and Europe.' :
          '全球优质硅胶产品供应商。在中国和欧洲之间架设技术和材料的桥梁。'
        }}</p>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} {{ currentLanguage === 'en' ? 'Anchen Jossie Trading Co., Ltd. All rights reserved.' : '安宸优思贸易有限公司 版权所有。' }}</p>
    </div>
  </footer>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'AppFooter',
  setup() {
    const route = useRoute()
    const currentYear = computed(() => new Date().getFullYear())
    
    const currentLanguage = computed(() => {
      return route.query.lang || (route.path.includes('/zh/') ? 'cn' : 'en')
    })
    
    const getProductsLink = computed(() => {
      return currentLanguage.value === 'cn' ? '/zh/products' : '/products?lang=en'
    })
    
    const getContactLink = computed(() => {
      return currentLanguage.value === 'cn' ? '/zh/contact' : '/contact?lang=en'
    })
    
    return {
      currentYear,
      currentLanguage,
      getProductsLink,
      getContactLink
    }
  }
})
</script>

<style scoped>
.app-footer {
  background-color: #000000;
  color: white;
  padding: 40px 0 20px 0;
  margin-top: 0;
  width: 100%;
  flex-shrink: 0;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  gap: 30px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
}

.footer-section h3 {
  color: #ffffff;
  margin-bottom: 15px;
  font-size: 1.2em;
  border-bottom: 2px solid #3388bb;
  padding-bottom: 5px;
  display: inline-block;
}

.footer-section p {
  margin-bottom: 8px;
  line-height: 1.6;
  color: #cccccc;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #cccccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: #3388bb;
}

.footer-bottom {
  text-align: center;
  padding: 20px 40px 0 40px;
  border-top: 1px solid #333333;
  margin-top: 20px;
}

.footer-bottom p {
  margin: 0;
  color: #888888;
  font-size: 0.9em;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    padding: 0 20px;
  }
  
  .footer-section {
    min-width: auto;
    text-align: center;
  }
  
  .footer-bottom {
    padding: 20px 20px 0 20px;
  }
}
</style>
