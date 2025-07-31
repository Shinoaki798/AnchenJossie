<template>
  <div class="home" :class="{ 'background-faded': backgroundFaded, 'transforming': backgroundFaded, 'about-mode': aboutModeActivated, 'external-navigating': isExternalNavigating }">
    <!-- Transitional Header -->
    <header v-if="showHeader" class="transition-header">
      <div class="logo">{{ currentLanguage === 'en' ? 'Anchen Jossie Trading Co., Ltd.' : '安宸优思贸易有限公司' }}</div>
      <nav>
        <span class="nav-button active-page">{{ currentLanguage === 'en' ? 'Home' : '首页' }}</span>
        <a href="#" @click.prevent="navigateToExternalPage('/products')" class="nav-link">{{ currentLanguage === 'en' ? 'Products' : '产品' }}</a>
        <a href="#" @click.prevent="navigateToExternalPage('/contact')" class="nav-link">{{ currentLanguage === 'en' ? 'Contact' : '联系我们' }}</a>
      </nav>
    </header>

    <!-- Page Transition Overlay-->
    <div v-if="showTransition" class="page-transition" :class="{ 'fade-out': transitionFaded }">
      <div class="spinner"></div>
      <div class="loading-text">
        In certain areas, this could take up to one minute.<br>
        Please wait a moment...
      </div>
    </div>

    <!-- Home Content -->
    <section v-if="!showAboutContent" class="language-selection" :class="{ 'content-fading': backgroundFaded }">
      <div class="content">
        <h1 class="fade-in" :class="{ visible: animationsVisible, 'fade-out-transition': backgroundFaded }">
          Welcome to Nanjing Anchen Jossie Trading Co., Ltd.
        </h1>
        <p class="fade-in" :class="{ visible: animationsVisible, 'fade-out-transition': backgroundFaded }">
          Global Supplier of High-Quality Silicone Products
        </p>
        
        <div class="language-buttons" :class="{ visible: animationsVisible, 'fade-out-transition': backgroundFaded }">
          <a href="#" @click.prevent="showAboutEn" class="lang-button fade-in" :class="{ visible: animationsVisible, 'fade-out-transition': backgroundFaded, 'disabled': isNavigating }">
            <span class="lang-code">EN</span>
            <span class="lang-name">English</span>
          </a>
          <a href="#" @click.prevent="showAboutCn" class="lang-button fade-in" :class="{ visible: animationsVisible, 'fade-out-transition': backgroundFaded, 'disabled': isNavigating }">
            <span class="lang-code">中文</span>
            <span class="lang-name">Chinese</span>
          </a>
        </div>
      </div>
    </section>

    <!-- About Content -->
    <div v-if="showAboutContent" class="about-content" :class="{ 'content-visible': aboutContentVisible }">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="slide-in-left" :class="{ visible: aboutContentVisible }">
            {{ currentLanguage === 'en' ? 'Innovating Silicone for a Sustainable Future' : '为可持续未来而创新硅胶' }}
          </h1>
          <a href="#" @click.prevent="navigateToExternalPage('/products')" class="hero-button" :class="{ 'delayed-visible': aboutContentVisible }">
            {{ currentLanguage === 'en' ? 'Explore Our Products' : '探索我们的产品' }}
          </a>
        </div>
      </section>

      <!-- Main Content -->
      <main class="about-main fade-in" :class="{ visible: aboutContentVisible }">
        <h1>{{ currentLanguage === 'en' ? 'Welcome to Anchen Jossie Trading Co., Ltd.' : '欢迎来到安宸优思贸易有限公司' }}</h1>
        <p>{{ currentLanguage === 'en' ? 
          'A proud subsidiary of Anchen Group, bridging high-quality technology and silicone materials between China and Europe through sustainable, innovative, and trusted partnerships.' :
          '作为安晨集团的骄傲子公司，我们通过可持续、创新和可信赖的合作伙伴关系，在中国和欧洲之间架设高质量技术和硅胶材料的桥梁。'
        }}</p>

        <!-- Split Section -->
        <section class="split-section scroll-fade-in">
          <div class="split-column fade-in scroll-fade-in" :class="{ visible: aboutContentVisible }">
            <img src="/images/company-info1.svg" :alt="currentLanguage === 'en' ? 'Anchen Jossie Company Logo' : '安宸优思公司标志'">
            <p>{{ currentLanguage === 'en' ? 
              'We are based in Nanjing and represent Dongjue Silicone Group across several global markets. Our mission is to bring the best silicone materials to industrial partners across the world.' :
              '我们总部位于南京，代表东爵硅胶集团在多个全球市场开展业务。我们的使命是为世界各地的工业合作伙伴带来最优质的硅胶材料。'
            }}</p>
          </div>
          <div class="split-column fade-in scroll-fade-in" :class="{ visible: aboutContentVisible }">
            <img src="/images/company-info2.jpg" :alt="currentLanguage === 'en' ? 'Dongjue Silicone Group Company Logo' : '东爵硅胶集团公司标志'">
            <p>{{ currentLanguage === 'en' ? 
              'Established in 1996, Nanjing Dongjue is one of the largest silicone rubber manufacturers in mainland China, with a registered capital of USD 63.3 million, covering an area of 342,000 square meters, with a total floor area of 84,000 square meters of office buildings, factories and large-scale warehouses.' :
              '南京东爵成立于1996年，是中国大陆最大的硅橡胶制造商之一，注册资本6330万美元，占地面积342,000平方米，办公楼、工厂和大型仓库总建筑面积84,000平方米。'
            }}</p>
          </div>
        </section>

        <!-- Extra Sections -->
        <section class="extra-section scroll-fade-in">
          <h2>{{ currentLanguage === 'en' ? 'Our Vision for a Greener Future' : '我们对绿色未来的愿景' }}</h2>
          <p>{{ currentLanguage === 'en' ? 
            'This is a text paragraph in English' :
            '这是一段中文字'
          }}</p>
          <img src="/images/green-vision.jpg" :alt="currentLanguage === 'en' ? 'Sustainability Vision' : '可持续发展愿景'">
        </section>

        <section class="extra-section scroll-fade-in">
          <h2>{{ currentLanguage === 'en' ? 'Corporate Culture & Global Collaboration' : '企业文化与全球合作' }}</h2>
          <p>{{ currentLanguage === 'en' ? 
            'This is a text paragraph in English' :
            '这是一段中文字'
          }}</p>
          <img src="/images/team-photo.jpg" :alt="currentLanguage === 'en' ? 'Company Team' : '公司团队'">
        </section>

        <section class="extra-section scroll-fade-in">
          <h2>{{ currentLanguage === 'en' ? 'Dongjue Group and Our Strategic Collaboration' : '东爵集团与我们的战略合作' }}</h2>
          <p>{{ currentLanguage === 'en' ? 
            'This is a text paragraph in English' :
            '这是一段中文字'
          }}</p>
          <img src="/images/dongjue-group.png" :alt="currentLanguage === 'en' ? 'Dongjue Group' : '东爵集团'">
        </section>
      </main>

      <!-- Footer -->
      <footer class="home-footer">
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
              <li><a href="#" @click.prevent="navigateToExternalPage('/products')">{{ currentLanguage === 'en' ? 'Products' : '产品' }}</a></li>
              <li><a href="#" @click.prevent="navigateToExternalPage('/contact')">{{ currentLanguage === 'en' ? 'Contact Us' : '联系我们' }}</a></li>
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
          <p>&copy; {{ new Date().getFullYear() }} {{ currentLanguage === 'en' ? 'Anchen Jossie Trading Co., Ltd. All rights reserved.' : '安宸优思贸易有限公司 版权所有。' }}</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  metaInfo: {
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { name: 'language', content: 'English' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'description', content: 'Anchen Jossie Trading Co., Ltd. - Global Supplier of High-Quality Silicone Products' },
      { property: 'og:description', content: 'Anchen Jossie Trading Co., Ltd. - Global Supplier of High-Quality Silicone Products' }
    ]
  },
  setup() {
    const router = useRouter()
    const showTransition = ref(true)
    const transitionFaded = ref(false)
    const animationsVisible = ref(false)
    const backgroundFaded = ref(false)
    const isNavigating = ref(false)
    const showHeader = ref(false)
    const showAboutContent = ref(false)
    const aboutContentVisible = ref(false)
    const aboutModeActivated = ref(false)
    const currentLanguage = ref('en')
    const isExternalNavigating = ref(false)

    // Scroll animations
    const observedElements = ref(new Set())

    const setupScrollAnimations = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible')
            observedElements.value.add(entry.target)
            observer.unobserve(entry.target)
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })

      // Observe elements after about content is shown
      setTimeout(() => {
        const elementsToObserve = document.querySelectorAll('.scroll-fade-in')
        elementsToObserve.forEach(el => observer.observe(el))
      }, 2000)
    }

    // Preload background image
    const preloadImage = () => {
      const img = new Image()
      img.src = '../images/your-hero-image.jpg'
    }

    const hideTransition = () => {
      setTimeout(() => {
        transitionFaded.value = true
      }, 200) // Short delay to let spinner be visible
      
      setTimeout(() => {
        showTransition.value = false
        animationsVisible.value = true
      }, 1000) // Wait for fade-out to complete (800ms transition + 200ms buffer)
    }

    const fadeBackgroundAndShowAbout = (language) => {
      if (isNavigating.value) return // Prevent multiple clicks
      
      isNavigating.value = true
      backgroundFaded.value = true
      currentLanguage.value = language
      
      // Show header after content starts fading
      setTimeout(() => {
        showHeader.value = true
        // Smooth scroll to top after the fade transition begins and header appears
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 300)
      }, 600)
      
      // Show about content after transition completes
      setTimeout(() => {
        showAboutContent.value = true
        aboutModeActivated.value = true
        // Trigger about content animations
        setTimeout(() => {
          aboutContentVisible.value = true
          // Setup scroll animations after content is visible
          setupScrollAnimations()
        }, 100)
      }, 1800)
    }

    const showAboutEn = () => {
      fadeBackgroundAndShowAbout('en')
    }

    const showAboutCn = () => {
      fadeBackgroundAndShowAbout('cn')
    }

    const backToHome = () => {
      // Reset all states to go back to home
      aboutContentVisible.value = false
      setTimeout(() => {
        showAboutContent.value = false
        aboutModeActivated.value = false
        showHeader.value = false
        backgroundFaded.value = false
        isNavigating.value = false
      }, 600)
    }

    const navigateToExternalPage = (routePath) => {
      isExternalNavigating.value = true
      // Don't scroll, just fade out in place
      setTimeout(() => {
        // Use language-specific routes
        let finalRoute = routePath
        if (currentLanguage.value === 'cn') {
          if (routePath === '/products') {
            finalRoute = '/zh/products'
          } else if (routePath === '/contact') {
            finalRoute = '/zh/contact'
          }
        } else {
          // For English, add lang parameter
          finalRoute = `${routePath}?lang=en`
        }
        router.push(finalRoute)
      }, 1000) // Give time for fade-out animation
    }

    const handleWindowLoad = () => {
      hideTransition()
    }

    onMounted(() => {
      preloadImage() // Preload the background image
      // Wait until everything is fully loaded, then hide transition
      if (document.readyState === 'complete') {
        handleWindowLoad()
      } else {
        window.addEventListener('load', handleWindowLoad)
      }
    })

    onUnmounted(() => {
      window.removeEventListener('load', handleWindowLoad)
    })

    return {
      showTransition,
      transitionFaded,
      animationsVisible,
      backgroundFaded,
      isNavigating,
      showHeader,
      showAboutContent,
      aboutContentVisible,
      aboutModeActivated,
      currentLanguage,
      showAboutEn,
      showAboutCn,
      backToHome,
      setupScrollAnimations,
      isExternalNavigating,
      navigateToExternalPage
    }
  }
})
</script>
<style>
html {
  overflow-y: scroll;
}
</style>

