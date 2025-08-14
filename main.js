// Helper Functions
function escapeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

const projects = [
  {
    id: 5,
    title: "Pochette CD 3D",
    shortDescription: "Animation 3D interactive",
    description: "Dans le cadre d'un projet à l'école, on devait créer la pochette d'un artiste. J'ai choisi la cover réalisée par une artiste, puis de la transformer en y ajoutant mes propres éléments. J'ai travaillé en mélangeant mes propres dessins et textures avec des retouches, en passant par Illustrator, InDesign et Photoshop. Je voulais trouver une façon originale de présenter ma cover. Comme je cherchais aussi à ajouter de la 3D à mon portfolio, ce projet a été l'occasion parfaite pour expérimenter la modélisation via le code et montrer une autre une version de la pochette.",
    image: "https://i.pinimg.com/736x/44/d7/ef/44d7ef24279af92d74609d6885f6ffee.jpg",
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

    
    
    
    /* CD 3D Styles */
    :root {
      --box-color: #222;
    }
    
    #wrap {
      perspective: 800px;
      width: 280px;
      height: 280px;
      margin: 55px 0 auto;
    }
    
    #box {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      animation: spinaround 8s infinite linear;
    }
    
    #box > div {
      position: absolute;
      width: 280px;
      height: 280px;
      overflow: hidden;
    }
    
    div#front {
      background: var(--box-color);
      background-image: url('https://i.pinimg.com/736x/71/d0/ba/71d0baded86ebf7a90c6510543db5576.jpg');
      background-size: cover;
    }
    
    div#back { 
      background: var(--box-color);
      transform: translateZ(-8px) rotateY(180deg);
      background-image: url('https://i.pinimg.com/736x/61/04/ad/6104adf2e7ed6afa9a73f386166368a1.jpg');
      background-size: cover;
    }
    
    div#cd {
      transform: translateZ(-4px) translateX(100px);
      border-radius: 280px;
      box-shadow: 0 0 0 4px silver inset,
                  0 0 0 80px #f6f6f6 inset,
                  0 0 0 84px silver inset,
                  0 0 0 112px rgba(255,255,255,0.25) inset;
      background-image: url('https://i.pinimg.com/736x/44/d7/ef/44d7ef24279af92d74609d6885f6ffee.jpg');
      background-size: cover;
    }
    
    div#left, div#right { 
      background: var(--box-color);
      width: 8px;
      transform: translateZ(-4px) rotateY(90deg);
      background-image: url('https://i.pinimg.com/736x/44/d7/ef/44d7ef24279af92d74609d6885f6ffee.jpg');
      background-size: cover;
    }
    
    div#left { left: -4px; }
    div#right { left: 272px; }
    
    div#top, div#bottom { 
      background: var(--box-color);
      height: 8px;
      transform: translateZ(-4px) rotateX(90deg);
    }
    
    div#top { top: -4px; }
    div#bottom { top: 272px; }
    
    @keyframes spinaround {
      to { transform: rotateY(360deg); }
    }
    
  
