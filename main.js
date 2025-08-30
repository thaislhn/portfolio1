// Variables globales pour gérer l'état des projets
let currentProjectId = null;
let activeProjectStyles = new Map();
let activeEventListeners = new Map();

// Helper Functions
function escapeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

// Fonction pour détecter si on est sur mobile
function isMobileDevice() {
  return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Fonction pour fermer toutes les fenêtres sur mobile
function closeAllWindowsOnMobile() {
  if (isMobileDevice()) {
    console.log('📱 Fermeture de toutes les fenêtres sur mobile');
    const allStacks = document.querySelectorAll(".about-window-stack, .search-window-stack, .project-window-stack, .cv-window-stack, .contact-window-stack");
    allStacks.forEach(stack => {
    
      
    });
  }
}

// Fonction CORRIGÉE pour nettoyer complètement l'état précédent
function cleanupPreviousProject() {
  console.log('🧹 Nettoyage complet de l\'état précédent...');
  
  // 1. Supprimer TOUS les styles de projets précédents
  activeProjectStyles.forEach((styleElement, projectId) => {
    if (styleElement && styleElement.parentNode) {
      console.log('Suppression des styles du projet:', projectId);
      styleElement.parentNode.removeChild(styleElement);
    }
  });
  activeProjectStyles.clear();
  
  // 2. Nettoyer tous les conteneurs de galeries
  const allGalleryFeeds = document.querySelectorAll('.full-photo-feed');
  allGalleryFeeds.forEach(feed => {
    feed.innerHTML = '';
    feed.style.cssText = '';
    // Reset complet des propriétés CSS
    feed.removeAttribute('style');
    feed.className = 'full-photo-feed'; // Reset de la classe
  });
  
  // 3. Supprimer tous les éléments 3D du projet CD
  const cdElements = document.querySelectorAll('#wrap, #box, .interactive-project-layout, .cd-container');
  cdElements.forEach(element => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });
  
  // 4. Reset des variables CSS personnalisées
  document.documentElement.style.removeProperty('--box-color');
  
  // 5. Supprimer toutes les animations actives
  const animatedElements = document.querySelectorAll('[style*="animation"]');
  animatedElements.forEach(el => {
    el.style.animation = 'none';
  });
  
  // 6. Nettoyer spécifiquement les conteneurs de preview
  const previewContainers = document.querySelectorAll('.preview-container');
  previewContainers.forEach(container => {
    container.innerHTML = '';
    container.style.cssText = '';
  });
  
  console.log('✅ Nettoyage terminé');
}

