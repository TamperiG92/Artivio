/**
 * ARTIVIO 3D MARKETPLACE - CORE APPLICATION LOGIC (app.js)
 * Mobile-First Interactive WebApp with 3D Model-Viewer, AI Photogrammetry, and AR Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Application State
  const state = {
    currentRole: 'buyer', // 'buyer' | 'seller'
    activeView: 'viewMarketplace',
    selectedProduct: null,
    cart: [],
    favorites: new Set(),
    activeCategory: 'all',
    searchQuery: '',
    arStream: null,
    arScene: null,
    arCamera: null,
    arRenderer: null,
    arCurrentObject: null,
    arScale: 1.0,
    arPosition: { x: 0, y: -0.3, z: -1.5 },
    isDraggingAR: false,
    prevTouchPos: { x: 0, y: 0 },
    // AI 3D Form State
    newProductData: {
      name: '',
      category: 'velas',
      price: 28.00,
      description: '',
      dimensions: '14cm × 9cm × 9cm',
      material: 'Cera de soja',
      photoUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format&fit=crop&q=80',
      modelType: 'candle',
      modelGlb: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb'
    }
  };

  // DOM Elements Selection
  const elements = {
    // Top Bar & Controls
    btnRoleBuyer: document.getElementById('btnRoleBuyer'),
    btnRoleSeller: document.getElementById('btnRoleSeller'),
    btnToggleFrame: document.getElementById('btnToggleFrame'),
    phoneContainer: document.getElementById('phoneContainer'),
    headerCartCount: document.getElementById('headerCartCount'),
    btnHeaderCart: document.getElementById('btnHeaderCart'),
    statusClock: document.getElementById('statusClock'),
    
    // Views
    viewMarketplace: document.getElementById('viewMarketplace'),
    viewProductDetail: document.getElementById('viewProductDetail'),
    viewARCamera: document.getElementById('viewARCamera'),
    viewSellerDashboard: document.getElementById('viewSellerDashboard'),
    viewCreateProduct: document.getElementById('viewCreateProduct'),
    viewProfile: document.getElementById('viewProfile'),
    
    // Bottom Nav Tabs
    navTabMarket: document.getElementById('navTabMarket'),
    navTabAR: document.getElementById('navTabAR'),
    navTabCreate: document.getElementById('navTabCreate'),
    navTabSeller: document.getElementById('navTabSeller'),
    navTabProfile: document.getElementById('navTabProfile'),
    allNavTabs: document.querySelectorAll('.bottom-nav-bar .nav-tab'),
    
    // Marketplace Feed
    productsGrid: document.getElementById('productsGrid'),
    productsCount: document.getElementById('productsCount'),
    searchInput: document.getElementById('searchInput'),
    categoriesContainer: document.getElementById('categoriesContainer'),
    bannerArPromo: document.getElementById('bannerArPromo'),
    btnTryArDemo: document.getElementById('btnTryArDemo'),
    btnProfileQuick: document.getElementById('btnProfileQuick'),

    // Product Detail
    btnBackFromDetail: document.getElementById('btnBackFromDetail'),
    detailNavTitle: document.getElementById('detailNavTitle'),
    tabMode3D: document.getElementById('tabMode3D'),
    tabModePhoto: document.getElementById('tabModePhoto'),
    modelViewerWrapper: document.getElementById('modelViewerWrapper'),
    photoGalleryWrapper: document.getElementById('photoGalleryWrapper'),
    artivioViewer: document.getElementById('artivioViewer'),
    detailMainImage: document.getElementById('detailMainImage'),
    detailDimensionsText: document.getElementById('detailDimensionsText'),
    detailCreatorAvatar: document.getElementById('detailCreatorAvatar'),
    detailCreatorName: document.getElementById('detailCreatorName'),
    detailCreatorLocation: document.getElementById('detailCreatorLocation'),
    detailTitle: document.getElementById('detailTitle'),
    detailPrice: document.getElementById('detailPrice'),
    detailRating: document.getElementById('detailRating'),
    detailReviewsCount: document.getElementById('detailReviewsCount'),
    detailMaterial: document.getElementById('detailMaterial'),
    detailCraftTime: document.getElementById('detailCraftTime'),
    detailDescription: document.getElementById('detailDescription'),
    detailTags: document.getElementById('detailTags'),
    colorOptions: document.getElementById('colorOptions'),
    btnLaunchAR: document.getElementById('btnLaunchAR'),
    btnAddToCart: document.getElementById('btnAddToCart'),
    btnResetCamera: document.getElementById('btnResetCamera'),
    btnToggleRotate: document.getElementById('btnToggleRotate'),
    btnToggleDimensions: document.getElementById('btnToggleDimensions'),
    dimensionsBadge: document.getElementById('dimensionsBadge'),
    hotspotMatTitle: document.getElementById('hotspotMatTitle'),
    hotspotFinishTitle: document.getElementById('hotspotFinishTitle'),
    btnFavProduct: document.getElementById('btnFavProduct'),

    // AR Camera View
    arVideoFeed: document.getElementById('arVideoFeed'),
    arCanvasOverlay: document.getElementById('arCanvasOverlay'),
    arRoomFallback: document.getElementById('arRoomFallback'),
    btnCloseAR: document.getElementById('btnCloseAR'),
    btnToggleCameraSource: document.getElementById('btnToggleCameraSource'),
    btnScaleDown: document.getElementById('btnScaleDown'),
    btnScaleUp: document.getElementById('btnScaleUp'),
    btnResetARPosition: document.getElementById('btnResetARPosition'),
    btnCaptureArPhoto: document.getElementById('btnCaptureArPhoto'),
    arThumbImg: document.getElementById('arThumbImg'),
    arProductName: document.getElementById('arProductName'),

    // Seller Dashboard
    sellerItemsList: document.getElementById('sellerItemsList'),
    sellerItemsCount: document.getElementById('sellerItemsCount'),
    btnQuickCreateProd: document.getElementById('btnQuickCreateProd'),

    // Create Product Form (AI Pipeline)
    btnBackFromCreate: document.getElementById('btnBackFromCreate'),
    formStep1: document.getElementById('formStep1'),
    formStep2: document.getElementById('formStep2'),
    formStep3: document.getElementById('formStep3'),
    stepNode1: document.getElementById('stepNode1'),
    stepNode2: document.getElementById('stepNode2'),
    stepNode3: document.getElementById('stepNode3'),
    stepLine1: document.getElementById('stepLine1'),
    stepLine2: document.getElementById('stepLine2'),
    btnGoToStep2: document.getElementById('btnGoToStep2'),
    btnBackToStep1: document.getElementById('btnBackToStep1'),
    btnStartAiProcess: document.getElementById('btnStartAiProcess'),
    dropZonePhoto: document.getElementById('dropZonePhoto'),
    fileInputPhoto: document.getElementById('fileInputPhoto'),
    btnTriggerFile: document.getElementById('btnTriggerFile'),
    uploadPlaceholder: document.getElementById('uploadPlaceholder'),
    uploadPreviewWrap: document.getElementById('uploadPreviewWrap'),
    imgUploadPreview: document.getElementById('imgUploadPreview'),
    btnChangePhoto: document.getElementById('btnChangePhoto'),
    aiPipelineCard: document.getElementById('aiPipelineCard'),
    aiSuccessCard: document.getElementById('aiSuccessCard'),
    aiSourcePhotoPreview: document.getElementById('aiSourcePhotoPreview'),
    aiStepText: document.getElementById('aiStepText'),
    previewNewViewer: document.getElementById('previewNewViewer'),
    genStatDimensions: document.getElementById('genStatDimensions'),
    btnPublishToMarketplace: document.getElementById('btnPublishToMarketplace'),

    // Cart Modal & Toast
    toastNotice: document.getElementById('toastNotice'),
    toastMessage: document.getElementById('toastMessage'),
    cartModalBackdrop: document.getElementById('cartModalBackdrop'),
    btnCloseCartModal: document.getElementById('btnCloseCartModal'),
    cartItemsContainer: document.getElementById('cartItemsContainer'),
    cartTotalPrice: document.getElementById('cartTotalPrice'),
    btnCheckoutNow: document.getElementById('btnCheckoutNow'),
    btnSwitchAccountRole: document.getElementById('btnSwitchAccountRole')
  };

  // Update Status Clock with real time
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (elements.statusClock) {
      elements.statusClock.textContent = `${hours}:${minutes}`;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ==========================================================================
  // VIEW NAVIGATION & ROLE MANAGEMENT
  // ==========================================================================
  function switchView(viewId, pushHistory = true) {
    document.querySelectorAll('.view-section').forEach(view => {
      view.classList.remove('active');
    });

    const targetView = document.getElementById(viewId);
    if (targetView) {
      targetView.classList.add('active');
      state.activeView = viewId;

      // Reset scroll
      const appScreen = document.getElementById('appScreen');
      if (appScreen) appScreen.scrollTop = 0;
    }

    // Update Bottom Nav Active Indicator
    elements.allNavTabs.forEach(tab => {
      const target = tab.getAttribute('data-target');
      if (target === viewId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Refresh icons
    if (window.lucide) window.lucide.createIcons();
  }

  function setRole(role) {
    state.currentRole = role;
    if (role === 'buyer') {
      elements.btnRoleBuyer.classList.add('active');
      elements.btnRoleSeller.classList.remove('active');
      switchView('viewMarketplace');
      showToast('Modo Comprador activado');
    } else {
      elements.btnRoleSeller.classList.add('active');
      elements.btnRoleBuyer.classList.remove('active');
      switchView('viewSellerDashboard');
      showToast('Modo Emprendedor activado');
    }
  }

  // Toast Notification Helper
  let toastTimer = null;
  function showToast(message) {
    if (!elements.toastNotice) return;
    elements.toastMessage.textContent = message;
    elements.toastNotice.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      elements.toastNotice.classList.remove('show');
    }, 2800);
  }

  // Desktop Smartphone Frame Toggle
  elements.btnToggleFrame.addEventListener('click', () => {
    elements.phoneContainer.classList.toggle('fullscreen-view');
    const isFull = elements.phoneContainer.classList.contains('fullscreen-view');
    showToast(isFull ? 'Vista pantalla completa' : 'Vista marco de móvil');
  });

  // Top Role Switcher Buttons
  elements.btnRoleBuyer.addEventListener('click', () => setRole('buyer'));
  elements.btnRoleSeller.addEventListener('click', () => setRole('seller'));

  // Bottom Navigation Handlers
  elements.allNavTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-target');
      if (target) {
        if (target === 'viewARCamera') {
          // If no product selected, pick the first one
          if (!state.selectedProduct) {
            state.selectedProduct = window.Artivio3D.getProducts()[0];
          }
          openARCamera(state.selectedProduct);
        } else {
          stopCameraStream();
          switchView(target);
        }
      }
    });
  });

  // Profile quick button on header
  elements.btnProfileQuick?.addEventListener('click', () => switchView('viewProfile'));
  elements.btnSwitchAccountRole?.addEventListener('click', () => {
    setRole(state.currentRole === 'buyer' ? 'seller' : 'buyer');
  });

  // ==========================================================================
  // VIEW 1: MARKETPLACE PRODUCTS RENDERING & FILTERS
  // ==========================================================================
  function renderProducts() {
    const products = window.Artivio3D.getProducts();
    const query = state.searchQuery.toLowerCase().trim();
    const cat = state.activeCategory;

    const filtered = products.filter(p => {
      const matchesCat = (cat === 'all' || p.category === cat);
      const matchesSearch = (!query || p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.artisan.name.toLowerCase().includes(query));
      return matchesCat && matchesSearch;
    });

    elements.productsCount.textContent = `${filtered.length} productos`;

    if (filtered.length === 0) {
      elements.productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 16px; color: #64748B;">
          <i data-lucide="package-search" style="width: 36px; height: 36px; margin: 0 auto 10px; color: #C85A32;"></i>
          <h4 style="font-size: 14px; margin-bottom: 4px;">No encontramos piezas con ese criterio</h4>
          <p style="font-size: 11.5px;">Prueba buscando otra categoría como "Velas", "Cerámica" o "Madera".</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    elements.productsGrid.innerHTML = filtered.map(prod => `
      <div class="product-card" data-id="${prod.id}">
        <div class="card-img-wrap">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy" />
          <div class="card-top-badges">
            <span class="badge-3d-ai">
              <i data-lucide="sparkles"></i> 3D IA
            </span>
            <button class="card-fav-btn ${state.favorites.has(prod.id) ? 'active' : ''}" data-fav-id="${prod.id}" title="Favorito">
              <i data-lucide="heart"></i>
            </button>
          </div>
        </div>
        <div class="card-info">
          <div class="card-creator-row">
            <i data-lucide="map-pin"></i>
            <span>${prod.artisan.city}</span>
          </div>
          <h3 class="card-title">${prod.name}</h3>
          <div class="card-footer-row">
            <div class="card-price">$${prod.price.toFixed(2)} <span>USD</span></div>
            <div class="card-ar-hint">
              <i data-lucide="box"></i> AR Listo
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click events to cards
    elements.productsGrid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // If clicking on favorite button, don't open detail
        if (e.target.closest('.card-fav-btn')) {
          const favBtn = e.target.closest('.card-fav-btn');
          const id = favBtn.getAttribute('data-fav-id');
          toggleFavorite(id, favBtn);
          return;
        }
        const id = card.getAttribute('data-id');
        openProductDetail(id);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function toggleFavorite(id, btnElement) {
    if (state.favorites.has(id)) {
      state.favorites.delete(id);
      btnElement.classList.remove('active');
      showToast('Eliminado de favoritos');
    } else {
      state.favorites.add(id);
      btnElement.classList.add('active');
      showToast('Guardado en tus favoritos ❤️');
    }
  }

  // Search input event
  elements.searchInput?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderProducts();
  });

  // Category Pills
  elements.categoriesContainer?.addEventListener('click', (e) => {
    const pill = e.target.closest('.cat-pill');
    if (!pill) return;
    elements.categoriesContainer.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.activeCategory = pill.getAttribute('data-category');
    renderProducts();
  });

  // AR Promo Banner Trigger
  elements.btnTryArDemo?.addEventListener('click', () => {
    const firstProd = window.Artivio3D.getProducts()[0];
    openARCamera(firstProd);
  });

  // ==========================================================================
  // VIEW 2: PRODUCT DETAIL & 3D GOOGLE MODEL-VIEWER
  // ==========================================================================
  function openProductDetail(productId) {
    const prod = window.Artivio3D.getProductById(productId);
    if (!prod) return;

    state.selectedProduct = prod;

    // Update Header & Texts
    elements.detailNavTitle.textContent = prod.name;
    elements.detailTitle.textContent = prod.name;
    elements.detailPrice.textContent = prod.price.toFixed(2);
    elements.detailRating.textContent = prod.rating.toFixed(1);
    elements.detailReviewsCount.textContent = `(${prod.reviewsCount} reseñas)`;
    elements.detailDescription.textContent = prod.description;
    elements.detailMaterial.textContent = prod.material;
    elements.detailCraftTime.textContent = prod.craftTime;
    elements.detailDimensionsText.textContent = `${prod.dimensions} (Escala Real 1:1)`;

    // Creator
    elements.detailCreatorName.textContent = prod.artisan.name;
    elements.detailCreatorAvatar.src = prod.artisan.avatar;
    elements.detailCreatorLocation.innerHTML = `<i data-lucide="map-pin"></i> ${prod.artisan.city}`;

    // Tags
    elements.detailTags.innerHTML = prod.tags.map(t => `<span class="tag-pill ai-tag"><i data-lucide="sparkles"></i> ${t}</span>`).join('');

    // Hotspots
    if (prod.hotspots) {
      if (elements.hotspotMatTitle) elements.hotspotMatTitle.textContent = prod.hotspots.material.title;
      if (elements.hotspotFinishTitle) elements.hotspotFinishTitle.textContent = prod.hotspots.finish.title;
    }

    // Photo Gallery Image
    elements.detailMainImage.src = prod.image;

    // Load 3D Model into Google <model-viewer>
    const viewer = elements.artivioViewer;
    if (viewer) {
      viewer.src = prod.modelGlb;
      viewer.poster = prod.image;
      viewer.alt = `Modelo 3D de ${prod.name}`;
      viewer.dismissPoster();
    }

    // Favorite button state
    if (elements.btnFavProduct) {
      if (state.favorites.has(prod.id)) {
        elements.btnFavProduct.innerHTML = '<i data-lucide="heart" style="fill:#E11D48;color:#E11D48;"></i>';
      } else {
        elements.btnFavProduct.innerHTML = '<i data-lucide="heart"></i>';
      }
    }

    // Default to 3D mode tab
    setViewerMode('3d');

    switchView('viewProductDetail');
  }

  elements.btnBackFromDetail.addEventListener('click', () => {
    switchView('viewMarketplace');
  });

  // Switch between 3D and Photo Gallery
  function setViewerMode(mode) {
    if (mode === '3d') {
      elements.tabMode3D.classList.add('active');
      elements.tabModePhoto.classList.remove('active');
      elements.modelViewerWrapper.classList.remove('hidden');
      elements.photoGalleryWrapper.classList.add('hidden');
    } else {
      elements.tabModePhoto.classList.add('active');
      elements.tabMode3D.classList.remove('active');
      elements.modelViewerWrapper.classList.add('hidden');
      elements.photoGalleryWrapper.classList.remove('hidden');
    }
  }

  elements.tabMode3D.addEventListener('click', () => setViewerMode('3d'));
  elements.tabModePhoto.addEventListener('click', () => setViewerMode('photo'));

  // Viewer Controls (Rotate, Reset, Dimensions)
  let isAutoRotate = true;
  elements.btnToggleRotate.addEventListener('click', () => {
    isAutoRotate = !isAutoRotate;
    elements.artivioViewer.autoRotate = isAutoRotate;
    elements.btnToggleRotate.innerHTML = isAutoRotate ? '<i data-lucide="pause"></i>' : '<i data-lucide="play"></i>';
    if (window.lucide) window.lucide.createIcons();
    showToast(isAutoRotate ? 'Rotación 360° activada' : 'Rotación pausada');
  });

  elements.btnResetCamera.addEventListener('click', () => {
    elements.artivioViewer.cameraOrbit = '0deg 75deg 105%';
    showToast('Cámara 3D restablecida');
  });

  elements.btnToggleDimensions.addEventListener('click', () => {
    elements.dimensionsBadge.classList.toggle('hidden');
  });

  // Color Variants Selector
  elements.colorOptions?.addEventListener('click', (e) => {
    const dot = e.target.closest('.color-dot');
    if (!dot) return;
    elements.colorOptions.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    const color = dot.getAttribute('data-color');
    showToast(`Acabado cambiado a: ${dot.getAttribute('title')}`);
  });

  // Launch AR Button on Product Detail
  elements.btnLaunchAR.addEventListener('click', () => {
    if (state.selectedProduct) {
      openARCamera(state.selectedProduct);
    }
  });

  // Add to Cart Button
  elements.btnAddToCart.addEventListener('click', () => {
    if (state.selectedProduct) {
      addToCart(state.selectedProduct);
    }
  });

  // Share Product
  elements.btnShareProduct?.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: state.selectedProduct?.name || 'Artivio 3D',
        text: 'Mira esta pieza artesanal en 3D y Realidad Aumentada en Artivio.',
        url: window.location.href
      }).catch(() => {});
    } else {
      showToast('Enlace 3D copiado al portapapeles 📋');
    }
  });

  // ==========================================================================
  // VIEW 3: WEB AR & CAMERA SIMULATOR EXPERIENCE
  // ==========================================================================
  function openARCamera(product) {
    state.selectedProduct = product;
    elements.arProductName.textContent = product.name;
    elements.arThumbImg.src = product.image;

    switchView('viewARCamera');

    // Attempt to start real device camera
    startCameraStream();

    // Initialize or Update Three.js AR Scene Overlay
    initThreeAR(product);
  }

  function startCameraStream() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      }).then(stream => {
        state.arStream = stream;
        elements.arVideoFeed.srcObject = stream;
        elements.arVideoFeed.classList.remove('hidden');
        elements.arRoomFallback.classList.add('hidden');
        showToast('Cámara activa • Posicionando en tu espacio');
      }).catch(err => {
        console.warn('Camera permission denied or not supported; fallback scenario active', err);
        elements.arVideoFeed.classList.add('hidden');
        elements.arRoomFallback.classList.remove('hidden');
        showToast('Modo AR Simulado en habitación');
      });
    } else {
      elements.arVideoFeed.classList.add('hidden');
      elements.arRoomFallback.classList.remove('hidden');
    }
  }

  function stopCameraStream() {
    if (state.arStream) {
      state.arStream.getTracks().forEach(t => t.stop());
      state.arStream = null;
    }
  }

  elements.btnCloseAR.addEventListener('click', () => {
    stopCameraStream();
    if (state.selectedProduct) {
      switchView('viewProductDetail');
    } else {
      switchView('viewMarketplace');
    }
  });

  elements.btnToggleCameraSource.addEventListener('click', () => {
    const isVideoHidden = elements.arVideoFeed.classList.contains('hidden');
    if (isVideoHidden) {
      startCameraStream();
    } else {
      stopCameraStream();
      elements.arVideoFeed.classList.add('hidden');
      elements.arRoomFallback.classList.remove('hidden');
      showToast('Vista de escenario interior activada');
    }
  });

  // Three.js AR Interactive Viewport Overlay
  function initThreeAR(product) {
    const canvas = elements.arCanvasOverlay;
    const width = canvas.parentElement.clientWidth || 380;
    const height = canvas.parentElement.clientHeight || 650;

    if (!state.arScene) {
      state.arScene = new THREE.Scene();
      state.arCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      state.arCamera.position.set(0, 0, 0);

      state.arRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
      state.arRenderer.setSize(width, height);
      state.arRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      state.arRenderer.shadowMap.enabled = true;

      // Ambient & Directional light
      const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x444444, 1.2);
      state.arScene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xFFE4D6, 1.5);
      dirLight.position.set(2, 4, 2);
      state.arScene.add(dirLight);

      // Animation Loop
      const animate = () => {
        requestAnimationFrame(animate);
        if (state.arCurrentObject && !state.isDraggingAR) {
          state.arCurrentObject.rotation.y += 0.005; // Gentle rotation
        }
        if (state.arRenderer && state.arScene && state.arCamera) {
          state.arRenderer.render(state.arScene, state.arCamera);
        }
      };
      animate();

      // Touch / Mouse Drag Controls for AR Placement
      setupARTouchControls(canvas);
    } else {
      state.arRenderer.setSize(width, height);
      state.arCamera.aspect = width / height;
      state.arCamera.updateProjectionMatrix();
    }

    // Replace Object in AR
    if (state.arCurrentObject) {
      state.arScene.remove(state.arCurrentObject);
    }

    const newMesh = window.Artivio3D.createProceduralMesh(product.modelType || 'candle');
    state.arScale = 1.0;
    state.arPosition = { x: 0, y: -0.3, z: -1.5 };
    newMesh.position.set(state.arPosition.x, state.arPosition.y, state.arPosition.z);
    newMesh.scale.set(state.arScale, state.arScale, state.arScale);

    state.arCurrentObject = newMesh;
    state.arScene.add(newMesh);
  }

  function setupARTouchControls(canvas) {
    let isDown = false;

    const onStart = (clientX, clientY) => {
      isDown = true;
      state.isDraggingAR = true;
      state.prevTouchPos = { x: clientX, y: clientY };
    };

    const onMove = (clientX, clientY) => {
      if (!isDown || !state.arCurrentObject) return;
      const dx = (clientX - state.prevTouchPos.x) * 0.004;
      const dy = (clientY - state.prevTouchPos.y) * 0.004;

      state.arCurrentObject.position.x += dx;
      state.arCurrentObject.position.y -= dy;
      state.arCurrentObject.rotation.y += dx * 2;

      state.prevTouchPos = { x: clientX, y: clientY };
    };

    const onEnd = () => {
      isDown = false;
      state.isDraggingAR = false;
    };

    canvas.addEventListener('mousedown', e => onStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onEnd);

    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchmove', e => {
      if (e.touches.length === 1) onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchend', onEnd);
  }

  // AR Scale Controls
  elements.btnScaleUp.addEventListener('click', () => {
    if (state.arCurrentObject) {
      state.arScale = Math.min(state.arScale + 0.15, 2.5);
      state.arCurrentObject.scale.set(state.arScale, state.arScale, state.arScale);
      showToast(`Escala AR: ${(state.arScale * 100).toFixed(0)}%`);
    }
  });

  elements.btnScaleDown.addEventListener('click', () => {
    if (state.arCurrentObject) {
      state.arScale = Math.max(state.arScale - 0.15, 0.4);
      state.arCurrentObject.scale.set(state.arScale, state.arScale, state.arScale);
      showToast(`Escala AR: ${(state.arScale * 100).toFixed(0)}%`);
    }
  });

  elements.btnResetARPosition.addEventListener('click', () => {
    if (state.arCurrentObject) {
      state.arScale = 1.0;
      state.arPosition = { x: 0, y: -0.3, z: -1.5 };
      state.arCurrentObject.position.set(0, -0.3, -1.5);
      state.arCurrentObject.scale.set(1, 1, 1);
      state.arCurrentObject.rotation.set(0, 0, 0);
      showToast('Objeto centrado en escala 1:1');
    }
  });

  // Capture AR Photo
  elements.btnCaptureArPhoto.addEventListener('click', () => {
    // Flash effect
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.right = '0';
    flash.style.bottom = '0';
    flash.style.backgroundColor = '#FFF';
    flash.style.zIndex = '100';
    flash.style.transition = 'opacity 0.4s ease';
    elements.arCanvasOverlay.parentElement.appendChild(flash);
    setTimeout(() => {
      flash.style.opacity = '0';
      setTimeout(() => flash.remove(), 400);
    }, 50);

    showToast('📸 ¡Foto en Realidad Aumentada guardada!');
  });

  // ==========================================================================
  // VIEW 4: SELLER DASHBOARD (PANEL EMPRENDEDOR)
  // ==========================================================================
  function renderSellerDashboard() {
    const products = window.Artivio3D.getProducts();
    elements.sellerItemsCount.textContent = `${products.length} activos`;

    elements.sellerItemsList.innerHTML = products.map(p => `
      <div class="seller-item-card">
        <img src="${p.image}" class="seller-item-thumb" alt="${p.name}">
        <div class="seller-item-info">
          <h4>${p.name}</h4>
          <div class="seller-item-meta">
            <span class="seller-item-price">$${p.price.toFixed(2)} USD</span>
            <span class="seller-item-3d-tag"><i data-lucide="box"></i> 3D PBR</span>
          </div>
        </div>
        <div class="seller-item-actions">
          <button class="seller-action-btn btn-view-item" data-id="${p.id}" title="Ver en Catálogo">
            <i data-lucide="eye"></i>
          </button>
          <button class="seller-action-btn btn-ar-item" data-id="${p.id}" title="Probar en AR">
            <i data-lucide="scan"></i>
          </button>
        </div>
      </div>
    `).join('');

    elements.sellerItemsList.querySelectorAll('.btn-view-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openProductDetail(id);
      });
    });

    elements.sellerItemsList.querySelectorAll('.btn-ar-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const prod = window.Artivio3D.getProductById(id);
        openARCamera(prod);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  elements.btnQuickCreateProd.addEventListener('click', () => {
    switchView('viewCreateProduct');
    resetCreateForm();
  });

  // ==========================================================================
  // VIEW 5: CREATE PRODUCT WITH AI 3D SCANNER PIPELINE
  // ==========================================================================
  function resetCreateForm() {
    // Reset steps
    elements.formStep1.classList.remove('hidden');
    elements.formStep1.classList.add('active');
    elements.formStep2.classList.add('hidden');
    elements.formStep3.classList.add('hidden');

    elements.stepNode1.className = 'step-node active';
    elements.stepNode2.className = 'step-node';
    elements.stepNode3.className = 'step-node';
    elements.stepLine1.classList.remove('active');
    elements.stepLine2.classList.remove('active');

    elements.aiPipelineCard.classList.remove('hidden');
    elements.aiSuccessCard.classList.add('hidden');

    // Default preset
    selectPresetSample('candle', 'Vela Cilíndrica Botánica', 29.00, 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&auto=format&fit=crop&q=80');
  }

  // Step 1 to Step 2
  elements.btnGoToStep2.addEventListener('click', () => {
    const name = document.getElementById('prodInputName').value.trim();
    const price = parseFloat(document.getElementById('prodInputPrice').value);
    const desc = document.getElementById('prodInputDesc').value.trim();
    const dims = document.getElementById('prodInputDimensions').value.trim();
    const mat = document.getElementById('prodInputMaterial').value.trim();
    const cat = document.getElementById('prodInputCategory').value;

    if (!name || isNaN(price)) {
      showToast('Por favor completa el nombre y precio');
      return;
    }

    state.newProductData.name = name;
    state.newProductData.price = price;
    state.newProductData.description = desc;
    state.newProductData.dimensions = dims;
    state.newProductData.material = mat;
    state.newProductData.category = cat;

    elements.formStep1.classList.add('hidden');
    elements.formStep2.classList.remove('hidden');
    elements.formStep2.classList.add('active');

    elements.stepNode1.className = 'step-node completed';
    elements.stepNode2.className = 'step-node active';
    elements.stepLine1.classList.add('active');

    if (window.lucide) window.lucide.createIcons();
  });

  elements.btnBackToStep1.addEventListener('click', () => {
    elements.formStep2.classList.add('hidden');
    elements.formStep1.classList.remove('hidden');
    elements.formStep1.classList.add('active');

    elements.stepNode1.className = 'step-node active';
    elements.stepNode2.className = 'step-node';
    elements.stepLine1.classList.remove('active');
  });

  elements.btnBackFromCreate.addEventListener('click', () => {
    switchView('viewSellerDashboard');
  });

  // Photo Selector & Presets
  elements.btnTriggerFile.addEventListener('click', () => {
    elements.fileInputPhoto.click();
  });

  elements.fileInputPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  function setUploadedPhoto(url) {
    state.newProductData.photoUrl = url;
    elements.imgUploadPreview.src = url;
    elements.uploadPlaceholder.classList.add('hidden');
    elements.uploadPreviewWrap.classList.remove('hidden');
  }

  elements.btnChangePhoto?.addEventListener('click', () => {
    elements.uploadPlaceholder.classList.remove('hidden');
    elements.uploadPreviewWrap.classList.add('hidden');
    elements.fileInputPhoto.value = '';
  });

  // Preset Selection
  document.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const preset = card.getAttribute('data-preset');
      const name = card.getAttribute('data-name');
      const price = parseFloat(card.getAttribute('data-price'));
      const img = card.getAttribute('data-img');
      const model = card.getAttribute('data-model');

      selectPresetSample(model, name, price, img);
    });
  });

  function selectPresetSample(modelType, name, price, imgUrl) {
    state.newProductData.modelType = modelType;
    state.newProductData.photoUrl = imgUrl;

    const glbMap = {
      candle: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb',
      cup: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb',
      lamp: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb',
      vase: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb'
    };
    state.newProductData.modelGlb = glbMap[modelType] || glbMap.candle;

    setUploadedPhoto(imgUrl);
  }

  // AI 3D Generation Pipeline Process
  elements.btnStartAiProcess.addEventListener('click', () => {
    elements.formStep2.classList.add('hidden');
    elements.formStep3.classList.remove('hidden');
    elements.formStep3.classList.add('active');

    elements.stepNode2.className = 'step-node completed';
    elements.stepNode3.className = 'step-node active';
    elements.stepLine2.classList.add('active');

    elements.aiSourcePhotoPreview.src = state.newProductData.photoUrl;

    runAi3DPipeline();
  });

  function runAi3DPipeline() {
    const steps = [
      {
        id: 'pStep1',
        text: 'Segmentando contorno y profundidad (NeRF)...',
        delay: 1400
      },
      {
        id: 'pStep2',
        text: 'Generando topología de malla 3D optimizada...',
        delay: 1500
      },
      {
        id: 'pStep3',
        text: 'Sintetizando texturas PBR y normales...',
        delay: 1500
      },
      {
        id: 'pStep4',
        text: 'Empaquetando modelo .GLB para Google Model Viewer...',
        delay: 1200
      }
    ];

    let current = 0;
    function executeStep() {
      if (current < steps.length) {
        const step = steps[current];
        elements.aiStepText.textContent = step.text;

        // Reset previous to done
        if (current > 0) {
          const prevEl = document.getElementById(steps[current - 1].id);
          prevEl.className = 'pipeline-step-item done';
        }

        const currentEl = document.getElementById(step.id);
        currentEl.className = 'pipeline-step-item in-progress';

        if (window.lucide) window.lucide.createIcons();

        setTimeout(() => {
          current++;
          executeStep();
        }, step.delay);
      } else {
        // Mark last step done
        const lastEl = document.getElementById(steps[steps.length - 1].id);
        lastEl.className = 'pipeline-step-item done';

        // Complete! Show 3D Result
        setTimeout(() => {
          elements.aiPipelineCard.classList.add('hidden');
          elements.aiSuccessCard.classList.remove('hidden');
          elements.genStatDimensions.textContent = state.newProductData.dimensions;

          elements.previewNewViewer.src = state.newProductData.modelGlb;
          elements.previewNewViewer.poster = state.newProductData.photoUrl;

          showToast('✨ ¡Modelo 3D y WebAR generados con éxito!');
        }, 500);
      }
    }

    executeStep();
  }

  // Publish to Marketplace
  elements.btnPublishToMarketplace.addEventListener('click', () => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      name: state.newProductData.name || 'Nueva Pieza Artesanal',
      category: state.newProductData.category || 'decoracion',
      price: state.newProductData.price || 30.00,
      rating: 5.0,
      reviewsCount: 1,
      artisan: {
        name: 'Taller Arcilla & Alma',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=160&auto=format&fit=crop&q=80',
        city: 'Guadalajara, Jalisco',
        verified: true
      },
      image: state.newProductData.photoUrl,
      modelGlb: state.newProductData.modelGlb,
      modelType: state.newProductData.modelType || 'candle',
      dimensions: state.newProductData.dimensions || '12cm × 8cm × 8cm',
      material: state.newProductData.material || 'Artesanal',
      craftTime: '3 Días',
      description: state.newProductData.description || 'Pieza creada con esmero artesanal y digitalizada en 3D con IA.',
      tags: ['3D con IA', 'Nuevo', 'Hecho a mano'],
      hotspots: {
        material: { title: 'Material Genuino', text: 'Texturizado PBR escaneado' },
        finish: { title: 'Acabado Artesanal', text: 'Geometría 3D de alta definición' }
      }
    };

    window.Artivio3D.addProduct(newProduct);
    renderProducts();
    renderSellerDashboard();

    showToast('🎉 ¡Tu producto ya está disponible en el Catálogo 3D!');
    openProductDetail(newProduct.id);
  });

  // ==========================================================================
  // SHOPPING CART & CHECKOUT
  // ==========================================================================
  function addToCart(product) {
    state.cart.push(product);
    updateCartUI();
    showToast(`🛒 "${product.name}" añadido a la bolsa`);
  }

  function removeFromCart(index) {
    state.cart.splice(index, 1);
    updateCartUI();
    renderCartModal();
  }

  function updateCartUI() {
    const count = state.cart.length;
    if (elements.headerCartCount) {
      elements.headerCartCount.textContent = count;
      elements.headerCartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  function renderCartModal() {
    if (state.cart.length === 0) {
      elements.cartItemsContainer.innerHTML = `
        <div style="text-align: center; padding: 30px 10px; color: #64748B;">
          <i data-lucide="shopping-bag" style="width: 36px; height: 36px; color: #CBD5E1; margin-bottom: 8px;"></i>
          <p style="font-size: 13px;">Tu bolsa está vacía</p>
        </div>
      `;
      elements.cartTotalPrice.textContent = '$0.00 USD';
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    const total = state.cart.reduce((sum, item) => sum + item.price, 0);
    elements.cartTotalPrice.textContent = `$${total.toFixed(2)} USD`;

    elements.cartItemsContainer.innerHTML = state.cart.map((item, idx) => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <span>$${item.price.toFixed(2)} USD</span>
        </div>
        <button class="cart-item-remove" data-index="${idx}" title="Eliminar">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `).join('');

    elements.cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'));
        removeFromCart(idx);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  elements.btnHeaderCart.addEventListener('click', () => {
    renderCartModal();
    elements.cartModalBackdrop.classList.remove('hidden');
  });

  elements.btnCloseCartModal.addEventListener('click', () => {
    elements.cartModalBackdrop.classList.add('hidden');
  });

  elements.btnCheckoutNow.addEventListener('click', () => {
    if (state.cart.length === 0) {
      showToast('Añade un producto antes de pagar');
      return;
    }
    elements.cartModalBackdrop.classList.add('hidden');
    state.cart = [];
    updateCartUI();
    showToast('💳 ¡Pago simulado exitoso! Tu pedido ha sido enviado al artesano.');
  });

  // Initial Renders
  renderProducts();
  renderSellerDashboard();
  updateCartUI();
});
