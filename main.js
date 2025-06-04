// Helper Functions
function escapeHtml(html) {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }
  
  // Project Data
  const projects = [
    {
      id: 1,
      title: "Court Métrage Pop Culture",
      shortDescription: "Court métrage sur la pop culture",
      description: "Pour mon projet de fin de semestre, j'ai exploré l'impact de la pop culture sur différentes personnes à travers une série d'interviews. L'objectif ? Capturer comment les références culturelles - musique, films, séries, jeux vidéo - façonnent nos identités et nos interactions au quotidien. Le projet se compose de deux volets : Un court-métrage documentaire (en cours de finalisation) présentant des témoignages authentiques, monté avec des animations After Effects recréant l'interface d'un iPod. Un site web conçu avec Cargo. Projet à suivre : le montage final sera partagé prochainement !",
      image: "https://i.pinimg.com/736x/f8/c5/5a/f8c55ae0bd8c62dd381306c580ab1fd4.jpg",
      youtubeUrl: "https://youtu.be/fqAScQgcX44",
      type: "video"
    },
    {
      id: 3,
      title: "Le Fablab des Gobelins",
      shortDescription: "Découvrez le Fablab des Gobelins",
      description: "J'ai imaginé une manière simple et parlante de présenter notre FabLab à travers ce site : fab-blog.cargo.site. L'idée n'était pas de tout expliquer, mais de montrer concrètement ce qu'on y fait - des impressions 3D aser précises, uitive où les réalisations parlent d'elles-mêmes. Pas de longs discours, juste l'essentiel : des visuels qui donnent envie de créer, des projets qui inspirent, le tout dans une interface épurée qui laisse la place à l'imagination.",
      image: "https://i.pinimg.com/736x/8d/2c/07/8d2c07207fbcbbecd3345aab8edcea95.jpg",
      youtubeUrl: "https://youtu.be/EhgghqJtQA8",
      type: "video"
    },
    {
      id: 4,
      title: "Photographie",
      shortDescription: "Découvrez mes photos",
      description: "Je suis passionné par la photographie. À travers cet art, je trouve un moyen unique de m'exprimer et de partager ma vision du monde ainsi que ma sensibilité. Elle nourrit ma créativité, stimule mon imagination et me pousse à explorer de nouveaux horizons. Une invitation à la découverte et à l'exploration de moi-même ainsi que du monde qui m'entoure. Le cinéma a un impact profond sur moi et mon univers visuel car il me transporte dans des mondes imaginaires et me fait ressentir une émotion qui nourrit ma créativité. Les visuels et scènes esthétiques m'inspirent et influencent ma perception du monde et ma vision artistique.",
      image: "https://i.pinimg.com/564x/79/4b/0f/794b0fff82b5959d1cdc64c29fd88b57.jpg",
      type: "photo-gallery",
      photos: [
        "https://i.pinimg.com/736x/87/e5/ce/87e5ce65acde203b14024090af10d015.jpg",
        "https://i.pinimg.com/736x/89/8e/8b/898e8b2fab7726fd3d363bf4da05d0b2.jpg",
        "https://i.pinimg.com/736x/38/9e/ee/389eee4f1d0006132a69325dc767a5bc.jpg",
        "https://i.pinimg.com/736x/eb/c7/54/ebc75472fd5db45d314b9b7930b8c9a7.jpg",
        "https://i.pinimg.com/736x/ef/db/b0/efdbb0a9663caf99bd4dbab607ddb76a.jpg",
        "https://i.pinimg.com/736x/4a/30/d3/4a30d33d0a5dbb596748268aac89b9c1.jpg",
        "https://i.pinimg.com/474x/39/06/b2/3906b24eb56c586598f8525a9e9d59f2.jpg",
        "https://i.pinimg.com/736x/46/80/a3/4680a34b53f0826916f6f64810567979.jpg",
        "https://i.pinimg.com/736x/2f/c8/db/2fc8dbfbc502ae04291b59d613898c20.jpg",
        "https://i.pinimg.com/736x/bf/17/2d/bf172d76f3c9259386e41d5b25f969f6.jpg",
        "https://i.pinimg.com/736x/37/a8/ba/37a8ba1aceed2f170305d2ced22da4f8.jpg",
        "https://i.pinimg.com/736x/53/b9/a6/53b9a67e07bda74411dff4cc28e3a1eb.jpg"
      ]
    },
   
    {
      id: 5,
      title: "Pochette CD 3D",
      shortDescription: "Animation 3D interactive",
      description: "Modélisation 3D d'une pochette de CD avec animation CSS",
      image: "https://i.pinimg.com/736x/44/d7/ef/44d7ef24279af92d74609d6885f6ffee.jpg",
      type: "interactive",
      htmlContent: `
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
      `,
      cssContent: `
       $box-color: #222;

body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

#wrap {
    perspective: 800px;
    width: 350px; 
    height: 350px; 
}

#box {
    width: 100%; 
    height: 100%;  
    transform-style: preserve-3d;
    animation: spinaround 8s infinite linear;
}

#box > div {
    position: absolute;
    width: 350px;
    height: 350px;
    overflow: hidden;
}

div#front {
    background: $box-color;
    background-size: 350px 350px;
    background-image: url('https://i.pinimg.com/736x/71/d0/ba/71d0baded86ebf7a90c6510543db5576.jpg'); /* 🔁 Mets ici le chemin de ton image */
    background-size: cover;
    background-position: center;

}

div#back { 
    background: $box-color; 
    background-size: 350px 350px;
    transform: translateZ(-10px) rotateY(180deg);
    background-image: url('https://i.pinimg.com/736x/61/04/ad/6104adf2e7ed6afa9a73f386166368a1.jpg'); /* 🔁 Mets ici le chemin de ton image */
    background-size: cover;
    background-position: center;
}

div#cd {
    transform: translateZ(-5px) translateX(125px);
    border-radius: 350px;
    box-shadow: 0 0 0 5px silver inset,
                0 0 0 100px #f6f6f6 inset,
                0 0 0 105px silver inset,
                0 0 0 140px rgba(255,255,255,0.25) inset;
    background-image: url('https://i.pinimg.com/736x/44/d7/ef/44d7ef24279af92d74609d6885f6ffee.jpg'); /* 🔁 Mets ici le chemin de ton image */
    background-size: cover;
    background-position: center;
}


div#left,
div#right { 
    background: $box-color;
    width: 10px;
    transform: translateZ(-5px) rotateY(90deg);
    background-image: url('https://i.pinimg.com/736x/44/d7/ef/44d7ef24279af92d74609d6885f6ffee.jpg'); /* 🔁 Mets ici le chemin de ton image */
    background-size: cover;
    background-position: center;
}

div#left { left: -5px; }
div#right { left: 340px; }

div#top,
div#bottom { 
    background: $box-color;
    height: 10px; 
    transform: translateZ(-5px) rotateX(90deg);
  
}

div#top { top: -5px; }
div#bottom { top: 345px; }

@keyframes spinaround{
    to {
        transform:rotateY(360deg);
    }
}
      `,
      jsContent: `
        document.addEventListener('DOMContentLoaded', function() {
          const box = document.querySelector('#box');
          if (box) {
            box.style.transformOrigin = 'center center';
          }
        });
      `
    }
    
  ];
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
    if (!projectsGrid) return;
  
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
  }
  
  // Create Project Detail Pages
  function createProjectDetailPages() {
    const container = document.getElementById("project-details");
    if (!container) return;
  
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
          <div class="tab-content" id="html-tab">
            <pre><code class="language-html">${escapeHtml(project.htmlContent)}</code></pre>
          </div>
          <div class="tab-content" id="css-tab">
            <pre><code class="language-css">${escapeHtml(project.cssContent)}</code></pre>
          </div>
          <div class="tab-content" id="js-tab">
            <pre><code class="language-javascript">${escapeHtml(project.jsContent)}</code></pre>
          </div>
        `;
      
        // Après detailPage.innerHTML = ..., injecte contenu + script/style dynamiquement :
        setTimeout(() => {
          const container = document.getElementById(previewId);
      
          if (container) {
            container.innerHTML = project.htmlContent;
      
            const style = document.createElement("style");
            style.textContent = project.cssContent;
            document.head.appendChild(style);
      
            const script = document.createElement("script");
            script.textContent = project.jsContent;
            document.body.appendChild(script);
          }
        }, 0);
      }
      
      else if (project.type === "video") {
        if (project.videoFile) {
          mediaContent = `
            <div class="project-detail-video">
              <div class="project-detail-video-container">
                <video controls>
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
        mediaContent = `
          <div class="photo-gallery-container">
            <div class="gallery-controls">
              <button class="gallery-nav prev-btn" aria-label="Photo précédente">‹</button>
              <div class="gallery-counter">
                <span class="current-photo">1</span> / ${project.photos.length}
              </div>
              <button class="gallery-nav next-btn" aria-label="Photo suivante">›</button>
            </div>
            <div class="photo-grid">
              ${project.photos.map((photo, index) => `
                <div class="photo-item ${index === 0 ? "active" : ""}" data-index="${index}">
                  <img src="${photo}" alt="${project.title} - Photo ${index + 1}" loading="lazy">
                </div>
              `).join("")}
            </div>
            <div class="photo-thumbnails">
              ${project.photos.map((photo, index) => `
                <div class="thumbnail ${index === 0 ? "active" : ""}" data-index="${index}">
                  <img src="${photo}" alt="Miniature ${index + 1}">
                </div>
              `).join("")}
            </div>
          </div>
        `;
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
  
      // Initialize interactive project
      if (project.type === "interactive") {
        const script = document.createElement('script');
        script.textContent = project.jsContent;
        detailPage.appendChild(script);
      }
    });
  
    // Initialize tab functionality for interactive projects
    document.querySelectorAll('.code-tabs .tab-button').forEach(button => {
      button.addEventListener('click', function() {
        const tabContainer = this.closest('.interactive-project-container');
        const tabId = this.getAttribute('data-tab');
        
        tabContainer.querySelectorAll('.tab-button').forEach(btn => {
          btn.classList.remove('active');
        });
        tabContainer.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        
        this.classList.add('active');
        tabContainer.querySelector(`#${tabId}-tab`).classList.add('active');
      });
    });
  }
  
  // Extract YouTube ID from URL
  function extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
  
  // Initialize Photo Galleries
  function initPhotoGallery() {
    document.querySelectorAll(".photo-gallery-container").forEach(container => {
      const photos = container.querySelectorAll(".photo-item");
      const thumbnails = container.querySelectorAll(".thumbnail");
      const prevBtn = container.querySelector(".prev-btn");
      const nextBtn = container.querySelector(".next-btn");
      const counter = container.querySelector(".current-photo");
      
      if (!photos.length || !thumbnails.length) return;
      
      let currentIndex = 0;
      
      function showPhoto(index) {
        photos.forEach(photo => photo.classList.remove("active"));
        thumbnails.forEach(thumb => thumb.classList.remove("active"));
        
        currentIndex = (index + photos.length) % photos.length;
        photos[currentIndex].classList.add("active");
        thumbnails[currentIndex].classList.add("active");
        
        if (counter) {
          counter.textContent = currentIndex + 1;
        }
      }
      
      if (prevBtn) {
        prevBtn.addEventListener("click", () => showPhoto(currentIndex - 1));
      }
      
      if (nextBtn) {
        nextBtn.addEventListener("click", () => showPhoto(currentIndex + 1));
      }
      
      thumbnails.forEach(thumb => {
        thumb.addEventListener("click", () => {
          const index = parseInt(thumb.dataset.index);
          if (!isNaN(index)) {
            showPhoto(index);
          }
        });
      });
      
      photos.forEach(photo => {
        photo.addEventListener("click", () => {
          photo.classList.toggle("fullscreen");
        });
      });
      
      document.addEventListener("keydown", (e) => {
        if (container.querySelector(".fullscreen")) {
          if (e.key === "ArrowLeft") showPhoto(currentIndex - 1);
          if (e.key === "ArrowRight") showPhoto(currentIndex + 1);
          if (e.key === "Escape") {
            photos[currentIndex].classList.remove("fullscreen");
          }
        }
      });
    });
  }
  
  // Initialize Video Players
  function initVideoPlayers() {
    document.querySelectorAll(".project-detail-video-container video").forEach(video => {
      video.loop = true;
      
      video.addEventListener("error", function() {
        console.error("Video loading error");
      });
      
      video.addEventListener("ended", function() {
        video.currentTime = 0;
        video.play().catch(e => console.log("Autoplay blocked:", e));
      }, false);
      
      const playVideo = () => {
        video.play().catch(e => {
          console.log("Trying to play...");
          if(e.name === "NotAllowedError") {
            const playButton = document.createElement("button");
            playButton.innerHTML = "▶";
            playButton.style.position = "absolute";
            playButton.style.zIndex = "10";
            playButton.style.background = "rgba(0,0,0,0.5)";
            playButton.style.border = "none";
            playButton.style.color = "white";
            playButton.style.padding = "10px 15px";
            playButton.style.borderRadius = "50%";
            playButton.style.cursor = "pointer";
            playButton.style.top = "50%";
            playButton.style.left = "50%";
            playButton.style.transform = "translate(-50%, -50%)";
            playButton.addEventListener("click", function() {
              video.play();
              this.remove();
            });
            video.parentNode.appendChild(playButton);
          }
        });
      };
      
      setTimeout(playVideo, 300);
    });
  }
  
  // Show Project Detail
  function showProjectDetail(projectId) {
    const detailPage = document.getElementById(`project-${projectId}`);
    if (detailPage) {
      detailPage.classList.add("active");
      document.body.style.overflow = "hidden";
      
      const project = projects.find(p => p.id === projectId);
      if (project && project.type === "interactive") {
        const script = document.createElement('script');
        script.textContent = project.jsContent;
        detailPage.appendChild(script);
      }
    }
  }
  
  // Hide Project Detail
  function hideProjectDetail(projectId) {
    const detailPage = document.getElementById(`project-${projectId}`);
    if (detailPage) {
      detailPage.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
  
  // Make global functions available
  window.showProjectDetail = showProjectDetail;
  window.hideProjectDetail = hideProjectDetail;
  
  // Initialize everything when DOM is loaded
  document.addEventListener("DOMContentLoaded", function() {
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
  
    const allWindows = document.querySelectorAll(".section-window, .about-window, .projects-window, .cv-window, .contact-window");
    allWindows.forEach(window => {
      window.style.display = "none";
    });
  
    const allStacks = document.querySelectorAll(".about-window-stack, .search-window-stack, .project-window-stack, .cv-window-stack, .contact-window-stack");
    allStacks.forEach(stack => {
      stack.style.display = "none";
    });
  
    const searchStack = document.querySelector(".search-window-stack");
    if (searchStack) {
      searchStack.style.display = "block";
      document.querySelectorAll(".search-window").forEach(win => {
        win.style.display = "block";
      });
    }
  
    const windows = document.querySelectorAll(".window, .section-window, .about-window, .projects-window, .cv-window, .contact-window, .search-window");
    windows.forEach(makeWindowDraggable);
  
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
  
    createProjectCards();
    createProjectDetailPages();
    
    initPhotoGallery();
    initVideoPlayers();
  
    const downloadBtn = document.querySelector(".download-cv-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", (e) => {
        console.log("CV téléchargé");
        alert("Le CV a été téléchargé!");
      });
    }
  
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
  });