// Fonction AMÉLIORÉE pour initialiser les galeries photos avec plus d'espacement
function initFullWidthFeed(photos) {
  console.log('🖼️ initFullWidthFeed appelée avec:', photos);
  
  const feed = document.querySelector('.full-photo-feed');
  if (!feed) {
    console.error('❌ Conteneur .full-photo-feed non trouvé');
    return;
  }
  
  if (!Array.isArray(photos) || photos.length === 0) {
    console.error('❌ Photos non valides ou vides:', photos);
    feed.innerHTML = '<div class="image-error">Aucune photo à afficher</div>';
    return;
  }

  // Nettoyer et réinitialiser le conteneur avec plus d'espacement
  feed.innerHTML = '';
  feed.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    margin-bottom: 10px;
    width: 100%;
    opacity: 1;
    visibility: visible;
    position: relative;
    z-index: 1;
  `;

  // Afficher un loader
  feed.innerHTML = '<div class="image-loader" style="text-align: center; padding: 40px; color: #666; font-size: 16px;">Chargement des images...</div>';

  // Timeout de secours
  const loadingTimeout = setTimeout(() => {
    if (feed.querySelector('.image-loader')) {
      feed.innerHTML = '<div class="image-error" style="text-align: center; padding: 40px; color: #e74c3c; font-size: 16px;">Chargement trop long - Réessayez</div>';
    }
  }, 10000);

  // Préchargement des images
  const loadImages = photos.map((src, index) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        console.log(`✅ Image ${index + 1}/${photos.length} chargée:`, src);
        resolve({src, status: 'loaded', index});
      };
      img.onerror = () => {
        console.error(`❌ Erreur image ${index + 1}:`, src);
        resolve({src, status: 'error', index});
      };
    });
  });

  Promise.all(loadImages).then(results => {
    clearTimeout(loadingTimeout);
    const loadedImages = results.filter(img => img.status === 'loaded');
    
    console.log(`📊 Images chargées: ${loadedImages.length}/${photos.length}`);
    
    if (loadedImages.length === 0) {
      feed.innerHTML = '<div class="image-error" style="text-align: center; padding: 40px; color: #e74c3c; font-size: 16px;">Aucune image n\'a pu être chargée</div>';
      return;
    }

    // Création du HTML avec styles inline et plus d'espacement
    feed.innerHTML = loadedImages.map((img, index) => `
      <div class="image-container" style="
        width: 90%;
        max-width: 800px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.2s ease;
        overflow: hidden;
        margin-bottom: 40px;
      ">
        <img 
          src="${img.src}" 
          alt="Photo du projet ${index + 1}" 
          loading="lazy"
          onclick="openImageModal('${img.src}')"
          style="
            width: 100%;
            height: auto;
            display: block;
            cursor: pointer;
            transition: transform 0.3s ease;
          "
          onmouseover="this.style.transform='scale(1.02)'"
          onmouseout="this.style.transform='scale(1)'"
        >
      </div>
    `).join('');

    // Animation progressive d'apparition
    setTimeout(() => {
      const containers = feed.querySelectorAll('.image-container');
      containers.forEach((container, index) => {
        setTimeout(() => {
          container.style.opacity = '1';
          container.style.transform = 'translateY(0)';
        }, index * 150);
      });
    }, 100);

    console.log('✅ Galerie initialisée avec succès');

  }).catch(error => {
    console.error('❌ Erreur de chargement des images:', error);
    feed.innerHTML = '<div class="image-error" style="text-align: center; padding: 40px; color: #e74c3c; font-size: 16px;">Erreur de chargement</div>';
  });
}

// Fonction d'initialisation du CD 3D - ISOLÉE et sécurisée
function init3DCD() {
  console.log('🎵 Initialisation CD 3D');
  
  setTimeout(() => {
    const box = document.querySelector('#box');
    if (box) {
      // Supprimer les anciens event listeners pour éviter les accumulations
      const newBox = box.cloneNode(true);
      box.parentNode.replaceChild(newBox, box);
      
      newBox.style.transformOrigin = 'center center';
      
      newBox.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
      });
      
      newBox.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
      });
      
      console.log('✅ CD 3D initialisé');
    }
  }, 150);
}

// Fonction pour extraire les URLs de photos du jsContent
function extractPhotoUrlsFromJS(jsContent) {
  if (!jsContent) return null;
  
  try {
    const match = jsContent.match(/initFullWidthFeed\(\[(.*?)\]\)/s);
    if (match && match[1]) {
      // Nettoyer et parser les URLs
      const urlsString = match[1]
        .replace(/\s+/g, ' ')
        .trim()
        .split(',')
        .map(url => url.trim().replace(/['"]/g, ''))
        .filter(url => url.length > 0);
      
      console.log('📸 URLs extraites:', urlsString);
      return urlsString;
    }
  } catch (error) {
    console.error('❌ Erreur parsing URLs:', error);
  }
  
  return null;
}

// Données des projets
const projects = [
  {
    id: 5,
    title: "Pochette CD 3D",
    shortDescription: "Animation 3D interactive",
    description: "Dans le cadre d'un projet à l'école, on devait créer la pochette d'un artiste. J'ai choisi la cover réalisée par une artiste, puis de la transformer en y ajoutant mes propres éléments. J'ai travaillé en mélangeant mes propres dessins et textures avec des retouches, en passant par Illustrator, InDesign et Photoshop. Je voulais trouver une façon originale de présenter ma cover. Comme je cherchais aussi à ajouter de la 3D à mon portfolio, ce projet a été l'occasion parfaite pour expérimenter la modélisation via le code et montrer une autre une version de la pochette.",
    image: "https://res.cloudinary.com/diai5g2u8/image/upload/v1756480876/mock_up_cd_azgypx.jpg",
    type: "interactive",
    
    htmlContent: `
      <div class="interactive-project-layout">
        <div class="cd-container">
          <section id="wrap">
            <div id="box">
              <div id="front"></div>
              <div id="cd"></div>
              <div id="back"></div>
              <div id="left"></div>
              <div id="right"></div>
              <div id="top"></div>
              <div id="bottom"></div>
            </div>  
          </section>
        </div>
        <div class="full-photo-feed"></div>
      </div>
    `,
    
    cssContent: `
      /* Styles CD 3D - NAMESPACE pour éviter les conflits */
      .project-detail[data-project-id="5"] {
        --box-color: #222;
      }
      
      .project-detail[data-project-id="5"] .interactive-project-layout {
        display: flex;
        flex-direction: column;
        align-items: center;
        
      }
      
      .project-detail[data-project-id="5"] #wrap {
        perspective: 800px;
        width: 280px;
        height: 280px;
        margin: 20px auto;
      }
      
      .project-detail[data-project-id="5"] #box {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        animation: spinaround 8s infinite linear;
      }
      
      .project-detail[data-project-id="5"] #box > div {
        position: absolute;
        width: 280px;
        height: 280px;
        overflow: hidden;
      }
      
      .project-detail[data-project-id="5"] div#front {
        background: var(--box-color);
        background-image: url('https://i.pinimg.com/736x/71/d0/ba/71d0baded86ebf7a90c6510543db5576.jpg');
        background-size: cover;
      }
      
      .project-detail[data-project-id="5"] div#back { 
        background: var(--box-color);
        transform: translateZ(-8px) rotateY(180deg);
        background-image: url('https://i.pinimg.com/736x/61/04/ad/6104adf2e7ed6afa9a73f386166368a1.jpg');
        background-size: cover;
      }
      
      .project-detail[data-project-id="5"] div#cd {
        transform: translateZ(-4px) translateX(100px);
        border-radius: 280px;
        box-shadow: 0 0 0 4px silver inset,
                    0 0 0 80px #f6f6f6 inset,
                    0 0 0 84px silver inset,
                    0 0 0 112px rgba(255,255,255,0.25) inset;
        background-image: url('https://i.pinimg.com/736x/44/d7/ef/44d7ef24279af92d74609d6885f6ffee.jpg');
        background-size: cover;
      }
      
      .project-detail[data-project-id="5"] div#left, 
      .project-detail[data-project-id="5"] div#right { 
        background: var(--box-color);
        width: 8px;
        transform: translateZ(-4px) rotateY(90deg);
        background-image: url('https://i.pinimg.com/736x/44/d7/ef/44d7ef24279af92d74609d6885f6ffee.jpg');
        background-size: cover;
      }
      
      .project-detail[data-project-id="5"] div#left { left: -4px; }
      .project-detail[data-project-id="5"] div#right { left: 272px; }
      
      .project-detail[data-project-id="5"] div#top, 
      .project-detail[data-project-id="5"] div#bottom { 
        background: var(--box-color);
        height: 8px;
        transform: translateZ(-4px) rotateX(90deg);
      }
      
      .project-detail[data-project-id="5"] div#top { top: -4px; }
      .project-detail[data-project-id="5"] div#bottom { top: 272px; }
      
      /* Espacement amélioré pour la description */
      .project-detail[data-project-id="5"] .project-description-container {
        margin-top: 120px;
        padding-top: 60px;
        border-top: 1px solid rgba(0,0,0,0.1);
      }
      
      @keyframes spinaround {
        to { transform: rotateY(360deg); }
      }

      @media (max-width: 768px) {
        .project-detail[data-project-id="5"] .interactive-project-layout {
          gap: 40px;
          margin-bottom: 80px;
        }
        
        .project-detail[data-project-id="5"] .project-description-container {
          margin-top: 80px;
          padding-top: 40px;
        }
        
        .project-detail[data-project-id="5"] #box {
          animation: none;
          transform: rotateY(30deg);
        }

        .project-detail[data-project-id="5"] #wrap {
          width: 220px;
          height: 220px;
        }
        
        .project-detail[data-project-id="5"] #box > div {
          width: 220px;
          height: 220px;
        }

        .project-detail[data-project-id="5"] div#left, 
        .project-detail[data-project-id="5"] div#right {
          width: 6px;
        }
        
        .project-detail[data-project-id="5"] div#left { left: -3px; }
        .project-detail[data-project-id="5"] div#right { left: 217px; }

        .project-detail[data-project-id="5"] div#cd {
          transform: translateZ(-3px) translateX(70px);
          box-shadow: 0 0 0 3px silver inset,
                      0 0 0 60px #f6f6f6 inset,
                      0 0 0 63px silver inset,
                      0 0 0 85px rgba(255,255,255,0.25) inset;
        }

        .project-detail[data-project-id="5"] div#top, 
        .project-detail[data-project-id="5"] div#bottom {
          display: none;
        }

        .project-detail[data-project-id="5"] #wrap {
          filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.3));
        }
      }
    `,
    
    jsContent: `
      initFullWidthFeed([
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1756480882/mockup_pochette1_nmwmia.jpg",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1755268100/mock_up_cd_iiiz03.jpg",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1756480837/mock_klwezr.png"
      ]);
      
      init3DCD();
    `
  },
  {
    id: 8,
    title: "Salle d'Arcade Memphis - Blender",
    shortDescription: "Modélisation 3D d'une salle d'arcade",
    description: "Dans le cadre d'un workshop d'une semaine, nous avons été amenés à créer un objet 3D inspiré du mouvement Memphis, j'ai donc réalisé une salle d'arcade. Une fusion entre le design Memphis (années 80) et l'esthétique rétro des salles d'arcade (années 70-80).",
    image: "https://res.cloudinary.com/diai5g2u8/image/upload/v1755268932/blender2_gqjowv.jpg",
    type: "interactive",
    
    htmlContent: `<div class="full-photo-feed"></div>`,
    
    cssContent: `
      .project-detail[data-project-id="8"] .full-photo-feed {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        padding: 40px 0 80px 0;
        margin-bottom: 120px;
      }

      .project-detail[data-project-id="8"] .full-photo-feed img {
        width: 90%;
        height: auto;
        display: block;
        margin-bottom: 20px;
      }
      
      .project-detail[data-project-id="8"] .project-description-container {
        margin-top: 100px;
        padding-top: 50px;
        border-top: 1px solid rgba(0,0,0,0.1);
      }
      
      @media (max-width: 768px) {
        .project-detail[data-project-id="8"] .full-photo-feed {
          padding: 30px 0 60px 0;
          margin-bottom: 80px;
        }
        
        .project-detail[data-project-id="8"] .project-description-container {
          margin-top: 60px;
          padding-top: 30px;
        }
      }
    `,

    jsContent: `
      initFullWidthFeed([
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1755268007/blende1_lzzmaq.jpg",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1755268007/1_sjrgpx.jpg",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1755268932/blender2_gqjowv.jpg",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1755268933/blender3_hzfgcb.jpg"
      ]);
    `
  },
  {
    id: 12,
    title: "Underdog",
    shortDescription: "Création de visuels et gestion de contenus web pour UnderDog.",
    description: "Lors de mon stage chez UnderDog, j'ai participé à la gestion des annonces en ligne : je prenais en photo les appareils, les détourais puis préparais leur mise en page avant publication. J'ai également conçu plusieurs visuels graphiques à l'aide d'Illustrator et contribué à la mise en ligne du site sur WordPress.",
    image: "https://res.cloudinary.com/diai5g2u8/image/upload/v1756575631/Capture_d_%C3%A9cran_2025-08-30_%C3%A0_19.21.13_ashakj.png",
    type: "interactive",
    
    htmlContent: `<div class="full-photo-feed"></div>`,
    
    cssContent: `
      .project-detail[data-project-id="12"] .full-photo-feed {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        padding: 40px 0 80px 0;
        margin-bottom: 120px;
      }

      .project-detail[data-project-id="12"] .full-photo-feed img {
        width: 90%;
        height: auto;
        display: block;
        margin-bottom: 20px;
      }
      
      .project-detail[data-project-id="12"] .project-description-container {
        margin-top: 100px;
        padding-top: 50px;
        border-top: 1px solid rgba(0,0,0,0.1);
      }
      
      @media (max-width: 768px) {
        .project-detail[data-project-id="12"] .full-photo-feed {
          padding: 30px 0 60px 0;
          margin-bottom: 80px;
        }
        
        .project-detail[data-project-id="12"] .project-description-container {
          margin-top: 60px;
          padding-top: 30px;
        }
      }
    `,

    jsContent: `
      initFullWidthFeed([
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1756575612/Capture_d_%C3%A9cran_2025-08-30_%C3%A0_19.20.38_llrmp6.png",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1756575603/Capture_d_%C3%A9cran_2025-08-30_%C3%A0_19.21.29_znjqca.png",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1756575611/Capture_d_%C3%A9cran_2025-08-30_%C3%A0_19.20.48_bnytps.png",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1756575603/Capture_d_%C3%A9cran_2025-08-30_%C3%A0_19.21.29_znjqca.png",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1756575617/Capture_d_%C3%A9cran_2025-08-30_%C3%A0_19.21.42_bsoqyl.png",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1756575618/Capture_d_%C3%A9cran_2025-08-30_%C3%A0_19.21.53_rnid5p.png",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1756575614/Capture_d_%C3%A9cran_2025-08-30_%C3%A0_19.20.57_zwqgxo.png",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1756575631/Capture_d_%C3%A9cran_2025-08-30_%C3%A0_19.21.13_ashakj.png",
      ]);
    `
  },
  {
    id: 1,
    title: "Court Métrage Pop Culture",
    shortDescription: "Court métrage sur la pop culture",
    description: "Pour mon projet de fin de semestre, j'ai exploré l'impact de la pop culture sur différentes personnes à travers une série d'interviews. L'objectif était de capturer comment les références culturelles - musique, films, séries, jeux vidéo - façonnent nos identités et nos interactions. Le projet se compose de deux volets : Un court-métrage documentaire (en cours de finalisation) présentant des témoignages authentiques, monté avec des animations After Effects recréant l'interface d'un iPod. Un site web conçu avec Cargo. Projet à suivre : le montage final sera partagé prochainement !",
    image: "https://i.pinimg.com/736x/f8/c5/5a/f8c55ae0bd8c62dd381306c580ab1fd4.jpg",
    youtubeUrl: "https://youtu.be/fqAScQgcX44",
    type: "video"
  },

  {
    id: 3,
    title: "Lecteur Musical",
    shortDescription: "Lecteur musical interactif",
    description: "Pour ce projet, j'ai conçu un lecteur de musique accessible, avec une interface inspirée des fenêtres d'ordinateur. J'ai développé ce lecteur en HTML, CSS et JavaScript, ce qui m'a permis d'explorer l'interactivité, cela ma permis d'améliorer mes compétences en front-end.",
    image: "https://i.pinimg.com/736x/a6/f6/a5/a6f6a56d4ccbda600e2b1b8eb2375b63.jpg",
    youtubeUrl: "https://youtu.be/w0Y67OLJz8U",
    type: "video"
  },
  {
    id: 6,
    title: "Le Fablab des Gobelins",
    shortDescription: "Découvrez le Fablab des Gobelins",
    description: "J'ai imaginé une manière simple de présenter notre FabLab à travers ce site : fab-blog.cargo.site. L'idée n'était pas de tout expliquer, mais de montrer concrètement ce qu'on y fait où les réalisations parlent d'elles-mêmes.",
    image: "https://i.pinimg.com/736x/8d/2c/07/8d2c07207fbcbbecd3345aab8edcea95.jpg",
    youtubeUrl: "https://youtu.be/EhgghqJtQA8",
    type: "video"
  },
  {
    id: 7,
    title: "Bannière Animée LinkedIn",
    shortDescription: "Animation de logo After Effects",
    description: "Pour ce projet je souhaitais mettre mon logo en avant, alors j'ai décidé de créer une bannière LinkedIn qui pourrait le mettre en valeur. C'est pour cela que j'ai créé cette bannière animée via After Effects. Ce projet m'a aidé à consolider mes bases en motion.",
    image: "https://res.cloudinary.com/diai5g2u8/image/upload/v1756579912/Capture_d_%C3%A9cran_2025-08-09_%C3%A0_16.31.28_oonmhe.png",
    youtubeUrl: "https://youtu.be/GEJAIFJmWhQ",
    type: "video"
  },
  {
    id: 10,
    title: "Photographie",
    shortDescription: "Découvrez mes photos",
    description: "La photographie est une de mes passions. C'est un moyen de m'exprimer et de partager ma vision du monde. Elle nourrit ma créativité, stimule mon imagination et m'encourage à explorer de nouveaux horizons.",
    image: "https://i.pinimg.com/564x/79/4b/0f/794b0fff82b5959d1cdc64c29fd88b57.jpg",
    type: "interactive",
    
    htmlContent: `<div class="full-photo-feed"></div>`,
    
    cssContent: `
      .project-detail[data-project-id="10"] .full-photo-feed {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        padding: 40px 0 80px 0;
        margin-bottom: 120px;
      }

      .project-detail[data-project-id="10"] .full-photo-feed img {
        width: 90%;
        height: auto;
        display: block;
        margin-bottom: 20px;
      }
      
      .project-detail[data-project-id="10"] .project-description-container {
        margin-top: 100px;
        padding-top: 50px;
        border-top: 1px solid rgba(0,0,0,0.1);
      }
      
      @media (max-width: 768px) {
        .project-detail[data-project-id="10"] .full-photo-feed {
          padding: 30px 0 60px 0;
          margin-bottom: 80px;
        }
        
        .project-detail[data-project-id="10"] .project-description-container {
          margin-top: 60px;
          padding-top: 30px;
        }
      }
    `,

    jsContent: `
      initFullWidthFeed([
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1755269114/IMG_3410_s2joqt.jpg",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1755269113/DSC05395_2_dpdazp.jpg",
        "https://res.cloudinary.com/diai5g2u8/image/upload/v1756470817/DSC05021_Original_pekuce.jpg"
      ]);
    `
  },

];

// Enhanced Photo Gallery Class - VERSION CORRIGÉE
class EnhancedPhotoGallery {
  constructor(container, photos, options = {}) {
    this.container = container;
    this.photos = photos || [];
    this.currentIndex = 0;
    this.options = {
      autoPlay: options.autoPlay || false,
      autoPlayDelay: options.autoPlayDelay || 3000,
      showThumbnails: options.showThumbnails !== false,
      showCounter: options.showCounter !== false,
      enableKeyboard: options.enableKeyboard !== false,
      enableSwipe: options.enableSwipe !== false,
      ...options
    };
    
    this.autoPlayInterval = null;
    this.isInitialized = false;
    
    if (this.photos.length > 0) {
      this.init();
    } else {
      console.error('Aucune photo fournie pour la galerie');
    }
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    console.log('Initialisation galerie améliorée');
  }
}

// Make Windows Draggable
function makeWindowDraggable(windowElement) {
  const header = windowElement.querySelector(".window-header");
  if (!header) return;
  
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === header || header.contains(e.target)) {
      isDragging = true;
      
      const allWindows = document.querySelectorAll(".window");
      allWindows.forEach(w => {
        if (w !== windowElement) {
          w.style.zIndex = "10";
        }
      });
      windowElement.style.zIndex = "20";
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      windowElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
  }

  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }

  header.addEventListener("mousedown", dragStart);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", dragEnd);
}

// Create Project Cards
function createProjectCards() {
  const projectsGrid = document.getElementById("projects-grid");
  if (!projectsGrid) {
    console.log('Grid de projets non trouvé');
    return;
  }

  projectsGrid.innerHTML = "";

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.dataset.id = project.id;
    
    card.innerHTML = `
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-info">
        <div class="project-title">${project.title}</div>
        <div class="project-short-description">${project.shortDescription}</div>
      </div>
    `;
    
    card.addEventListener("click", () => {
      showProjectDetail(project.id);
      // Fermer toutes les fenêtres sur mobile quand on ouvre un projet
      if (isMobileDevice()) {
        setTimeout(closeAllWindowsOnMobile, 100);
      }
    });
    projectsGrid.appendChild(card);
  });
  
  console.log('Cartes de projets créées:', projects.length);
}

// Create Project Detail Pages avec espacement amélioré
function createProjectDetailPages() {
  const container = document.getElementById("project-details");
  if (!container) {
    console.log('Container détails projets non trouvé');
    return;
  }

  container.innerHTML = "";

  projects.forEach(project => {
    const detailPage = document.createElement("div");
    detailPage.className = "project-detail";
    detailPage.id = `project-${project.id}`;
    detailPage.setAttribute('data-project-id', project.id);

    let mediaContent = "";
    
    if (project.type === "interactive") {
      const previewId = `preview-${project.id}`;
      
      mediaContent = `
        <div class="tab-content active" id="preview-tab">
          <div id="${previewId}" class="preview-container"></div>
        </div>
      `;
    }
    else if (project.type === "video") {
      if (project.videoFile) {
        mediaContent = `
          <div class="project-detail-video">
            <div class="project-detail-video-container">
              <video controls autoplay muted loop>
                <source src="${project.videoFile}" type="video/mp4">
                Votre navigateur ne supporte pas les vidéos HTML5.
              </video>
            </div>
          </div>
        `;
      } else if (project.youtubeUrl) {
        const youtubeId = extractYoutubeId(project.youtubeUrl);
        if (youtubeId) {
          mediaContent = `
            <div class="project-detail-video">
              <div class="project-detail-video-container">
                <iframe 
                  src="https://www.youtube.com/embed/${youtubeId}" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          `;
        }
      }
    }
    else if (project.type === "photo-gallery" && project.photos && project.photos.length > 0) {
      mediaContent = `<div id="gallery-${project.id}" class="enhanced-gallery-container"></div>`;
    }

    detailPage.innerHTML = `
      <button class="back-button" onclick="hideProjectDetail(${project.id})">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Retour
      </button>
      <div class="project-detail-content">
        <h1 class="project-detail-title">${project.title}</h1>
        ${mediaContent}
        <div class="project-description-container" style="margin-top: 120px; padding-top: 60px; border-top: 1px solid rgba(0,0,0,0.1);">
          <p class="project-detail-description">${project.description}</p>
        </div>
      </div>
    `;

    container.appendChild(detailPage);
  });
  
  console.log('Pages détails projets créées:', projects.length);
}

// Extract YouTube ID from URL
function extractYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Global modal function for images
function openImageModal(imageSrc) {
  console.log('🖼️ Ouverture modal image:', imageSrc);
  
  // Créer le style pour le modal
  const modalStyle = document.createElement('style');
  modalStyle.id = 'image-modal-styles';
  modalStyle.textContent = `
    .image-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-overlay {
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .modal-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
    }

    .modal-content img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }

    .modal-close {
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 30px;
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease;
    }

    .modal-close:hover {
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
    }
  `;
  
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <img src="${imageSrc}" alt="Image agrandie">
        <button class="modal-close" aria-label="Fermer">&times;</button>
      </div>
    </div>
  `;
  
  document.head.appendChild(modalStyle);
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  const closeModal = () => {
    modal.remove();
    modalStyle.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscape);
  };
  
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  
  const closeBtn = modal.querySelector('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');
  
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', handleEscape);
}

