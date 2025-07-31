# Anchen Jossie Trading Co., Ltd. - Vue 3 Website

A modern, responsive website built with Vue 3 for Anchen Jossie Trading Co., Ltd., a global supplier of high-quality silicone rubber products.

## Features

- ⚡ **Vue 3** with Composition API
- 🚀 **Vite** for fast development and building
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** with smooth animations
- 🧭 **Vue Router** for navigation
- 📝 **Contact Form** with validation
- 🏢 **Product Showcase** with categories
- 🌐 **Multi-language Ready** structure

## Project Structure

```
vue-project/
├── public/
│   ├── images/           # Static images
│   └── icon.png         # Favicon
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── global.css
│   ├── components/
│   │   ├── AppHeader.vue
│   │   └── AppFooter.vue
│   ├── views/
│   │   ├── Home.vue
│   │   ├── About.vue
│   │   ├── Products.vue
│   │   └── Contact.vue
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── package.json
├── vite.config.js
└── index.html
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd vue-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Building for Production

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production with Vite
- `npm run preview` - Preview production build
- `npm run serve` - Start development server with Vue CLI (alternative)
- `npm run build:vite` - Build with Vite (alternative)
- `npm run lint` - Run ESLint

## Pages

### Home (`/`)
- Modern landing page with language selection
- Animated hero section
- Call-to-action buttons

### About (`/about`)
- Company information and history
- Hero section with company mission
- Multi-section layout with company details
- Image galleries and company culture

### Products (`/products`)
- Product categories showcase
- Featured products grid
- Responsive card layouts
- Product specifications

### Contact (`/contact`)
- Contact information display
- Interactive contact form with validation
- Form submission handling
- Responsive design

## Components

### AppHeader
- Sticky navigation header
- Vue Router integration
- Hover effects and active states
- Mobile-responsive design

### AppFooter
- Company copyright information
- Auto-updating year
- Consistent styling

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **Vue Router 4** - Official router for Vue.js
- **Vite** - Next generation frontend tooling
- **CSS3** - Modern styling with flexbox and grid
- **ES6+** - Modern JavaScript features

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Copyright © 2025 Anchen Jossie Trading Co., Ltd. All rights reserved.

## Contact

For questions about this project:
- Email: info@anchenjossie.com
- Website: www.anchenjossie.com
