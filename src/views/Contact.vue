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
          <h2>{{ currentLanguage === 'en' ? 'Send us a Message' : '给我们发信息' }}</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">{{ currentLanguage === 'en' ? 'Name' : '姓名' }} *</label>
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
              <label for="email">{{ currentLanguage === 'en' ? 'Email' : '邮箱' }} *</label>
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
              <label for="company">{{ currentLanguage === 'en' ? 'Company' : '公司' }}</label>
              <input 
                type="text" 
                id="company" 
                v-model="form.company"
              >
            </div>
            
            <div class="form-group">
              <label for="message">{{ currentLanguage === 'en' ? 'Message' : '信息' }} *</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                required
                :class="{ error: errors.message }"
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? (currentLanguage === 'en' ? 'Submitting...' : '提交中...') : (currentLanguage === 'en' ? 'Submit' : '提交') }}
            </button>
            <p v-if="submitStatus" class="submit-status" :class="{ 'success': submitStatus === 'success', 'error': submitStatus === 'error' }">
              {{ submitMessage }}
            </p>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        company: '',
        message: ''
      },
      errors: {},
      animationsVisible: false,
      isSubmitting: false,
      submitStatus: null, // null, 'success', or 'error'
      submitMessage: ''
    };
  },
  computed: {
    currentLanguage() {
      return this.$route.query.lang || (this.$route.path.includes('/zh/') ? 'cn' : 'en');
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.animationsVisible = true;
    });
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.form.name) {
        this.errors.name = this.currentLanguage === 'en' ? 'Name is required.' : '姓名是必填项。';
      }
      if (!this.form.email) {
        this.errors.email = this.currentLanguage === 'en' ? 'Email is required.' : '邮箱是必填项。';
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        this.errors.email = this.currentLanguage === 'en' ? 'Email is invalid.' : '邮箱格式无效。';
      }
      if (!this.form.message) {
        this.errors.message = this.currentLanguage === 'en' ? 'Message is required.' : '信息是必填项。';
      }
      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;
      this.submitStatus = null;
      this.submitMessage = '';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        });

        const result = await response.json();

        if (response.ok) {
          this.submitStatus = 'success';
          this.submitMessage = this.currentLanguage === 'en' ? 'Message sent successfully!' : '信息发送成功！';
          this.resetForm();
        } else {
          this.submitStatus = 'error';
          this.submitMessage = result.error || (this.currentLanguage === 'en' ? 'An error occurred. Please try again.' : '发生错误，请重试。');
        }
      } catch (error) {
        this.submitStatus = 'error';
        this.submitMessage = this.currentLanguage === 'en' ? 'An error occurred. Please try again.' : '发生错误，请重试。';
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.form.name = '';
      this.form.email = '';
      this.form.company = '';
      this.form.message = '';
    }
  }
};
</script>

<style scoped>
/* General Styles */
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
  padding: 15px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease;
  width: 100%;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-status {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.submit-status.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.submit-status.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .contact-form {
    padding: 30px 20px;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2em;
  }
  
  .hero-content p {
    font-size: 1.2em;
  }
}
</style>