// FONCTION CORRIGÉE - Show Project Detail
function showProjectDetail(projectId) {
  console.log('🚀 Affichage détail projet:', projectId);
  
  // ÉTAPE 1: Nettoyer complètement l'état précédent
  if (currentProjectId !== null && currentProjectId !== projectId) {
    cleanupPreviousProject();
  }
  
  const detailPage = document.getElementById(`project-${projectId}`);
  if (!detailPage) {
    console.error('❌ Page détail non trouvée pour le projet:', projectId);
    return;
  }

  // ÉTAPE 2: Cacher toutes les autres pages de détail
  const allDetailPages = document.querySelectorAll('.project-detail');
  allDetailPages.forEach(page => {
    if (page.id !== `project-${projectId}`) {
      page.classList.remove('active');
    }
  });

  // ÉTAPE 3: Afficher la page courante
  detailPage.classList.add("active");
  document.body.style.overflow = "hidden";
  
  // Mettre à jour le projet courant
  currentProjectId = projectId;
  
  const project = projects.find(p => p.id === projectId);
  if (!project) {
    console.error('❌ Projet non trouvé:', projectId);
    return;
  }

  // ÉTAPE 4: Gestion spécifique selon le type de projet
  if (project.type === "interactive") {
    console.log('🎮 Initialisation projet interactif:', project.title);
    
    setTimeout(() => {
      let container = document.getElementById(`preview-${projectId}`);
      
      // Si le conteneur n'existe pas, le créer
      if (!container) {
        console.log('📦 Création du conteneur preview pour projet:', projectId);
        const detailContent = detailPage.querySelector('.project-detail-content');
        if (detailContent) {
          const previewDiv = document.createElement('div');
          previewDiv.className = 'tab-content active';
          previewDiv.id = 'preview-tab';
          previewDiv.innerHTML = `<div id="preview-${projectId}" class="preview-container"></div>`;
          
          // Insérer avant la description
          const descContainer = detailContent.querySelector('.project-description-container');
          if (descContainer) {
            detailContent.insertBefore(previewDiv, descContainer);
          } else {
            detailContent.appendChild(previewDiv);
          }
          
          container = document.getElementById(`preview-${projectId}`);
        }
      }
      
      if (container && project.htmlContent) {
        console.log('📝 Injection contenu HTML');
        
        // Nettoyer le conteneur avant injection
        container.innerHTML = '';
        container.style.cssText = '';
        
        // Injecter le HTML
        container.innerHTML = project.htmlContent;
        
        // ÉTAPE 5: Injecter le CSS de manière isolée
        if (project.cssContent) {
          const existingStyle = document.querySelector(`#project-${projectId}-styles`);
          if (existingStyle) {
            existingStyle.remove();
          }
          
          const style = document.createElement("style");
          style.id = `project-${projectId}-styles`;
          style.textContent = project.cssContent;
          document.head.appendChild(style);
          
          // Stocker la référence pour le nettoyage
          activeProjectStyles.set(projectId, style);
        }
        
        // ÉTAPE 6: Exécuter le JavaScript après un délai suffisant
        if (project.jsContent) {
          setTimeout(() => {
            console.log('⚡ Exécution JavaScript du projet');
            try {
              // S'assurer que toutes les fonctions globales sont disponibles
              window.initFullWidthFeed = initFullWidthFeed;
              window.init3DCD = init3DCD;
              
              // Debug spécial pour le projet Photographie
              if (projectId === 10) {
                console.log('🔍 DEBUG Projet Photographie - Vérification conteneur galerie');
                const photoFeed = document.querySelector('.full-photo-feed');
                console.log('Conteneur galerie trouvé:', !!photoFeed);
                if (photoFeed) {
                  console.log('État du conteneur:', {
                    innerHTML: photoFeed.innerHTML.length,
                    display: getComputedStyle(photoFeed).display,
                    visibility: getComputedStyle(photoFeed).visibility
                  });
                }
              }
              
              // Exécuter le code dans le contexte global
              const executeCode = new Function(project.jsContent);
              executeCode();
              
              console.log('✅ JavaScript exécuté avec succès');
              
              // Vérification post-exécution pour le projet Photographie
              if (projectId === 10) {
                setTimeout(() => {
                  const photoFeed = document.querySelector('.full-photo-feed');
                  if (photoFeed) {
                    console.log('🔍 État final galerie Photographie:', {
                      hasContent: photoFeed.innerHTML.length > 0,
                      isVisible: getComputedStyle(photoFeed).visibility !== 'hidden',
                      display: getComputedStyle(photoFeed).display
                    });
                  }
                }, 500);
              }
              
            } catch (error) {
              console.error('❌ Erreur lors de l\'exécution du JavaScript:', error);
            }
          }, projectId === 10 ? 500 : 300); // Délai plus long pour le projet Photographie
        }
      } else {
        console.error('❌ Conteneur ou contenu HTML manquant pour projet:', projectId);
      }
    }, 150); // Délai pour s'assurer que la page est affichée
  }
  
  console.log('✅ Projet affiché:', project.title);
}