<style scoped>
.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('../images/your-hero-image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  position: relative;
  transition: height 1.2s ease, align-items 1.2s ease, padding-top 1.2s ease, opacity 1s ease;
}

/* External navigation fade out - exclude header */
.home.external-navigating .language-selection,
.home.external-navigating .about-content {
  opacity: 0;
  transition: opacity 1s ease;
}

/* Keep header visible during external navigation */
.home.external-navigating .transition-header {
  opacity: 1;
}

/* Hide main app header during external navigation */
.home.external-navigating {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
}

/* About mode - full page layout */
.home.about-mode {
  height: auto;
  min-height: 100vh;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;
  position: relative;
  background-attachment: scroll;
}

/* Transform to About page dimensions */
.home.transforming {
  height: 60vh;
  min-height: 100vh; /* Maintain full viewport height to prevent footer flash */
  align-items: flex-start;
  background-position: center; /* Keep background centered */
  background-attachment: fixed; /* Keep background stable during transformation */
  padding-top: 80px; /* Account for header height */
  overflow-y: auto; /* Allow scrolling when content is longer */
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.5) 0%, rgba(118, 75, 162, 0.5) 100%);
  transition: opacity 1.2s ease;
  z-index: 0;
  pointer-events: none;
}

.home.background-faded::before {
  opacity: 0;
}