/* Media Queries pour le responsive */
@media (max-width: 992px) {
  .interactive-project-layout {
    flex-direction: column;
    padding: 20px;
  }
  
  .cd-container-wrapper,
  .project-gallery-wrapper {
    flex: 0 0 100%;
    width: 100%;
    padding: 0;
    margin-bottom: 40px;
    justify-content: center; /* Centre horizontalement */
    align-items: center;    
  }
  
  #wrap {
    margin-bottom: 30px;
  }
}

    

    @media (max-width: 576px) {
      #box {
        animation: none;
        transform: rotateY(30deg);
      }

      #wrap {
        width: 220px;
        height: 220px;
      }
      
      #box > div {
        width: 220px;
        height: 220px;
      }

      div#left, div#right {
        width: 6px;
        background: var(--box-color);
        display: block !important;
      }
      
      div#left { left: -3px; }
      div#right { left: 217px; }

      div#cd {
        transform: translateZ(-3px) translateX(70px);
        box-shadow: 0 0 0 3px silver inset,
                    0 0 0 60px #f6f6f6 inset,
                    0 0 0 63px silver inset,
                    0 0 0 85px rgba(255,255,255,0.25) inset;
      }

      div#top, div#bottom {
        display: none;
      }

      #wrap {
        filter: drop-shadow(3px 3px 6px rgba(0,0,0,0.3));
      }
    }


  body, html {
    margin: 0;
    padding: 0;
    gap: 20%
  }

  .full-photo-feed {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .full-photo-feed img {
    width: 100%;
    height: auto;
    display: block;
  }
`,
    jsContent: `
    function init3DCD() {
      setTimeout(() => {
        const box = document.querySelector('#box');
        if (box) {
          box.style.transformOrigin = 'center center';
          box.addEventListener('mouseenter', () => {
            box.style.animationPlayState = 'paused';
          });
          box.addEventListener('mouseleave', () => {
            box.style.animationPlayState = 'running';
          });
        }
      }, 100);
    }
  
    initFullWidthFeed([
      "mockup pochette1.jpg",
      "mock up cd.jpg",
      "mock.png",
    ]);
  
    init3DCD();
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
    id: 2,
    title: "Salle d'Arcade Memphis - Blender",
    shortDescription: "Modélisation 3D d'une salle d'arcade",
    description: "Dans le cadre d'un workshop d'une semaine, nous avons été amenés à créer un objet 3D inspiré du mouvement Memphis, j'ai donc réalisé une salle d'arcade. Une fusion entre le design Memphis (années 80) et l'esthétique rétro des salles d'arcade (années 70-80).",
    image: "https://i.pinimg.com/736x/95/26/ab/9526ab794482e94d1ea4adaa0febac98.jpg",
    type: "interactive" ,
    htmlContent: `

    <div class="full-photo-feed"></div>
    </div>
    `,
    cssContent: `
      body, html {
      margin: 0;
      padding: 0;
      }

      .full-photo-feed {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px; /* Espace augmenté entre les photos */
      }

      .full-photo-feed img {
      width: 90%;
      height: auto;
      display: block;
      }
      `,
      jsContent: `
      function initFullWidthFeed(photos) {
      const feed = document.querySelector('.full-photo-feed');
      if (!feed || !Array.isArray(photos)) return;

      feed.innerHTML = photos.map(src => 
        \`<img src="\${src}" alt="Photo du projet">\`
      ).join('');
      }



      initFullWidthFeed([
      "blende1.jpeg",
      "blender1.jpeg",
      "blender2.jpeg",
      "blender3.jpeg",

           
      ]);

      init3DCD();
      `
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
    id: 4,
    title: "Photographie",
    shortDescription: "Découvrez mes photos",
    description: "La photographie est une de mes passions. C'est un moyen de m'exprimer et de partager ma vision du monde. Elle nourrit ma créativité, stimule mon imagination et m'encourage à explorer de nouveaux horizons.",
    image: "https://i.pinimg.com/564x/79/4b/0f/794b0fff82b5959d1cdc64c29fd88b57.jpg",
    type: "interactive",
   // HTML dans htmlContent
htmlContent: `

<div class="full-photo-feed"></div>
</div>
`,

// CSS dans cssContent
cssContent: `
body, html {
margin: 0;
padding: 0;
}

.full-photo-feed {
display: flex;
flex-direction: column;
align-items: center;
gap: 20px; /* Espace augmenté entre les photos */
}

.full-photo-feed img {
width: 90%;
height: auto;
display: block;
}
`,

// JS dans jsContent
jsContent: `
  initFullWidthFeed( [
      "https://i.pinimg.com/736x/87/e5/ce/87e5ce65acde203b14024090af10d015.jpg",
      "https://i.pinimg.com/736x/89/8e/8b/898e8b2fab7726fd3d363bf4da05d0b2.jpg",
      "https://i.pinimg.com/736x/38/9e/ee/389eee4f1d0006132a69325dc767a5bc.jpg",
      "https://i.pinimg.com/736x/eb/c7/54/ebc75472fd5db45d314b9b7930b8c9a7.jpg",
      "https://i.pinimg.com/736x/ef/db/b0/efdbb0a9663caf99bd4dbab607ddb76a.jpg",
      "https://i.pinimg.com/736x/4a/30/d3/4a30d33d0a5dbb596748268aac89c9c1.jpg",
      "https://i.pinimg.com/474x/39/06/b2/3906b24eb56c586598f8525a9e9d59f2.jpg",
      "https://i.pinimg.com/736x/46/80/a3/4680a34b53f0826916f6f64810567979.jpg",
      "https://i.pinimg.com/736x/2f/c8/db/2fc8dbfbc502ae04291b59d613898c20.jpg",
      "https://i.pinimg.com/736x/bf/17/2d/bf172d76f3c9259386e41d5b25f969f6.jpg",
      "https://i.pinimg.com/736x/37/a8/ba/37a8ba1aceed2f170305d2ced22da4f8.jpg",
      "https://i.pinimg.com/736x/53/b9/a6/53b9a67e07bda74411dff4cc28e3a1eb.jpg"
    ]);
`

  },
  {
    id: 7,
    title: "Bannière Animée LinkedIn",
    shortDescription: "Animation de logo After Effects",
    description: "Pour ce projet je souhaitais mettre mon logo en avant, alors j'ai décidé de créer une bannière LinkedIn qui pourrait le mettre en valeur. C'est pour cela que j'ai créé cette bannière animée via After Effects. Ce projet m'a aidé à consolider mes bases en motion.",
    image: "https://i.pinimg.com/736x/8d/2c/07/8d2c07207fbcbbecd3345aab8edcea95.jpg",
    youtubeUrl: "https://youtu.be/GEJAIFJmWhQ",
    type: "video"
  }  
];




