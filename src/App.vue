<template>
  <div id="app">
    <!-- Black loading overlay that starts visible and fades out -->
    <!-- <div v-if="showLoadingOverlay" class="loading-overlay" :class="{ 'fade-out': fadeOutLoading }"></div> -->
    
    <PageTransition 
      :isTransitioning="isTransitioning"
      :fromRoute="fromRoute"
      :toRoute="toRoute"
      ref="pageTransition"
    />
    <AppHeader v-if="$route.name !== 'Home'" />
    <router-view v-slot="{ Component, route }">
      <div class="router-view-wrapper">
        <transition name="fade-white" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </div>
    </router-view>
    <AppFooter v-if="!['Home', 'InteractiveProductList', 'InteractiveProductListCN'].includes($route.name) && !isTransitioning" />
  </div>
</template>

<script>
import { defineComponent, watch, ref, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const pageTransition = ref(null)
    const isTransitioning = ref(false)
    const fromRoute = ref('')
    const toRoute = ref('')
    const showLoadingOverlay = ref(false)
    const fadeOutLoading = ref(false)
    
    // Watch for route changes and update body class
    watch(() => route.name, (newRoute, oldRoute) => {
      if (newRoute === 'Home') {
        document.body.classList.add('home-page')
      } else {
        document.body.classList.remove('home-page')
      }
      
      const fromProductPages = ['Products', 'ProductsCN'];
      const toProductDetailPages = ['ProductDetail', 'ProductDetailCN'];

      // Handle page transition from Home to other pages
      if ( (oldRoute === 'Home' && newRoute !== 'Home') || (fromProductPages.includes(oldRoute) && toProductDetailPages.includes(newRoute)) ) {
        startPageTransition(oldRoute, newRoute)
      }
    }, { immediate: true })
    
    const startPageTransition = (from, to) => {
      isTransitioning.value = true
      fromRoute.value = from
      toRoute.value = to
      
      nextTick(() => {
        if (pageTransition.value) {
          pageTransition.value.startTransition()
        }
      })
      
      // End transition after animation completes
      setTimeout(() => {
        isTransitioning.value = false
        if (pageTransition.value) {
          pageTransition.value.resetTransition()
        }
      }, 2200)
    }
    
    onMounted(() => {
      // Initial class setup
      if (route.name === 'Home') {
        document.body.classList.add('home-page')
      }
    })

    return {
      isTransitioning,
      fromRoute,
      toRoute,
      pageTransition,
      showLoadingOverlay,
      fadeOutLoading
    }
  }
})
</script>

<style>
html,
body {
  overscroll-behavior: none;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Playfair Display", serif;
  color: #000000;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  max-width: 100vw;
}

body.home-page {
  overflow: hidden;
}

* {
  box-sizing: border-box;
  max-width: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Page transition styles */
.page-enter-active, .page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
}

/* Black loading overlay that starts visible at t=0 */
/* .loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 10000;
  opacity: 1;
  transition: opacity 1s ease-out;
  pointer-events: none;
}

.loading-overlay.fade-out {
  opacity: 0;
} */

/* Ensure app starts with black background */
html,
body {
  background-color: black;
  transition: background-color 0.1s ease;
}

body.loaded {
  background-color: #000000;
}

.router-view-wrapper {
  position: relative;
  flex: 1;
  background-color: white;
}

.fade-white-leave-active,
.fade-white-enter-active {
  transition: opacity 0.5s ease;
}

.fade-white-leave-to,
.fade-white-enter-from {
  opacity: 0;
}
</style>