/* Add dark overlay like About page during transformation */
.home::after {
  content: '';
  position: fixed; /* Changed from absolute to fixed */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
  opacity: 0;
  transition: opacity 1.2s ease 0.6s; /* Start fading in after gradient begins fading */
  pointer-events: none;
}

.home.transforming::after {
  opacity: 1;
}

/* Content fade-out effects */
.fade-out-transition {
  opacity: 0 !important;
  transform: translateY(0) !important; /* Keep elements in place during fade */
  transition: opacity 1.2s ease !important;
}

.content-fading {
  transition: opacity 0.6s ease;
  transform: translateY(0) !important; /* Maintain position during fade */
}

.language-selection.content-fading {
  opacity: 0;
}

.page-transition {
  position: fixed;
  top: 0;
  left: 0;
  background: black;
  opacity: 1;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  transition: opacity 0.6s ease-out;
}

.page-transition.fade-out {
  opacity: 0;
}

.page-transition .spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  margin: -30px 0 0 -30px;
  border: 6px solid white;
  border-top: 6px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.page-transition .loading-text {
  position: absolute;
  top: calc(50% + 50px);
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 1em;
  text-align: center;
  max-width: 80%;
  opacity: 0.8;
}

.language-selection {
  text-align: center;
  color: white;
  padding: 40px 20px;
  position: relative;
  z-index: 10;
  transition: transform 0.6s ease; /* Smooth transition for layout changes */
}