function initFullWidthFeed(photos) {
  const feed = document.querySelector('.full-photo-feed');
  if (!feed || !Array.isArray(photos)) return;

  // Nouvelle version avec lazy loading
  feed.innerHTML = photos.map(src => 
    `<img src="" data-src="${src}" alt="Photo du projet" loading="lazy" class="lazy-image">`
  ).join('');

  // Observer pour le lazy loading
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy-image');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    document.querySelectorAll('.lazy-image').forEach(lazyImage => {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
    document.querySelectorAll('.lazy-image').forEach(lazyImage => {
      lazyImage.src = lazyImage.dataset.src;
    });
  }
}

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
    
    console.log('Initialisation de la galerie avec', this.photos.length, 'photos');
    this.createGalleryHTML();
    this.bindEvents();
    this.isInitialized = true;
    
    if (this.options.autoPlay) {
      this.startAutoPlay();
    }
    
    if (this.options.enableSwipe) {
      this.enableSwipeGestures();
    }
  }

  createGalleryHTML() {
    if (!this.container) {
      return;
    }

    this.container.innerHTML = `
      <div class="enhanced-gallery">
        <div class="gallery-main">
          <div class="gallery-display">
          </div>
        </div>
        
        ${this.options.showCounter ? `
        
        ` : ''}
        
        ${this.options.showThumbnails && this.photos.length > 1 ? `
          <div class="gallery-thumbnails">
            ${this.photos.map((photo, index) => `
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;

    // Ajouter les styles si ils ne sont pas déjà présents
    if (!document.querySelector('#enhanced-gallery-styles')) {
      const style = document.createElement('style');
      style.id = 'enhanced-gallery-styles';
      style.textContent = `
        . body, html {
          margin: 0;
          padding: 0;
        }

  .full-photo-feed {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .full-photo-feed img {
    width: 100%;
    height: auto;
    display: block;
  }
      `;
      document.head.appendChild(style);
    }
  }

  
  handleKeydown(e) {
    // Vérifier que la galerie est visible
    if (!this.container.offsetParent) return;
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.previousPhoto();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.nextPhoto();
    }
    if (e.key === 'Escape') {
      this.closeFullscreen();
    }
  }

  startAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    
    this.autoPlayInterval = setInterval(() => {
      this.nextPhoto();
    }, this.options.autoPlayDelay);
    
    console.log('AutoPlay démarré');
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
      console.log('AutoPlay mis en pause');
    }
  }

  resumeAutoPlay() {
    if (this.options.autoPlay && !this.autoPlayInterval) {
      this.startAutoPlay();
    }
  }

  enableSwipeGestures() {
    let startX = 0;
    let startY = 0;

    const gallery = this.container.querySelector('.gallery-main');
    if (!gallery) return;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const deltaX = startX - endX;
      const deltaY = startY - endY;

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.nextPhoto();
        } else {
          this.previousPhoto();
        }
      }
    };

    gallery.addEventListener('touchstart', handleTouchStart, { passive: true });
    gallery.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  openFullscreen() {
    console.log('Ouverture fullscreen');
    
    const modal = document.createElement('div');
    modal.className = 'gallery-fullscreen-modal';
    modal.innerHTML = `
      <div class="fullscreen-overlay">
        <img src="${this.photos[this.currentIndex]}" alt="Photo en plein écran">
        <button class="fullscreen-close">&times;</button>
        <button class="fullscreen-prev">‹</button>
        <button class="fullscreen-next">›</button>
        <div class="fullscreen-counter">${this.currentIndex + 1} / ${this.photos.length}</div>
      </div>
    `;

    c

    document.head.appendChild(style);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Event listeners for fullscreen modal
    const closeBtn = modal.querySelector('.fullscreen-close');
    const prevBtn = modal.querySelector('.fullscreen-prev');
    const nextBtn = modal.querySelector('.fullscreen-next');
    const overlay = modal.querySelector('.fullscreen-overlay');

    const closeModal = () => {
      modal.remove();
      style.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', this.fullscreenKeyHandler);
    };

    this.fullscreenKeyHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.fullscreenPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.fullscreenNext();
      }
    };

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', () => this.fullscreenPrev());
    nextBtn.addEventListener('click', () => this.fullscreenNext());
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', this.fullscreenKeyHandler);
    this.fullscreenModal = { modal, style, closeModal };
  }

  closeFullscreen() {
    if (this.fullscreenModal) {
      this.fullscreenModal.closeModal();
      this.fullscreenModal = null;
    }
  }

  fullscreenPrev() {
    this.previousPhoto();
    this.updateFullscreenImage();
  }

  fullscreenNext() {
    this.nextPhoto();
    this.updateFullscreenImage();
  }

  updateFullscreenImage() {
    if (this.fullscreenModal) {
      const img = this.fullscreenModal.modal.querySelector('img');
      const counter = this.fullscreenModal.modal.querySelector('.fullscreen-counter');
      
      if (img) {
        img.src = this.photos[this.currentIndex];
        img.alt = `Photo ${this.currentIndex + 1}`;
      }
      
      if (counter) {
        counter.textContent = `${this.currentIndex + 1} / ${this.photos.length}`;
      }
    }
  }

  destroy() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
    }
    
    this.closeFullscreen();
    this.isInitialized = false;
  }
}

// Make Windows Draggable
function makeWindowDraggable(window) {
  const header = window.querySelector(".window-header");
  if (!header) return;
  
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  header.addEventListener("mousedown", dragStart);
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", dragEnd);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === header || header.contains(e.target)) {
      isDragging = true;
      
      const allWindows = document.querySelectorAll(".window");
      allWindows.forEach(w => {
        if (w !== window) {
          w.style.zIndex = "10";
        }
      });
      window.style.zIndex = "20";
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, window);
    }
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
  }

  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }
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
    
    card.addEventListener("click", () => showProjectDetail(project.id));
    projectsGrid.appendChild(card);
  });
  
  console.log('Cartes de projets créées:', projects.length);
}

// Create Project Detail Pages
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
        <div class="project-description-container">
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
  console.log('Ouverture modal image:', imageSrc);
  
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
  

  
  document.head.appendChild(style);
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  const closeModal = () => {
    modal.remove();
    style.remove();
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

// Show Project Detail
function showProjectDetail(projectId) {
  console.log('Affichage détail projet:', projectId);
  
  const detailPage = document.getElementById(`project-${projectId}`);
  if (!detailPage) {
    console.error('Page détail non trouvée pour le projet:', projectId);
    return;
  }

  detailPage.classList.add("active");
  document.body.style.overflow = "hidden";
  
  const project = projects.find(p => p.id === projectId);
  if (!project) {
    console.error('Projet non trouvé:', projectId);
    return;
  }

  // Gestion des projets interactifs (comme le CD 3D)
  if (project.type === "interactive") {
    setTimeout(() => {
      const container = document.getElementById(`preview-${projectId}`);
      
      if (container && project.htmlContent) {
        console.log('Injection contenu HTML pour projet interactif');
        container.innerHTML = project.htmlContent;
        
        // Injecter le CSS
        if (project.cssContent) {
          const existingStyle = document.querySelector(`#project-${projectId}-styles`);
          if (existingStyle) {
            existingStyle.remove();
          }
          
          const style = document.createElement("style");
          style.id = `project-${projectId}-styles`;
          style.textContent = project.cssContent;
          document.head.appendChild(style);
        }
        
        // Exécuter le JavaScript avec un délai pour s'assurer que le HTML est rendu
        if (project.jsContent) {
          setTimeout(() => {
            console.log('Exécution JavaScript pour projet interactif');
            try {
              // Créer une fonction pour exécuter le code dans le bon contexte
              const executeCode = new Function(project.jsContent);
              executeCode();
            } catch (error) {
              console.error('Erreur lors de l\'exécution du JavaScript:', error);
            }
          }, 200);
        }
      }
    }, 100);
  }
  
  // Gestion des galeries photos
  else if (project.type === "photo-gallery" && project.photos && project.photos.length > 0) {
    setTimeout(() => {
      const galleryContainer = document.getElementById(`gallery-${projectId}`);
      if (galleryContainer) {
        console.log('Initialisation galerie photos pour projet:', projectId);
        
        // Détruire la galerie existante si elle existe
        if (galleryContainer.galleryInstance) {
          galleryContainer.galleryInstance.destroy();
        }
        
        // Créer nouvelle instance
        const gallery = new EnhancedPhotoGallery(galleryContainer, project.photos, {
          autoPlay: true,
          autoPlayDelay: 4000,
          enableKeyboard: true,
          enableSwipe: true
        });
        
        // Stocker l'instance pour pouvoir la détruire plus tard
        galleryContainer.galleryInstance = gallery;
      }
    }, 200);
  }
}

