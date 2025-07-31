<template>
  <div class="contact-page">
    <div class="hero">
      <div class="hero-content">
        <h1 class="fade-in" :class="{ visible: animationsVisible }">
          {{ currentLanguage === 'en' ? 'Contact Us' : '联系我们' }}
        </h1>
        <p class="fade-in" :class="{ visible: animationsVisible }">
          {{ currentLanguage === 'en' ? 'Get in touch with our team for inquiries and support' : '与我们的团队联系，获取咨询和支持' }}
        </p>
      </div>
    </div>

    <main class="contact-main">
      <div class="contact-container">
        <div class="contact-info fade-in" :class="{ visible: animationsVisible }">
          <h2>{{ currentLanguage === 'en' ? 'Get In Touch' : '保持联系' }}</h2>
          <div class="info-item">
            <div class="info-icon">📍</div>
            <div class="info-content">
              <h3>{{ currentLanguage === 'en' ? 'Address' : '地址' }}</h3>
              <p>{{ currentLanguage === 'en' ? '222 Zhujiang Rd. Xunwu District, Nanjing, Jiangsu, China' : '中国江苏省南京市玄武区珠江路222号' }}</p>
            </div>
          </div>
          
          <div class="info-item">
            <div class="info-icon">📧</div>
            <div class="info-content">
              <h3>{{ currentLanguage === 'en' ? 'Email' : '邮箱' }}</h3>
              <p>info@anchenjossie.com<br></p>
            </div>
          </div>
          
          <div class="info-item">
            <div class="info-icon">📞</div>
            <div class="info-content">
              <h3>Phone</h3>
              <p>{{ currentLanguage === 'en' ? '+86 187 0527 4858\nMr. Liu' : '+86 187 0527 4858\n刘先生' }}</p>
            </div>
          </div>
          
          <div class="info-item">
            <div class="info-icon">🌐</div>
            <div class="info-content">
              <h3>Website</h3>
              <p>www.anchenjossie.com</p>
            </div>
          </div>
        </div>

        <div class="contact-form fade-in" :class="{ visible: animationsVisible }">
          <h2>Send us a Message</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Name *</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required
                :class="{ error: errors.name }"
              >
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required
                :class="{ error: errors.email }"
              >
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
            
            <div class="form-group">
              <label for="company">Company</label>
              <input 
                type="text" 
                id="company" 
                v-model="form.company"
              >
            </div>
            
            <div class="form-group">
              <label for="subject">Subject *</label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject" 
                required
                :class="{ error: errors.subject }"
              >
              <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
            </div>
            
            <div class="form-group">
              <label for="message">Message *</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="6" 
                required
                :class="{ error: errors.message }"
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Message</span>
            </button>
          </form>
          
          <div v-if="submitMessage" class="submit-message" :class="submitMessageType">
            {{ submitMessage }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Contact',
  setup() {
    const route = useRoute()
    const animationsVisible = ref(false)
    const isSubmitting = ref(false)
    const submitMessage = ref('')
    const submitMessageType = ref('')
    
    // Get language from route query parameter, default to 'en'
    const currentLanguage = ref(route.query.lang || (route.path.includes('/zh/') ? 'cn' : 'en'))
    
    const form = reactive({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: ''
    })
    
    const errors = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    const validateForm = () => {
      let isValid = true
      
      // Reset errors
      Object.keys(errors).forEach(key => {
        errors[key] = ''
      })
      
      if (!form.name.trim()) {
        errors.name = 'Name is required'
        isValid = false
      }
      
      if (!form.email.trim()) {
        errors.email = 'Email is required'
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Please enter a valid email'
        isValid = false
      }
      
      if (!form.subject.trim()) {
        errors.subject = 'Subject is required'
        isValid = false
      }
      
      if (!form.message.trim()) {
        errors.message = 'Message is required'
        isValid = false
      }
      
      return isValid
    }

    const submitForm = async () => {
      if (!validateForm()) {
        return
      }
      
      isSubmitting.value = true
      submitMessage.value = ''
      
      try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Reset form
        Object.keys(form).forEach(key => {
          form[key] = ''
        })
        
        submitMessage.value = 'Thank you for your message! We will get back to you soon.'
        submitMessageType.value = 'success'
      } catch (error) {
        submitMessage.value = 'Sorry, there was an error sending your message. Please try again.'
        submitMessageType.value = 'error'
      } finally {
        isSubmitting.value = false
        
        // Clear message after 5 seconds
        setTimeout(() => {
          submitMessage.value = ''
        }, 5000)
      }
    }

    onMounted(() => {
      setTimeout(() => {
        animationsVisible.value = true
      }, 300)
    })

    return {
      currentLanguage,
      animationsVisible,
      form,
      errors,
      isSubmitting,
      submitMessage,
      submitMessageType,
      submitForm
    }
  }
})
</script>

<style scoped>
.contact-page {
  flex: 1;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
}

.hero-content h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.hero-content p {
  font-size: 1.5em;
  opacity: 0.9;
}

.contact-main {
  padding: 60px 20px;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.contact-info h2,
.contact-form h2 {
  font-size: 2em;
  margin-bottom: 30px;
  color: #333;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
}

.info-icon {
  font-size: 2em;
  margin-right: 20px;
  margin-top: 5px;
}

.info-content h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2em;
}

.info-content p {
  margin: 0;
  color: #666;
  line-height: 1.6;
}

.contact-form {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 0.9em;
  margin-top: 5px;
  display: block;
}

.submit-btn {
  background: #667eea;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
}

.submit-btn:hover:not(:disabled) {
  background: #764ba2;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.submit-message {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.submit-message.success {
  background: #e8f5e8;
  color: #2e7d32;
  border: 1px solid #81c784;
}

.submit-message.error {
  background: #ffebee;
  color: #c62828;
  border: 1px solid #e57373;
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

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2em;
  }
  
  .hero-content p {
    font-size: 1.2em;
  }
  
  .contact-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .contact-form {
    padding: 30px 20px;
  }
}
</style>
