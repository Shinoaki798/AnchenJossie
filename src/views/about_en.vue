<template>

  <div class="about-page">
    <!-- Page Transition Overlay -->

    <section class="hero">
      <div class="hero-content">
        <h1 class="slide-in-left" :class="{ visible: animationsVisible }">
          Innovating Silicone for a Sustainable Future
        </h1>
        <router-link 
          to="/products" 
          class="hero-button" 
          :class="{ 'delayed-visible': heroButtonVisible }"
        >
          Explore Our Products
        </router-link>
      </div>
    </section>

    <main class="fade-in" :class="{ visible: animationsVisible }">
      <h1>Welcome to Anchen Jossie Trading Co., Ltd.</h1>
      <p>A proud subsidiary of Anchen Group, bridging high-quality technology and silicone materials between China and
        Europe through sustainable, innovative, and trusted partnerships.</p>
    </main>

    <section class="split-section">
      <div class="split-column fade-in" :class="{ visible: animationsVisible }">
        <img src="/images/company-info1.svg" alt="Anchen Jossie Company Logo">
        <p>We are based in Nanjing and represent Dongjue Silicone Group across several global markets. Our mission is to
          bring the best silicone materials to industrial partners across the world.</p>
      </div>
      <div class="split-column fade-in" :class="{ visible: animationsVisible }">
        <img src="/images/company-info2.jpg" alt="Dongjue Silicone Group Company Logo">
        <p>Established in 1996, Nanjing Dongjue is one of the largest silicone rubber manufacturers in mainland China,
          with a registered capital of USD 63.3 million, covering an area of 342,000 square meters, with a total floor
          area of 84,000 square meters of office buildings, factories and large-scale warehouses.</p>
      </div>
    </section>

    <section class="extra-section fade-in" :class="{ visible: animationsVisible }">
      <h2>Our Vision for a Greener Future</h2>
      <p>We believe that sustainable development is the cornerstone of innovation. Our team is dedicated to creating
        environmentally responsible silicone materials that push the boundaries of performance and safety.</p>
      <img src="/images/green-vision.jpg" alt="Sustainability Vision">
    </section>

    <section class="extra-section fade-in" :class="{ visible: animationsVisible }">
      <h2>Corporate Culture & Global Collaboration</h2>
      <p>Our employees are the backbone of our company. We foster a culture of learning and collaboration across borders
        and disciplines to deliver the best to our partners worldwide.</p>
      <img src="/images/team-photo.jpg" alt="Company Team">
    </section>

    <section class="extra-section fade-in" :class="{ visible: animationsVisible }">
      <h2>Dongjue Group and Our Strategic Collaboration</h2>
      <p>Dongjue Silicone Group is a globally recognized leader in silicone innovation with manufacturing and R&D centers
        in Asia and Europe. As their exclusive trading representative, Anchen Jossie Trading Co., Ltd. facilitates the
        distribution and communication of Dongjue's technologies, ensuring that clients across continents receive
        cutting-edge materials with excellent support and tailored service. Together, we champion sustainable development
        and performance excellence in the silicone industry.</p>
      <img src="/images/dongjue-group.png" alt="Dongjue Group">
    </section>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, nextTick } from 'vue'

export default defineComponent({
  name: 'About',
  setup() {
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