// Hide Project Detail
function hideProjectDetail(projectId) {
  console.log('Masquage détail projet:', projectId);
  
  const detailPage = document.getElementById(`project-${projectId}`);
  if (!detailPage) return;

  detailPage.classList.remove("active");
  document.body.style.overflow = "";
  
  // Arrêter les vidéos
  const videos = detailPage.querySelectorAll("video");
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
  
  // Détruire les galeries
  const galleryContainers = detailPage.querySelectorAll('.enhanced-gallery-container');
  galleryContainers.forEach(container => {
    if (container.galleryInstance) {
      container.galleryInstance.destroy();
      container.galleryInstance = null;
    }
  });
  
  // Supprimer les styles du projet
  const projectStyles = document.querySelector(`#project-${projectId}-styles`);
  if (projectStyles) {
    projectStyles.remove();
  }
}

// Make global functions available
window.showProjectDetail = showProjectDetail;
window.hideProjectDetail = hideProjectDetail;
window.openImageModal = openImageModal;
window.EnhancedPhotoGallery = EnhancedPhotoGallery;

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  console.log('DOM chargé, initialisation...');
  
  // Popup functionality
  setTimeout(function() {
    const popup = document.getElementById("popup");
    if (popup) {
      popup.style.display = "flex";
    }
  }, Math.floor(Math.random() * (47000 - 34000) + 26000));

  const closeBtn = document.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", function() {
      const popup = document.getElementById("popup");
      if (popup) {
        popup.style.display = "none";
      }
    });
  }

  // Show all window stacks
  const allStacks = document.querySelectorAll(".about-window-stack, .search-window-stack, .project-window-stack, .cv-window-stack, .contact-window-stack");
  allStacks.forEach(stack => {
    stack.style.display = "block";
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

  // Make windows draggable
  const windows = document.querySelectorAll(".window, .section-window, .about-window, .projects-window, .cv-window, .contact-window, .search-window");
  windows.forEach(makeWindowDraggable);

  // Folder click functionality
  const folders = document.querySelectorAll(".folder");
  folders.forEach(folder => {
    folder.addEventListener("click", () => {
      const section = folder.dataset.section;
      
      if (section === "about") {
        const stack = document.querySelector(".about-window-stack");
        if (stack) {
          stack.style.display = "block";
          stack.querySelectorAll(".about-window").forEach((win, index) => {
            win.style.display = "block";
            win.style.zIndex = 3 - index;
          });
        }
      } 
      else if (section === "projects") {
        const stack = document.querySelector(".project-window-stack");
        if (stack) {
          stack.style.display = "block";
          stack.querySelectorAll(".projects-window").forEach((win, index) => {
            win.style.display = "block";
            win.style.zIndex = 3 - index;
          });
        }
      }
      else if (section === "cv") {
        const stack = document.querySelector(".cv-window-stack");
        if (stack) {
          stack.style.display = "block";
          stack.querySelectorAll(".cv-window").forEach((win, index) => {
            win.style.display = "block";
            win.style.zIndex = 3 - index;
          });
        }
      }
      else if (section === "contact") {
        const stack = document.querySelector(".contact-window-stack");
        if (stack) {
          stack.style.display = "block";
          stack.querySelectorAll(".contact-window").forEach((win, index) => {
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
      
      const windowElement = button.closest(".section-window, .search-window, .about-window, .projects-window, .cv-window, .contact-window");
      if (windowElement) {
        const stack = windowElement.closest("[class$='-window-stack']") || windowElement.closest(".window-stack");
        
        if (stack) {
          stack.style.display = "none";
          stack.querySelectorAll(".window, .section-window, .search-window, .about-window, .projects-window, .cv-window, .contact-window").forEach(win => {
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

  // Folder hover effects
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
  
  console.log('Initialisation terminée');
});

// Animation au scroll
window.addEventListener('scroll', function() {
  const gallery = document.querySelector('.project-gallery');
  if (gallery) {
    gallery.classList.toggle('scrolling-effect', window.scrollY > 100);
  }
});

