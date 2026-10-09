/**
 * KREAVERSIA 3D MARKETPLACE - 3D & AR ENGINE (models.js)
 * Procedural 3D model synthesizers, WebGL fallbacks, and AR Camera interaction.
 */

const Kreaversia3D = (() => {
  // Collection of realistic product definitions with verified 3D GLB assets & PBR fallbacks
  const PRODUCTS_DATA = [
    {
      id: 'prod-1',
      name: 'Vela Artesanal Lavanda & Sándalo',
      category: 'velas',
      price: 28.50,
      rating: 4.9,
      reviewsCount: 38,
      artisan: {
        name: 'Estudio Terracota',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80',
        city: 'Oaxaca, México',
        verified: true
      },
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80',
      modelGlb: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb',
      modelType: 'candle',
      dimensions: '14cm × 9cm × 9cm',
      material: 'Cera de Soja & Aceites Puros',
      craftTime: '3 Días a mano',
      description: 'Moldeada individualmente en torno cerámico y vertida con cera botánica de soja enriquecida con esencias naturales de lavanda silvestre y madera de sándalo. Emite una llama tibia y aroma relajante.',
      tags: ['3D con IA', 'Eco-Friendly', '100% Cera de Soja'],
      hotspots: {
        material: { title: 'Cera Botánica de Soja', text: 'Vertida a mano en pequeñas tandas' },
        finish: { title: 'Base Cerámica Terracota', text: 'Cocida en horno artesanal a 1050°C' }
      }
    },
    {
      id: 'prod-2',
      name: 'Taza de Cerámica Terracota Nórdica',
      category: 'ceramica',
      price: 24.00,
      rating: 4.8,
      reviewsCount: 52,
      artisan: {
        name: 'Barro Vivo Taller',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        city: 'Antigua, Guatemala',
        verified: true
      },
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      modelGlb: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb',
      modelType: 'cup',
      dimensions: '10cm × 12cm × 9cm',
      material: 'Arcilla Esmaltada Rustica',
      craftTime: '5 Días en torno',
      description: 'Taza ergonómica de tacto rústico con esmalte mate sin plomo. Mantiene la temperatura perfecta para café de especialidad y té de hierbas.',
      tags: ['3D con IA', 'Sin Plomo', 'Apto Microondas'],
      hotspots: {
        material: { title: 'Esmalte Mate Sedoso', text: 'Acabado mineral resistente a manchas' },
        finish: { title: 'Asa Ergonómica', text: 'Diseñada para descanso natural del pulgar' }
      }
    },
    {
      id: 'prod-3',
      name: 'Florero Orgánico Arcilla & Arena',
      category: 'decoracion',
      price: 45.00,
      rating: 5.0,
      reviewsCount: 29,
      artisan: {
        name: 'Lumbre Cerámica',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        city: 'Medellín, Colombia',
        verified: true
      },
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop&q=80',
      modelGlb: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
      modelType: 'vase',
      dimensions: '22cm × 14cm × 14cm',
      material: 'Arcilla de Río & Arena Sílice',
      craftTime: '4 Días de curado',
      description: 'Pieza escultórica con silueta fluida inspirada en las formas del desierto. Ideal para ramas secas, flores frescas o como elemento decorativo de acento.',
      tags: ['3D con IA', 'Pieza Única', 'Textura Arena'],
      hotspots: {
        material: { title: 'Textura Arena Natural', text: 'Grano fino al tacto no resbaladizo' },
        finish: { title: 'Cuello Asimétrico', text: 'Silueta modelada a mano libre' }
      }
    },
    {
      id: 'prod-4',
      name: 'Lámpara de Sal y Madera de Olivo',
      category: 'iluminacion',
      price: 58.00,
      rating: 4.9,
      reviewsCount: 64,
      artisan: {
        name: 'Raíces & Luz',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        city: 'Córdoba, Argentina',
        verified: true
      },
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
      modelGlb: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Lantern/glTF-Binary/Lantern.glb',
      modelType: 'lamp',
      dimensions: '18cm × 12cm × 12cm',
      material: 'Cristal de Sal Rosa & Olivo',
      craftTime: '2 Días',
      description: 'Lámpara ambiental con bloque de sal rosada pura tallada a mano sobre base de madera de olivo recuperada. Luz cálida regulable para meditación y descanso.',
      tags: ['3D con IA', 'Luz Regulable', 'Ionizante Natural'],
      hotspots: {
        material: { title: 'Cristal de Sal Mineral', text: '100% natural con vetas rosas únicas' },
        finish: { title: 'Madera de Olivo', text: 'Sellada con cera de abejas botánica' }
      }
    },
    {
      id: 'prod-5',
      name: 'Bandeja Orgánica de Madera de Parota',
      category: 'madera',
      price: 49.00,
      rating: 4.7,
      reviewsCount: 21,
      artisan: {
        name: 'Carpintería Solar',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
        city: 'Mérida, Yucatán',
        verified: true
      },
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80',
      modelGlb: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SheenChair/glTF-Binary/SheenChair.glb',
      modelType: 'tray',
      dimensions: '30cm × 18cm × 3cm',
      material: 'Madera de Parota Sustentable',
      craftTime: '4 Días',
      description: 'Bandeja para servir aperitivos tallada en una sola pieza de parota sólida con bordes vivos naturales. Acabado con aceites grado alimenticio.',
      tags: ['3D con IA', 'Borde Vivo', 'Grado Alimento'],
      hotspots: {
        material: { title: 'Parota Veteada', text: 'Veta contrastante dorada y café' },
        finish: { title: 'Pulido Seda', text: 'Lijado a 800 granos para ultra suavidad' }
      }
    },
    {
      id: 'prod-6',
      name: 'Maceta Geométrica de Concreto y Cobre',
      category: 'decoracion',
      price: 22.00,
      rating: 4.9,
      reviewsCount: 45,
      artisan: {
        name: 'Estudio Terracota',
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&auto=format&fit=crop&q=80',
        city: 'Oaxaca, México',
        verified: true
      },
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
      modelGlb: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
      modelType: 'pot',
      dimensions: '12cm × 12cm × 11cm',
      material: 'Concreto Aligerado & Hoja Cobre',
      craftTime: '2 Días de fraguado',
      description: 'Maceta de inspiración brutalista con líneas facetadas y detalle en hoja de cobre cobrizo. Incluye orificio de drenaje y plato integrado.',
      tags: ['3D con IA', 'Drenaje Smart', 'Diseño Facetado'],
      hotspots: {
        material: { title: 'Concreto Poroso Aligerado', text: 'Permite transpirar a las raíces' },
        finish: { title: 'Línea de Cobre Puro', text: 'Aplicado con técnica tradicional de pan' }
      }
    }
  ];

  // Procedural 3D Mesh Generator via Three.js (Offline Fallback & AR Overlay)
  function createProceduralMesh(type, colorHex = '#C85A32') {
    const group = new THREE.Group();
    const primaryColor = new THREE.Color(colorHex);

    switch(type) {
      case 'candle': {
        // Base Candle Body
        const candleGeo = new THREE.CylinderGeometry(0.35, 0.38, 0.7, 32);
        const candleMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          roughness: 0.6,
          metalness: 0.1
        });
        const candleMesh = new THREE.Mesh(candleGeo, candleMat);
        candleMesh.castShadow = true;
        candleMesh.receiveShadow = true;
        group.add(candleMesh);

        // Wax Melt Rim
        const rimGeo = new THREE.TorusGeometry(0.34, 0.04, 16, 32);
        const rimMat = new THREE.MeshStandardMaterial({
          color: primaryColor.clone().offsetHSL(0, 0, 0.08),
          roughness: 0.3
        });
        const rimMesh = new THREE.Mesh(rimGeo, rimMat);
        rimMesh.rotation.x = Math.PI / 2;
        rimMesh.position.y = 0.35;
        group.add(rimMesh);

        // Wick
        const wickGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8);
        const wickMat = new THREE.MeshBasicMaterial({ color: 0x221100 });
        const wickMesh = new THREE.Mesh(wickGeo, wickMat);
        wickMesh.position.y = 0.4;
        group.add(wickMesh);

        // Flame
        const flameGeo = new THREE.ConeGeometry(0.045, 0.14, 16);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0xFFB300 });
        const flameMesh = new THREE.Mesh(flameGeo, flameMat);
        flameMesh.position.y = 0.48;
        group.add(flameMesh);

        // Light point
        const light = new THREE.PointLight(0xFF9E7D, 1.2, 2.5);
        light.position.y = 0.5;
        group.add(light);
        break;
      }
      case 'cup': {
        // Ceramic Mug body
        const cupGeo = new THREE.CylinderGeometry(0.35, 0.28, 0.6, 32, 1, true);
        const cupMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          roughness: 0.5,
          side: THREE.DoubleSide
        });
        const cupMesh = new THREE.Mesh(cupGeo, cupMat);
        group.add(cupMesh);

        // Base bottom
        const bottomGeo = new THREE.CircleGeometry(0.28, 32);
        const bottomMesh = new THREE.Mesh(bottomGeo, cupMat);
        bottomMesh.rotation.x = Math.PI / 2;
        bottomMesh.position.y = -0.3;
        group.add(bottomMesh);

        // Handle
        const handleGeo = new THREE.TorusGeometry(0.2, 0.04, 16, 24, Math.PI);
        const handleMesh = new THREE.Mesh(handleGeo, cupMat);
        handleMesh.position.set(0.35, 0, 0);
        handleMesh.rotation.z = -Math.PI / 2;
        group.add(handleMesh);
        break;
      }
      case 'vase': {
        // Sculptural Vase Lathe
        const points = [];
        for (let i = 0; i <= 20; i++) {
          const t = i / 20;
          const y = (t - 0.5) * 1.0;
          const r = Math.sin(t * Math.PI) * 0.35 + 0.12 + Math.pow(t - 0.7, 2) * 0.2;
          points.push(new THREE.Vector2(r, y));
        }
        const vaseGeo = new THREE.LatheGeometry(points, 36);
        const vaseMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          roughness: 0.7,
          metalness: 0.05
        });
        const vaseMesh = new THREE.Mesh(vaseGeo, vaseMat);
        group.add(vaseMesh);
        break;
      }
      default: {
        // Generic Lamp or Box
        const sphereGeo = new THREE.DodecahedronGeometry(0.4, 2);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: primaryColor,
          roughness: 0.4,
          metalness: 0.2
        });
        const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
        group.add(sphereMesh);

        const baseGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.15, 24);
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x4A3525, roughness: 0.8 });
        const baseMesh = new THREE.Mesh(baseGeo, baseMat);
        baseMesh.position.y = -0.4;
        group.add(baseMesh);
      }
    }

    return group;
  }

  return {
    getProducts: () => PRODUCTS_DATA,
    getProductById: (id) => PRODUCTS_DATA.find(p => p.id === id),
    addProduct: (newProd) => {
      PRODUCTS_DATA.unshift(newProd);
      return newProd;
    },
    createProceduralMesh
  };
})();

window.Kreaversia3D = Kreaversia3D;
window.Artivio3D = Kreaversia3D; // Backward compatibility alias
