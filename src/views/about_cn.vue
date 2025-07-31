<template>
  <div class="about-page" lang="zh-CN">
    <!-- Page Transition Overlay -->

    <section class="hero">
      <div class="hero-content">
        <h1 class="slide-in-left" :class="{ visible: animationsVisible }">
          为可持续未来而创新硅胶
        </h1>
        <router-link 
          to="/products" 
          class="hero-button" 
          :class="{ 'delayed-visible': heroButtonVisible }"
        >
          探索我们的产品
        </router-link>
      </div>
    </section>

    <main class="fade-in" :class="{ visible: animationsVisible }">
      <h1>欢迎来到安宸优思贸易有限公司</h1>
      <p>作为安宸集团的骄傲子公司，我们通过可持续、创新和可信赖的合作伙伴关系，在中国和欧洲之间架设高质量技术和硅胶材料的桥梁。</p>
    </main>

    <section class="split-section">
      <div class="split-column fade-in" :class="{ visible: animationsVisible }">
        <img src="/images/company-info1.svg" alt="安晨久和公司标志">
        <p>我们总部位于南京，代表东爵硅胶集团在多个全球市场开展业务。我们的使命是为世界各地的工业合作伙伴带来最优质的硅胶材料。</p>
      </div>
      <div class="split-column fade-in" :class="{ visible: animationsVisible }">
        <img src="/images/company-info2.jpg" alt="东爵硅胶集团公司标志">
        <p>南京东爵成立于1996年，是中国大陆最大的硅橡胶制造商之一，注册资本6330万美元，占地面积342,000平方米，办公楼、工厂和大型仓库总建筑面积84,000平方米。</p>
      </div>
    </section>

    <section class="extra-section fade-in" :class="{ visible: animationsVisible }">
      <h2>我们对绿色未来的愿景</h2>
      <p>我们相信可持续发展是创新的基石。我们的团队致力于创造环保的硅胶材料，突破性能和安全的界限。</p>
      <img src="/images/green-vision.jpg" alt="可持续发展愿景">
    </section>

    <section class="extra-section fade-in" :class="{ visible: animationsVisible }">
      <h2>企业文化与全球合作</h2>
      <p>我们的员工是公司的支柱。我们培养跨国界、跨学科的学习和协作文化，为全球合作伙伴提供最优质的服务。</p>
      <img src="/images/team-photo.jpg" alt="公司团队">
    </section>

    <section class="extra-section fade-in" :class="{ visible: animationsVisible }">
      <h2>东爵集团与我们的战略合作</h2>
      <p>东爵硅胶集团是全球公认的硅胶创新领导者，在亚洲和欧洲设有制造和研发中心。作为他们的独家贸易代表，安晨久和贸易有限公司促进东爵技术的分销和沟通，确保各大洲的客户获得尖端材料以及优秀的支持和量身定制的服务。我们携手在硅胶行业倡导可持续发展和卓越性能。</p>
      <img src="/images/dongjue-group.png" alt="东爵集团">
    </section>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, nextTick } from 'vue'

export default defineComponent({
  name: 'AboutCn',
  metaInfo: {
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { name: 'language', content: 'Chinese' },
      { property: 'og:locale', content: 'zh_CN' },
      { name: 'description', content: '安晨久和贸易有限公司 - 安晨集团的骄傲子公司，在中国和欧洲之间架设高质量技术和硅胶材料的桥梁。' },
      { property: 'og:description', content: '安晨久和贸易有限公司 - 安晨集团的骄傲子公司，在中国和欧洲之间架设高质量技术和硅胶材料的桥梁。' }
    ]
  },
  setup() {
    // Set document language
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'zh-CN'
    }
    
    const showTransition = ref(true)
    const transitionFaded = ref(false)
    const animationsVisible = ref(false)
    const heroButtonVisible = ref(false)

    const hideTransition = () => {
      transitionFaded.value = true
      setTimeout(() => {
        showTransition.value = false
        animationsVisible.value = true
        setTimeout(() => {
          heroButtonVisible.value = true
        }, 1800)
      }, 800)
    }

    const setupIntersectionObserver = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, 300)
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.1 })

      nextTick(() => {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left')
        elements.forEach((el) => observer.observe(el))
      })
    }

    onMounted(() => {
      setTimeout(hideTransition, 100)
      setupIntersectionObserver()
    })

    return {
      showTransition,
      transitionFaded,
      animationsVisible,
      heroButtonVisible
    }
  }
})
</script>

<style scoped>
.about-page {
  flex: 1;
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
  transition: opacity 0.8s ease;
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

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 1.8s ease, transform 1.8s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

.slide-in-left {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 1.8s ease, transform 1.8s ease;
}

.slide-in-left.visible {
  opacity: 1;
  transform: translateX(0);
}

.hero-button {
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 2s ease, transform 2s ease;
}

.hero-button.delayed-visible {
  opacity: 1;
  transform: translateX(0);
}

.hero {
  background-image: url('/images/your-hero-image.jpg');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  margin-left: 5%;
  max-width: 700px;
}

.hero h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.hero-button {
  background-color: #ffffff;
  color: #000000;
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  font-size: 1em;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  display: inline-block;
}

.hero-button:hover {
  background-color: #3388bb;
  color: white;
}

main {
  padding: 40px 20px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.split-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
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

.extra-section {
  max-width: 1000px;
  margin: 80px auto;
  padding: 0 20px;
  text-align: center;
}

.extra-section img {
  max-width: 100%;
  border-radius: 12px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2em;
  }
  
  .split-section {
    flex-direction: column;
  }
  
  .split-column {
    flex: 1 1 100%;
  }
}
</style>
