<template>
  <div class="products-page">
    <div class="main-content">
      <div class="color-masterbatch-section fade-in" :class="{ visible: animationsVisible }">
        <div class="color-column" :class="{ 'show-delayed': sideBoxesVisible }">
          <a href="./color_masterbatch/" class="color-link" target="_blank">
            <h3>{{ currentLanguage === 'en' ? 'Color Masterbatch' : '色母粒' }}</h3>
            <p>{{ currentLanguage === 'en' ? 'Explore our custom pigmentation and masterbatch solutions.' : '探索我们的定制颜料和色母粒解决方案。' }}</p>
          </a>
        </div>

        <div class="selector-container">
          <h2>{{ currentLanguage === 'en' ? 'Find Your Silicone Product' : '找到您的硅胶产品' }}</h2>
          <select 
            v-model="selectedCategory" 
            class="show"
            @change="onCategoryChange"
          >
            <option value="">{{ currentLanguage === 'en' ? 'Select Main Category' : '选择主要类别' }}</option>
            <option value="SiliGum">{{ currentLanguage === 'en' ? 'Silicone Gum' : '硅橡胶生胶' }}</option>
            <option value="SiliRub">{{ currentLanguage === 'en' ? 'Silicone Rubber' : '混炼胶' }}</option>
            <option value="FumRub">{{ currentLanguage === 'en' ? 'Fumed Rubber' : '气相硅橡胶' }}</option>
            <option value="SpeRub">{{ currentLanguage === 'en' ? 'Special Rubber' : '特种硅橡胶' }}</option>
          </select>

          <select 
            v-model="selectedSubcategory"
            :class="{ show: showSubcategory }"
            :disabled="!showSubcategory"
            @change="onSubcategoryChange"
          >
            <option value="">{{ currentLanguage === 'en' ? 'Select Subcategory' : '选择子类别' }}</option>
            <option 
              v-for="subcategory in subcategories" 
              :key="subcategory" 
              :value="subcategory"
            >
              {{ getTranslatedSubcategory(subcategory) }}
            </option>
          </select>

          <select 
            v-model="selectedApplication"
            :class="{ show: showApplication }"
            :disabled="!showApplication"
            @change="onApplicationChange"
          >
            <option value="">{{ currentLanguage === 'en' ? 'Select Application' : '选择应用' }}</option>
            <option 
              v-for="application in applications" 
              :key="application" 
              :value="application"
            >
              {{ getTranslatedApplication(application) }}
            </option>
          </select>

          <button 
            id="goButton" 
            :class="{ show: showGoButton }"
            @click="goToProduct"
          >
            {{ currentLanguage === 'en' ? 'Click to Find Your Product!' : '点击找到您的产品！' }}
          </button>
        </div>

        <div class="color-column" :class="{ 'show-delayed': sideBoxesVisible }">
          <a href="./interactive_product_list/" class="color-link" target="_blank">
            <h3>{{ currentLanguage === 'en' ? 'Interactive Product List' : '交互式产品列表' }}</h3>
            <p>{{ currentLanguage === 'en' ? 'Browse our silicone products with an interactive experience.' : '通过交互式体验浏览我们的硅胶产品。' }}</p>
          </a>
        </div>
      </div>

      <!-- Featured Products Section -->
      <div class="featured-products-section fade-in" :class="{ visible: featuredBoxesVisible }">
        <h2 class="featured-title">{{ currentLanguage === 'en' ? 'Featured Products' : '特色产品' }}</h2>
        <div class="featured-products-grid">
          <div class="featured-product-card" :class="{ 'show-delayed': sideBoxesVisible }" @click="goToFeaturedProduct('flame-retardant')">
            <img src="/images/products/en/SpeRub-Silicone_Rubber-Flame_Retardant/flameretardantSilicone1.png" alt="Flame Retardant Silicone" class="product-image">
            <h3>{{ currentLanguage === 'en' ? 'Flame Retardant Silicone' : '阻燃胶' }}</h3>
            <p>{{ currentLanguage === 'en' ? 'High-performance flame retardant silicone rubber for safety-critical applications.' : '用于安全关键应用的高性能阻燃硅橡胶。' }}</p>
            <div class="product-tag">{{ currentLanguage === 'en' ? 'RoHS compliant' : '符合RoHS标准' }}</div>
          </div>
          
          <div class="featured-product-card" :class="{ 'show-delayed': sideBoxesVisible }" @click="goToFeaturedProduct('electrical-insulating')">
            <img src="/images/products/en/SpeRub-Electrical_Insulating/electricalSilicone1.png" alt="Electrical Insulating Silicone" class="product-image">
            <h3>{{ currentLanguage === 'en' ? 'Electrical Insulating Silicone' : '绝缘胶' }}</h3>
            <p>{{ currentLanguage === 'en' ? 'Superior electrical insulation properties for power and electronics applications.' : '优异的电绝缘性能，适用于电力和电子应用。' }}</p>
            <div class="product-tag">{{ currentLanguage === 'en' ? 'Tracking resistance level 1A4.5' : '耐漏电起痕1A4.5级' }}</div>
          </div>
          
          <div class="featured-product-card" :class="{ 'show-delayed': sideBoxesVisible }" @click="goToFeaturedProduct('food-grade')">
            <img src="/images/products/en/SpeRub-Silicone_Rubber-Food_Contact_Molding/foodContactSiliconeRubberForMolding1.png" alt="Food Grade Silicone" class="product-image">
            <h3>{{ currentLanguage === 'en' ? 'Food Grade Silicone' : '食品级胶' }}</h3>
            <p>{{ currentLanguage === 'en' ? 'FDA approved food-safe silicone rubber for kitchen and food contact applications.' : 'FDA认证的食品安全硅橡胶，适用于厨房和食品接触应用。' }}</p>
            <div class="product-tag">{{ currentLanguage === 'en' ? 'FDA Approved' : 'FDA认证' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Products',
  metaInfo: {
    title: 'Product Selector - Anchen Jossie',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { name: 'description', content: 'Find your perfect silicone product with our interactive product selector.' }
    ]
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const animationsVisible = ref(false)
    const sideBoxesVisible = ref(false)
    const featuredBoxesVisible = ref(false)
    
    // Get language from route query parameter, default to 'en'
    const currentLanguage = ref(route.query.lang || 'en')
    
    const selectedCategory = ref('')
    const selectedSubcategory = ref('')
    const selectedApplication = ref('')

    // Translation mappings
    const subcategoryTranslations = {
      // SiliGum subcategories
      "101 methyl": { en: "101 methyl", cn: "101甲基" },
      "Methyl Vinyl": { en: "Methyl Vinyl", cn: "甲基乙烯基" },
      "101B Hydroxyl": { en: "101B Hydroxyl", cn: "101B羟基" },
      
      // SiliRub subcategories
      "Translucent": { en: "Translucent", cn: "半透明" },
      "Subtranslucent": { en: "Subtranslucent", cn: "亚透明" },
      "Common": { en: "Common", cn: "普通" },
      "Economic": { en: "Economic", cn: "经济型" },
      
      // FumRub subcategories
      "Standard": { en: "Standard", cn: "标准" },
      "General Purpose": { en: "General Purpose", cn: "通用" },
      
      // SpeRub subcategories
      "Silicone Rubber": { en: "Silicone Rubber", cn: "硅橡胶" },
      "Fumed Silicone Rubber": { en: "Fumed Silicone Rubber", cn: "气相硅橡胶" },
      "Electrical Insulating": { en: "Electrical Insulating", cn: "电绝缘" }
    }

    const applicationTranslations = {
      "Molding": { en: "Molding", cn: "模压" },
      "Extrusion": { en: "Extrusion", cn: "挤出" },
      "Cable Accessories": { en: "Cable Accessories", cn: "电缆配件" },
      "High Rebound": { en: "High Rebound", cn: "高回弹" },
      "High Strength Molding": { en: "High Strength Molding", cn: "高强度模压" },
      "Food Contact Molding": { en: "Food Contact Molding", cn: "食品接触模压" },
      "Ultra Low Hardness Molding": { en: "Ultra Low Hardness Molding", cn: "超低硬度模压" },
      "Addition-curing": { en: "Addition-curing", cn: "加成固化" },
      "High Temperature Resistant": { en: "High Temperature Resistant", cn: "耐高温" },
      "Self-lubricating": { en: "Self-lubricating", cn: "自润滑" },
      "Anti-static": { en: "Anti-static", cn: "抗静电" },
      "Flame Retardant": { en: "Flame Retardant", cn: "阻燃" },
      "Ceramic": { en: "Ceramic", cn: "陶瓷" },
      "Economic High tear Strength": { en: "Economic High tear Strength", cn: "经济型高撕裂强度" },
      "Standard High tear Strength": { en: "Standard High tear Strength", cn: "标准高撕裂强度" },
      "High Transparency": { en: "High Transparency", cn: "高透明度" }
    }

    const data = {
      SiliGum: {
        "101 methyl": null,
        "Methyl Vinyl": null,
        "101B Hydroxyl": null
      },
      SiliRub: {
        Translucent: ['Molding', 'Extrusion'],
        Subtranslucent: ['Molding', 'Extrusion'],
        Common: ['Molding', 'Extrusion'],
        Economic: ['Molding', 'Extrusion']
      },
      FumRub: {
        Standard: ['Molding', 'Extrusion'],
        Economic: ['Molding', 'Extrusion'],
        "General Purpose": null
      },
      SpeRub: {
        "Silicone Rubber": ['Cable Accessories', 'High Rebound', 'High Strength Molding', 'Food Contact Molding', 'Ultra Low Hardness Molding', 'Addition-curing', 'High Temperature Resistant', 'Self-lubricating', 'Anti-static', 'Flame Retardant', 'Ceramic'],
        "Fumed Silicone Rubber": ['Economic High tear Strength', 'Standard High tear Strength', 'High Transparency'],
        "Electrical Insulating": null
      }
    }

    const goToProduct = () => {
      if (selectedCategory.value && selectedSubcategory.value) {
        let slug = `${selectedCategory.value}-${selectedSubcategory.value.replace(/\s/g, '_')}`
        if (selectedApplication.value) {
          slug += `-${selectedApplication.value.replace(/\s/g, '_')}`
        }
        
        const formattedSlug = slug.replace(/\s+/g, '_')
        
        const path = currentLanguage.value === 'cn' ? `/zh/products/${formattedSlug}` : `/products/${formattedSlug}`
        router.push(path)
      }
    }

    const goToFeaturedProduct = (product) => {
      let slug = ''
      if (product === 'flame-retardant') {
        slug = 'SpeRub-Silicone_Rubber-Flame_Retardant'
      } else if (product === 'electrical-insulating') {
        slug = 'SpeRub-Electrical_Insulating'
      } else if (product === 'food-grade') {
        slug = 'SpeRub-Silicone_Rubber-Food_Contact_Molding'
      }
      
      if (slug) {
        const path = currentLanguage.value === 'cn' ? `/zh/products/${slug}` : `/products/${slug}`
        router.push(path)
      }
    }

    const noThirdDropdownNeeded = [
      "101 methyl",
      "Methyl Vinyl", 
      "101B Hydroxyl",
      "Electrical Insulating",
      "General Purpose"
    ]

    const getTranslatedSubcategory = (subcategory) => {
      const translation = subcategoryTranslations[subcategory]
      return translation ? translation[currentLanguage.value] : subcategory
    }

    const getTranslatedApplication = (application) => {
      const translation = applicationTranslations[application]
      return translation ? translation[currentLanguage.value] : application
    }

    const subcategories = computed(() => {
      if (selectedCategory.value && data[selectedCategory.value]) {
        return Object.keys(data[selectedCategory.value])
      }
      return []
    })

    const applications = computed(() => {
      if (selectedCategory.value && selectedSubcategory.value && 
          data[selectedCategory.value][selectedSubcategory.value]) {
        return data[selectedCategory.value][selectedSubcategory.value]
      }
      return []
    })

    const showSubcategory = computed(() => {
      return selectedCategory.value && subcategories.value.length > 0
    })

    const showApplication = computed(() => {
      return selectedSubcategory.value && 
             applications.value && 
             applications.value.length > 0
    })

    const showGoButton = computed(() => {
      if (selectedSubcategory.value && noThirdDropdownNeeded.includes(selectedSubcategory.value)) {
        return true
      }
      return selectedApplication.value && applications.value
    })

    const onCategoryChange = () => {
      selectedSubcategory.value = ''
      selectedApplication.value = ''
    }

    const onSubcategoryChange = () => {
      selectedApplication.value = ''
    }

    const onApplicationChange = () => {
      // Application changed, no additional logic needed
    }

    onMounted(() => {
      animationsVisible.value = true
      // Add delayed animation for side boxes
      setTimeout(() => {
        sideBoxesVisible.value = true
      }, 800)
      // Add delayed animation for featured boxes
      setTimeout(() => {
        featuredBoxesVisible.value = true
      }, 800)
    })

    return {
      currentLanguage,
      animationsVisible,
      sideBoxesVisible,
      featuredBoxesVisible,
      selectedCategory,
      selectedSubcategory,
      selectedApplication,
      subcategories,
      applications,
      showSubcategory,
      showApplication,
      showGoButton,
      onCategoryChange,
      onSubcategoryChange,
      onApplicationChange,
      goToProduct,
      goToFeaturedProduct,
      getTranslatedSubcategory,
      getTranslatedApplication,
      currentLanguage
    }
  }
})
</script>

