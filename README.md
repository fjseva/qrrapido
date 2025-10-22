# ⚡ QRRapido.es

> Generador de códigos QR gratuito, rápido y personalizable

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🚀 Demo

**[Ver Demo en Vivo](https://qrrapido.es)** _(próximamente)_

## ✨ Características

- **🎨 100% Personalizable**: Elige colores y tamaños que se ajusten a tu marca
- **⚡ Súper Rápido**: Genera tu código QR en menos de 1 segundo
- **🔒 100% Privado**: Todo se procesa en tu navegador. Sin servidores. Sin registro.
- **📱 Responsive**: Funciona perfectamente en móvil, tablet y escritorio
- **🌐 Múltiples Tipos de QR**:
  - 🔗 URL / Sitio Web
  - 📝 Texto
  - 📧 Email
  - 📱 Teléfono
  - 💬 SMS
  - 📶 WiFi
  - 👤 vCard (Contacto)

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Librería QR**: [QRCode.js](https://github.com/davidshimjs/qrcodejs)
- **Hosting**: Netlify / Vercel
- **Analytics**: Google Analytics
- **Monetización**: Google AdSense

## 📦 Instalación

### Requisitos previos

Ninguno. Es un proyecto 100% frontend que funciona directamente en el navegador.

### Clonar el repositorio

```bash
git clone https://github.com/tuusuario/qrrapido.git
cd qrrapido
```

### Ejecutar localmente

Simplemente abre `index.html` en tu navegador, o usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000`

## 📁 Estructura del Proyecto

```
qrrapido/
├── index.html          # Página principal
├── assets/             # Recursos estáticos
│   └── logo.png        # Logo del proyecto (opcional)
├── pages/              # Páginas legales
│   ├── privacidad.html
│   ├── terminos.html
│   └── cookies.html
├── README.md           # Este archivo
├── LICENSE             # Licencia MIT
└── netlify.toml        # Configuración de Netlify (opcional)
```

## 🚀 Despliegue

### Netlify

1. Crea una cuenta en [Netlify](https://netlify.com)
2. Conecta tu repositorio de GitHub
3. Configura:
   - Build command: _(dejar vacío)_
   - Publish directory: `/`
4. ¡Despliega!

### Vercel

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Importa tu repositorio de GitHub
3. ¡Despliega automáticamente!

### GitHub Pages

```bash
# Habilita GitHub Pages en Settings > Pages
# Selecciona la rama 'main' y carpeta '/' (root)
```

## 💰 Monetización

El proyecto incluye espacios para Google AdSense:

1. **Registro en AdSense**: [google.com/adsense](https://www.google.com/adsense/)
2. **Agrega tu código** en los espacios marcados como `[ Espacio Publicitario ]`
3. **Espacios disponibles**:
   - Banner superior (728x90)
   - Banner inferior (728x90)
   - Sidebar ads (opcionales)

### Ejemplo de código AdSense:

```html
<!-- Reemplaza los divs de .ad-space con: -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

## 🔧 Personalización

### Cambiar colores del tema

Edita las variables CSS en `index.html`:

```css
/* Cambiar el gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Cambiar el color de los botones */
.btn {
    background: #667eea;
}
```

### Añadir tu logo

1. Coloca tu logo en `/assets/logo.png`
2. Actualiza la referencia en el HTML:

```html
<div class="logo">
    <img src="assets/logo.png" alt="QRRapido.es Logo" height="50">
    <h1>QRRapido.es</h1>
</div>
```

## 📊 SEO y Analytics

### Google Analytics

Añade antes del cierre de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Meta Tags SEO

Ya incluidos en el proyecto:

- Title optimizado
- Meta description
- Open Graph tags (para redes sociales)
- Viewport responsive

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Añadir más tipos de QR (eventos, localización GPS)
- [ ] Opción de añadir logo/imagen en el centro del QR
- [ ] Historial de QRs generados (localStorage)
- [ ] Exportar en SVG
- [ ] API REST para generación automática
- [ ] Modo oscuro
- [ ] Versión PWA (Progressive Web App)
- [ ] Plan Premium con características avanzadas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**Tu Nombre**

- Website: [qrrapido.es](https://qrrapido.es)
- GitHub: [@tuusuario](https://github.com/tuusuario)
- Twitter: [@tuusuario](https://twitter.com/tuusuario)

## 🙏 Agradecimientos

- [QRCode.js](https://github.com/davidshimjs/qrcodejs) por la librería de generación de QR
- [Netlify](https://netlify.com) por el hosting gratuito
- Comunidad open source

## 📞 Soporte

Si tienes alguna pregunta o problema:

- 📧 Email: hola@qrrapido.es
- 🐛 Issues: [GitHub Issues](https://github.com/tuusuario/qrrapido/issues)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!

**Hecho con ❤️ en España**