.content h1 {
  font-size: 3em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.content p {
  font-size: 1.5em;
  margin-bottom: 40px;
  opacity: 0.9;
}

.language-buttons {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.lang-button {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 30px 40px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-width: 150px;
}

.lang-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-5px);
  cursor: pointer;
}

.lang-button:active {
  transform: translateY(-2px) scale(0.98);
  transition: transform 0.1s ease;
}

.lang-button.disabled {
  pointer-events: none;
  opacity: 0.6;
}

.lang-code {
  display: block;
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 10px;
}

.lang-name {
  display: block;
  font-size: 1.2em;
  opacity: 1;
}

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  /* let it stop for 1s and the play */
  transition: opacity 2.5s ease, transform 2.5s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Transitional Header */
.transition-header {
  background-color: #000000;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  opacity: 0;
  transform: translateY(-100%);
  animation: slideDownHeader 0.8s ease-out 0.2s forwards;
}

@keyframes slideDownHeader {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.transition-header .logo {
  font-size: 1.5em;
  font-weight: bold;
}

.transition-header nav {
  display: flex;
  gap: 20px;
}

.transition-header nav a {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  position: relative;
  z-index: 1;
  transition: color 0.4s ease;
  overflow: hidden;
}

.transition-header nav .nav-button {
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

.transition-header nav .nav-button.active-page {
  background-color: #ffffff;
  color: #000000;
  cursor: default;
}

.transition-header nav .nav-link {
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

.transition-header nav .nav-link::before {
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

.transition-header nav .nav-link:hover::before {
  width: 100%;
}

.transition-header nav .nav-link:hover {
  color: #000000;
}

.transition-header nav a::before {
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

.transition-header nav a:hover::before,
.transition-header nav a.router-link-active::before {
  width: 100%;
}

.transition-header nav a:hover,
.transition-header nav a.router-link-active {
  color: #000000;
}

/* About Content Styles */
.about-content {
  width: 100%;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.5s ease, transform 1.5s ease;
  position: relative;
  z-index: 5;
}

.about-content.content-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-section {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  position: relative;
  padding-top: 80px;
  margin-top: 0;
  z-index: 5;
}

.hero-content {
  position: relative;
  z-index: 2;
  margin-left: 5%;
  max-width: 700px;
}

.hero-section h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 1.8s ease, transform 1.8s ease;
}

.hero-section h1.visible {
  opacity: 1;
  transform: translateX(0);
}

.hero-button {
  background-color: #ffffff;
  color: #000000;
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  font-size: 1em;
  text-decoration: none;
  display: inline-block;
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 2s ease, transform 2s ease, background-color 0.3s, color 0.3s;
}

.hero-button.delayed-visible {
  opacity: 1;
  transform: translateX(0);
}

.hero-button:hover {
  background-color: #3388bb;
  color: white;
}

.about-main {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 30px 40px;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0;
  margin-top: -50px;
  position: relative;
  z-index: 2;
}

.about-main h1 {
  color: #333;
  margin-bottom: 20px;
}

.about-main > p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 25px;
}

.split-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
  margin: 25px 0;
  padding: 0;
}

.split-column {
  flex: 1 1 45%;
  font-size: 1.1em;
  line-height: 1.6;
}

.split-column img {
  max-width: 150px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.split-column p {
  color: #555;
}

.extra-section {
  margin: 25px 0;
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.extra-section:first-of-type {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 25px;
}

.extra-section img {
  max-width: 100%;
  border-radius: 12px;
  margin-top: 15px;
}

.extra-section h2 {
  color: #333;
  margin-bottom: 15px;
}

.extra-section p {
  color: #666;
  line-height: 1.6;
}

/* Scroll-triggered animations */
.scroll-fade-in {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.scroll-fade-in.scroll-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animation delays for child elements */
.split-column.scroll-fade-in:nth-child(1) {
  transition-delay: 0.1s;
}

.split-column.scroll-fade-in:nth-child(2) {
  transition-delay: 0.3s;
}

/* Target the three extra sections specifically */
.extra-section.scroll-fade-in:nth-of-type(1) {
  transition-delay: 0.2s;
}

.extra-section.scroll-fade-in:nth-of-type(2) {
  transition-delay: 0.4s;
}

.extra-section.scroll-fade-in:nth-of-type(3) {
  transition-delay: 0.6s;
}

@media (max-width: 768px) {
  .content h1 {
    font-size: 2em;
  }
  
  .content p {
    font-size: 1.2em;
  }
  
  .language-buttons {
    gap: 20px;
  }
  
  .lang-button {
    padding: 20px 30px;
    min-width: 120px;
  }
  
  .hero-section h1 {
    font-size: 2em;
  }
  
  .about-main {
    width: 100%;
    padding: 20px 30px;
  }
  
  .split-section {
    flex-direction: column;
  }
  
  .split-column {
    flex: 1 1 100%;
  }
  
  .hero-content {
    margin-left: 20px;
  }
}

/* Footer Styles */
.home-footer {
  background-color: #000000;
  color: white;
  padding: 40px 0 20px 0;
  margin-top: 0;
  width: 100%;
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
