# Rave Revolution Beats - Electronic Music Experience

🎵 Una experiencia inmersiva de música electrónica con tienda integrada y funcionalidades PWA.

## 🚀 Características

- **Sitio Web Completo**: Páginas de inicio, música, tienda, about y contacto
- **Tienda E-commerce**: Integración con Printful para productos personalizados
- **PWA Ready**: Progressive Web App con manifest optimizado
- **Carrito de Compras**: Sistema completo de carrito con localStorage
- **Responsive Design**: Optimizado para todos los dispositivos
- **Música Streaming**: Enlaces a plataformas de música principales

## 🛠️ Tecnologías

- **Astro** - Framework web moderno
- **SCSS** - Estilos avanzados
- **TypeScript** - Tipado estático
- **Printful API** - Gestión de productos
- **PWA** - Aplicación web progresiva

## 📦 Instalación

```bash
# Clonar el repositorio
git clone [repository-url]

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Printful

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Variables de Entorno

```env
PRINTFUL_API_BASE=https://api.printful.com/
PRINTFUL_ACCESS_TOKEN=tu-token-aqui
```

## 📋 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de la build
npm run deploy       # Desplegar a GitHub Pages
npm run publish      # Build + Deploy
```

## 🔒 Robustez y Manejo de Errores

Este proyecto incluye múltiples capas de protección:

- **Productos de Respaldo**: Funciona sin conexión a Printful API
- **Rutas Estáticas**: Páginas de producto siempre disponibles  
- **Validación de Moneda**: Manejo seguro de códigos de moneda
- **Iconos PWA**: Múltiples tamaños para mejor compatibilidad

## 📁 Estructura del Proyecto

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