// FONCTION CORRIGÉE - Hide Project Detail
function hideProjectDetail(projectId) {
  console.log('🔙 Masquage détail projet:', projectId);
  
  const detailPage = document.getElementById(`project-${projectId}`);
  if (!detailPage) return;

  // Cacher la page
  detailPage.classList.remove("active");
  document.body.style.overflow = "";
  
  // Nettoyer complètement l'état du projet
  cleanupPreviousProject();
  
  // Reset du projet courant
  currentProjectId = null;
  
  console.log('✅ Projet fermé et nettoyé');
}

// Make global functions available
window.showProjectDetail = showProjectDetail;
window.hideProjectDetail = hideProjectDetail;
window.openImageModal = openImageModal;
window.EnhancedPhotoGallery = EnhancedPhotoGallery;
window.initFullWidthFeed = initFullWidthFeed;
window.init3DCD = init3DCD;

// Gestion des événements de redimensionnement pour mobile
window.addEventListener('resize', function() {
  if (isMobileDevice()) {
    closeAllWindowsOnMobile();
  }
});

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log('🚀 DOM chargé, initialisation...');
  
  // Fermer toutes les fenêtres si on est sur mobile dès le chargement
  if (isMobileDevice()) {
    setTimeout(closeAllWindowsOnMobile, 500);
  } else {
    // Show all window stacks seulement sur desktop
    const allStacks = document.querySelectorAll(".about-window-stack, .search-window-stack, .project-window-stack, .cv-window-stack, .contact-window-stack");
    allStacks.forEach(stack => {
      if (stack) stack.style.display = "block";
    });

    // Display all windows in each stack
    const aboutStack = document.querySelector(".about-window-stack");
    if (aboutStack) {
      aboutStack.querySelectorAll(".about-window").forEach((win, index) => {
        win.style.display = "block";
        win.style.zIndex = 10 + index;
      });
    }

    const projectStack = document.querySelector(".project-window-stack");
    if (projectStack) {
      projectStack.querySelectorAll(".projects-window").forEach((win, index) => {
        win.style.display = "block";
        win.style.zIndex = 10 + index;
      });
    }

    const cvStack = document.querySelector(".cv-window-stack");
    if (cvStack) {
      cvStack.querySelectorAll(".cv-window").forEach((win, index) => {
        win.style.display = "block";
        win.style.zIndex = 10 + index;
      });
    }

    const contactStack = document.querySelector(".contact-window-stack");
    if (contactStack) {
      contactStack.querySelectorAll(".contact-window").forEach((win, index) => {
        win.style.display = "block";
        win.style.zIndex = 10 + index;
      });
    }

    const searchStack = document.querySelector(".search-window-stack");
    if (searchStack) {
      searchStack.querySelectorAll(".search-window").forEach((win, index) => {
        win.style.display = "block";
        win.style.zIndex = 10 + index;
      });
    }

    // Make first project window top priority
    const firstProjectWindow = document.querySelector(".project-window-stack .projects-window");
    if (firstProjectWindow) {
      firstProjectWindow.style.zIndex = "20";
    }
  }

  // Make windows draggable (seulement sur desktop)
  if (!isMobileDevice()) {
    const windows = document.querySelectorAll(".window, .section-window, .about-window, .projects-window, .cv-window, .contact-window, .search-window");
    windows.forEach(makeWindowDraggable);
  }

  // Folder click functionality
  const folders = document.querySelectorAll(".folder");
  folders.forEach(folder => {
    folder.addEventListener("click", () => {
      // Sur mobile, ne pas ouvrir les fenêtres via les dossiers
      if (isMobileDevice()) {
        return;
      }
      
      const section = folder.dataset.section;
      
      const stacks = {
        'about': '.about-window-stack',
        'projects': '.project-window-stack', 
        'cv': '.cv-window-stack',
        'contact': '.contact-window-stack'
      };
      
      const stackSelector = stacks[section];
      if (stackSelector) {
        const stack = document.querySelector(stackSelector);
        if (stack) {
          stack.style.display = "block";
          const windows = stack.querySelectorAll(".window");
          windows.forEach((win, index) => {
            win.style.display = "block";
            win.style.zIndex = 3 - index;
          });
        }
      }
    });
  });

  // Close button functionality
  const closeButtons = document.querySelectorAll(".close-button");
  closeButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      
      const windowElement = button.closest(".window");
      if (windowElement) {
        const stack = windowElement.closest(".window-stack");
        
        if (stack) {
          stack.style.display = "none";
          stack.querySelectorAll(".window").forEach(win => {
            win.style.display = "none";
          });
        } else {
          windowElement.style.display = "none";
        }
      }
    });
  });

  // Initialize project components
  createProjectCards();
  createProjectDetailPages();

  // CV download functionality
  const downloadBtn = document.querySelector(".download-cv-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", (e) => {
      console.log("CV téléchargé");
      alert("Le CV a été téléchargé!");
    });
  }

  // Folder hover effects (seulement sur desktop)
  if (!isMobileDevice()) {
    folders.forEach(folder => {
      folder.addEventListener("mouseenter", () => {
        const icon = folder.querySelector(".folder-icon");
        if (icon) {
          icon.style.transform = "scale(1.1)";
        }
      });

      folder.addEventListener("mouseleave", () => {
        const icon = folder.querySelector(".folder-icon");
        if (icon) {
          icon.style.transform = "scale(1)";
        }
      });
    });
  }
  
  console.log('✅ Initialisation terminée');
});

// Animation au scroll
window.addEventListener('scroll', function() {
  const gallery = document.querySelector('.project-gallery');
  if (gallery) {
    gallery.classList.toggle('scrolling-effect', window.scrollY > 100);
  }
});
