<template>
  <header>
    <span @click="navigateToHome" class="logo clickable-logo">
      {{ currentLanguage === 'en' ? 'Anchen Jossie Trading Co., Ltd.' : '安宸优思贸易有限公司' }}
    </span>
    <nav>
      <span v-if="$route.path === '/'" class="nav-button active-page">{{ currentLanguage === 'en' ? 'Home' : '首页' }}</span>
      <span v-else @click="navigateToHome" class="nav-button clickable-nav">{{ currentLanguage === 'en' ? 'Home' : '首页' }}</span>
      <router-link :to="getProductsLink">{{ currentLanguage === 'en' ? 'Products' : '产品' }}</router-link>
      <router-link :to="getContactLink">{{ currentLanguage === 'en' ? 'Contact' : '联系我们' }}</router-link>
    </nav>
  </header>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const currentLanguage = computed(() => {
      return route.query.lang || (route.path.includes('/zh/') ? 'cn' : 'en')
    })
    
    const getProductsLink = computed(() => {
      return currentLanguage.value === 'cn' ? '/zh/products' : '/products?lang=en'
    })
    
    const getContactLink = computed(() => {
      return currentLanguage.value === 'cn' ? '/zh/contact' : '/contact?lang=en'
    })

    const navigateToHome = () => {
      // Create fade-to-black overlay
      const overlay = document.createElement('div')
      overlay.className = 'fade-to-black-overlay'
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: black;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
        pointer-events: none;
      `
      document.body.appendChild(overlay)
      
      // Start fade to black
      setTimeout(() => {
        overlay.style.opacity = '1'
      }, 50)
      
      // Navigate to home after fade completes
      setTimeout(() => {
        router.push('/')
        // Remove overlay after navigation
        setTimeout(() => {
          overlay.style.opacity = '0'
          setTimeout(() => {
            if (document.body.contains(overlay)) {
              document.body.removeChild(overlay)
            }
          }, 800)
        }, 100)
      }, 800)
    }
    
    return {
      currentLanguage,
      getProductsLink,
      getContactLink,
      navigateToHome
    }
  }
})
</script>

<style scoped>
header {
  background-color: #000000;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.logo:hover {
  color: white;
}

nav {
  display: flex;
  gap: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  position: relative;
  z-index: 1;
  transition: color 0.4s ease;
  overflow: hidden;
}

nav .nav-button {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  position: relative;
  z-index: 1;
  transition: color 0.4s ease;
  overflow: hidden;
  display: inline-block;
}

nav .nav-button.active-page {
  background-color: #ffffff;
  color: #000000;
  cursor: default;
}

nav a::before,
.clickable-nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #ffffff;
  z-index: -1;
  transition: width 0.4s ease;
  border-radius: 5px;
}

nav a:hover::before,
nav a.router-link-active::before,
.clickable-nav:hover::before {
  width: 100%;
}

nav a:hover,
nav a.router-link-active,
.clickable-nav:hover {
  color: #000000;
}

.clickable-logo {
  cursor: pointer;
  transition: color 0.3s ease;
}

.clickable-logo:hover {
  color: #3388bb;
}

.clickable-nav {
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 5px;
  transition: color 0.4s ease;
}
</style>