<style scoped>
html,
body {
  overscroll-behavior: none;
  scroll-behavior: smooth;
}

.products-page {
  margin: 0;
  padding: 0;
  font-family: "System UI", "Playfair Display", serif;
  background-color: #f9f9f9;
  color: #333;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 100vw;
}

* {
  box-sizing: border-box;
  max-width: 100%;
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

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px 20px;
}

.color-masterbatch-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  width: 100%;
  max-width: 1400px;
  margin-bottom: 40px;
}

.color-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f47f;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.28);
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.2s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.color-column:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.color-column.show-delayed {
  opacity: 1;
  transform: translateY(0);
}

.color-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.color-column h3 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #000000;
}

.color-column p {
  font-size: 1em;
  color: #555;
}

.selector-container {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 400px;
}

.selector-container h2 {
  font-size: 1.8em;
  margin-bottom: 25px;
  color: #333;
}

select,
button {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

select.show,
button.show {
  opacity: 1;
  transform: translateY(0);
}

select:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

#goButton {
  background-color: #007c00;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, opacity 0.8s ease, transform 0.8s ease;
}

#goButton:hover {
  background-color: #005a00;
}

.featured-products-section {
  width: 100%;
  max-width: 1400px;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.featured-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 30px;
  color: #333;
}

.featured-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.featured-product-card {
  background-color: #f9f9f9;
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.featured-product-card.show-delayed {
  opacity: 1;
  transform: translateY(0);
}

.featured-product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.product-icon {
  font-size: 2.5em;
  margin-bottom: 15px;
}

.featured-product-card h3 {
  font-size: 1.4em;
  margin-bottom: 10px;
  color: #000000;
}

.featured-product-card p {
  font-size: 1em;
  color: #555;
  margin-bottom: 15px;
}

.product-tag {
  display: inline-block;
  padding: 5px 10px;
  background-color: #e0f2e0;
  color: #005a00;
  border-radius: 15px;
  font-size: 0.9em;
  font-weight: bold;
}
</style>
