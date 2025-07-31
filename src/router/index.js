import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Products from '@/views/Products.vue'
import Contact from '@/views/Contact.vue'
import ProductList from '@/views/InteractiveProductList.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import ColorMasterbatch from '@/views/ColorMasterbatch.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Interactive_Product_List',
    name: 'InteractiveProductList',
    component: ProductList
  },
  {
    path: '/products/:slug',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/color_masterbatch',
    name: 'ColorMasterbatch',
    component: ColorMasterbatch
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  // Chinese language routes
  {
    path: '/zh/Interactive_Product_List',
    name: 'InteractiveProductListCN',
    component: ProductList,
    beforeEnter: (to, from, next) => {
      to.query.lang = 'cn'
      next()
    }
  },
  {
    path: '/zh/products/:slug',
    name: 'ProductDetailCN',
    component: ProductDetail,
    beforeEnter: (to, from, next) => {
      to.query.lang = 'cn'
      next()
    }
  },
  {
    path: '/zh/color_masterbatch',
    name: 'ColorMasterbatchCN',
    component: ColorMasterbatch,
    beforeEnter: (to, from, next) => {
      to.query.lang = 'cn'
      next()
    }
  },
  {
    path: '/zh/products',
    name: 'ProductsCN',
    component: Products,
    beforeEnter: (to, from, next) => {
      to.query.lang = 'cn'
      next()
    }
  },
  {
    path: '/zh/contact',
    name: 'ContactCN',
    component: Contact,
    beforeEnter: (to, from, next) => {
      to.query.lang = 'cn'
      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
