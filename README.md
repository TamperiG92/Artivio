# 🏺 Kreaversia 3D Marketplace

**Plataforma interactiva para emprendedores y compradores potenciada con Inteligencia Artificial (IA), Visor 3D y Realidad Aumentada (WebAR).**

---

## 🌟 Características Principales

### 1. 🛍️ Modo Comprador (Mobile-First Marketplace)
- **Feed y Catálogo de Creadores:** Exploración con filtros por categoría (*Velas, Cerámica, Decoración, Iluminación, Madera*), buscador en tiempo real e insignias de certificación 3D.
- **Detalle de Producto Interactivo:**
  - Integración de **Google `<model-viewer>`** con soporte para modelos `.glb` y `.usdz`.
  - Rotación 360°, zoom táctil, sombras en tiempo real y anotaciones *Hotspots* informativas sobre materiales y técnicas de elaboración.
  - Selector de acabados y variantes de color en vivo.
- **Botón Destacado: "VER EN MI ESPACIO (AR)"**:
  - Activación de la cámara del dispositivo móvil para proyectar la pieza en la mesa o sala en escala 1:1.
  - Simulador de Realidad Aumentada con controles de colocación, rotación, escala métrica y captura de fotografías.
- **Bolsa de Compras & Checkout Express:** Carrito dinámico con cálculo de totales y simulación de compra protegida.

### 2. 🧑‍🎨 Modo Emprendedor & Pipeline IA 3D
- **Panel de Control (Dashboard):** Métricas en vivo de vistas en Realidad Aumentada, ventas del mes, visitas 3D y valoración de clientes.
- **Gestión de Catálogo:** Lista de productos propios con accesos directos de previsualización 3D y AR.
- **Publicador con Escáner IA a 3D (NeRF & Photogrammetry Simulator):**
  1. *Paso 1:* Carga de especificaciones (nombre, categoría, precio, dimensiones reales y materiales).
  2. *Paso 2:* Subida de foto o selección de muestras predefinidas (Vela botánica, Cuenco cerámico, Lámpara nórdica, Florero terracota).
  3. *Paso 3:* Pipeline de conversión IA simulado en 4 etapas:
     - **Detección de Contorno y Profundidad:** Mapeo volumétrico con animación láser.
     - **Malla Poligonal 3D:** Construcción de topología optimizada para WebAR.
     - **Síntesis de Texturas PBR:** Generación de mapas de Albedo, Rugosidad y Normales.
     - **Exportación .GLB / .USDZ:** Empaquetado Draco listo para Google Model Viewer y Apple Quick Look.
  4. Previsualización 3D instantánea y publicación con 1 clic al Marketplace.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend Core:** HTML5 semántico, Vanilla CSS3 (paleta terracota, beige cálido, acentos sage green y glassmorphism) y JavaScript moderno (ES6+).
- **Visor 3D & WebAR:** `@google/model-viewer` v4.0.0 (WebXR, Scene Viewer y Quick Look).
- **Motor 3D & AR Fallback:** `Three.js` (r128) con sintetizador procedural de mallas PBR y renderizador AR en tiempo real.
- **Iconografía:** `Lucide Icons`.
- **Tipografía:** *Outfit* & *Plus Jakarta Sans* (Google Fonts).

---

## 🚀 Cómo Ejecutar el Proyecto

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone https://github.com/TamperiG92/Artivio.git
   cd Artivio
   ```

2. **Iniciar el servidor local:**
   - **Con Python:**
     ```bash
     python server.py
     ```
   - **O con Node.js (npx):**
     ```bash
     npx serve .
     ```
   - **O con VS Code:**
     Haz clic derecho en `index.html` y selecciona **"Open with Live Server"**.

3. **Abrir en el navegador (PC o Móvil):**
   ```
   http://127.0.0.1:5000/index.html
   ```

4. **📱 Para probar en tu teléfono celular real (Realidad Aumentada):**
   - Asegúrate de que tu celular y tu PC estén conectados a la **misma red Wi-Fi**.
   - En el navegador de tu celular (Chrome en Android o Safari en iOS), abre:
     ```
     http://<IP-DE-TU-PC>:5000/index.html
     ```
   *(La terminal al ejecutar `python server.py` te mostrará la IP exacta y el enlace directo).*
