document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        let popup = document.getElementById("popup");
        popup.style.display = "flex"; // Affiche le pop-up après le délai
    }, Math.floor(Math.random() * (47000 - 34000) + 26000)); // Délai aléatoire entre 10 et 15 sec

    document.querySelector(".close-btn").addEventListener("click", function () {
        document.getElementById("popup").style.display = "none";
    });
});




document.addEventListener('DOMContentLoaded', () => {
    
    
    const allWindows = document.querySelectorAll('.section-window, .about-window, .projects-window, .cv-window, .contact-window');
    allWindows.forEach(window => {
        window.style.display = 'none';
    });

    const allStacks = document.querySelectorAll('.about-window-stack,.search-window-stack, .project-window-stack, .cv-window-stack, .contact-window-stack');
    allStacks.forEach(stack => {
        stack.style.display = 'none';
    });

    document.querySelector('.search-window-stack').style.display = 'block';
    document.querySelectorAll('.search-window').forEach(win => {
        win.style.display = 'block';
    });

    const windows = document.querySelectorAll('.window, .section-window, .about-window, .projects-window, .cv-window, .contact-window, .search-window');
    windows.forEach(makeWindowDraggable);

    // Configurer les clics sur les dossiers
    const folders = document.querySelectorAll('.folder');
    folders.forEach(folder => {
        folder.addEventListener('click', () => {
            const section = folder.dataset.section;
            
            if (section === 'about') {
                const stack = document.querySelector('.about-window-stack');
                stack.style.display = 'block';
                stack.querySelectorAll('.about-window').forEach((win, index) => {
                    win.style.display = 'block';
                    win.style.zIndex = 3 - index;
                });
            } 
            else if (section === 'projects') {
                const stack = document.querySelector('.project-window-stack');
                stack.style.display = 'block';
                stack.querySelectorAll('.projects-window').forEach((win, index) => {
                    win.style.display = 'block';
                    win.style.zIndex = 3 - index;
                });
            }
            else if (section === 'cv') {
                const stack = document.querySelector('.cv-window-stack');
                stack.style.display = 'block';
                stack.querySelectorAll('.cv-window').forEach((win, index) => {
                    win.style.display = 'block';
                    win.style.zIndex = 3 - index;
                });
            }
            else if (section === 'contact') {
                const stack = document.querySelector('.contact-window-stack');
                stack.style.display = 'block';
                stack.querySelectorAll('.contact-window').forEach((win, index) => {
                    win.style.display = 'block';
                    win.style.zIndex = 3 - index;
                });
            }
        });
    });

  // Configurer les boutons de fermeture (y compris pour search)
const closeButtons = document.querySelectorAll('.close-button');
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const windowElement = button.closest('.section-window, .search-window, .projects-window, .cv-window, .contact-window, .search-window-stack, .search-window, #job-popup');
        if (windowElement) {
            // Trouver le stack parent - version plus générique
            let stack = windowElement.closest('[class$="-window-stack"]');
            if (!stack) {
                // Alternative si la convention de nommage est différente
                stack = windowElement.closest('.window-stack');
            }
            
            if (stack) {
                stack.style.display = 'none';
                // Masquer toutes les fenêtres dans ce stack
                stack.querySelectorAll('.window, .section-window, .search-window, .projects-window, .cv-window, .contact-window').forEach(win => {
                    win.style.display = 'none';
                });
            } else {
                // Fallback: masquer simplement la fenêtre parente
                windowElement.style.display = 'none';
            }
        }
    });
});


// Solution "force brute" qui masquera tout ce qu'il faut
document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', function() {
        // Masque tous les éléments concernés
        document.querySelectorAll('.search-window-stack, .search-window, #job-popup').forEach(element => {
            element.style.display = 'none';
        });
    });
});


    // Créer les cartes de projet
    createProjectCards();
    createProjectDetailPages();

    // Gestion du téléchargement du CV
    const downloadBtn = document.querySelector('.download-cv-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            console.log('CV téléchargé');
        });
    }

    // Animation des icônes au survol
    folders.forEach(folder => {
        folder.addEventListener('mouseenter', () => {
            const icon = folder.querySelector('.folder-icon');
            icon.style.transform = 'scale(1.1)';
        });

        folder.addEventListener('mouseleave', () => {
            const icon = folder.querySelector('.folder-icon');
            icon.style.transform = 'scale(1)';
        });
    });
});

function makeWindowDraggable(window) {
    const header = window.querySelector('.window-header');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === header || e.target.parentElement === header) {
            isDragging = true;
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
        id: 2,
        title: "Salle d'Arcade Memphis - Blender",
        shortDescription: "Modélisation 3D d'une salle d'arcade",
        description: "Dans le cadre d'un workshop d'une semaine, nous avons été amenés à créer un objet 3D inspiré du mouvement Memphis, j'ai donc réalisé une salle d'arcade. Une fusion entre le design Memphis (années 80) et l'esthétique rétro des salles d'arcade (années 70-80).",
        image: "https://i.pinimg.com/736x/95/26/ab/9526ab794482e94d1ea4adaa0febac98.jpg",
        videoFile: "arcade.mp4",
        type: "photo-gallery",
        photos: [
            "blender1.jpeg",
            "blender2.jpeg",
            "blender3.jpeg",
        ]
    },
    {
        id: 3,
        title: "Le Fablab des Gobelins",
        shortDescription: "Découvrez le Fablab des Gobelins",
        description: "J'ai imaginé une manière simple et parlante de présenter notre FabLab à travers ce site : fab-blog.cargo.site. L'idée n'était pas de tout expliquer, mais de montrer concrètement ce qu'on y fait - des impressions 3D aser précises, uitive où les réalisations parlent d'elles-mêmes. Pas de longs discours, juste l'essentiel : des visuels qui donnent envie de créer, des projets qui inspirent, le tout dans une interface épurée qui laisse la place à l'imagination.",
        image: "https://i.pinimg.com/736x/8d/2c/07/8d2c07207fbcbbecd3345aab8edcea95.jpg",
        videoFile: "fablab.mp4",
        type: "video",
    
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
        title: "Pochette CD",
        shortDescription: "Design d'une pochette de CD",
        description: "Conception et design d'une pochette de CD via InDesign, Illustrator et Photoshop",
        image: "https://i.pinimg.com/736x/44/d7/ef/44d7ef24279af92d74609d6885f6ffee.jpg",
        type: "photo-gallery",
        photos: [
            "https://i.pinimg.com/736x/71/d0/ba/71d0baded86ebf7a90c6510543db5576.jpeg",
            "https://i.pinimg.com/736x/0e/bd/ae/0ebdaefc32d3f5ba3a9c6a6dd8b1fdef.jpg",
            "https://i.pinimg.com/736x/a2/a2/ae/a2a2aef8096dbf2be3e3b1ae33f3ad5d.jpg",
           
        ]
    },
    {
        id: 6,
        title: "Music Player",
        shortDescription: "Lecteur de musique style Mac",
        description: "Un lecteur de musique interactif inspiré du design Mac, créé en HTML CSS & JS.",
        image: "https://i.pinimg.com/736x/a6/f6/a5/a6f6a56d4ccbda600e2b1b8eb2375b63.jpg",
        videoFile: "rec top music.mov",
        type: "video"
    }
];

// ... (le début de votre code reste inchangé jusqu'à la fonction createProjectCards)

function createProjectCards() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => showProjectDetail(project.id);
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <div class="project-title">${project.title}</div>
                <div class="project-short-description">${project.shortDescription}</div>
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });
}

// ... (le reste de votre code reste inchangé)
function createProjectDetailPages() {
    const container = document.getElementById('project-details');
    if (!container) return;

    container.innerHTML = '';

    projects.forEach(project => {
        const detailPage = document.createElement('div');
        detailPage.className = 'project-detail';
        detailPage.id = `project-${project.id}`;

        let mediaContent = '';
        
        // Gestion des vidéos (locale ou YouTube)
        if (project.type === 'video') {
            if (project.videoFile) {
                // Vidéo locale
                mediaContent = `
                    <div class="project-detail-video">
                        <div class="project-detail-video-container">
                            <video autoplay loop muted playsinline>
                                <source src="${project.videoFile}" type="video/mp4">
                                Votre navigateur ne supporte pas les vidéos HTML5.
                            </video>
                        </div>
                    </div>
                `;
            } else if (project.youtubeUrl) {
                // Vidéo YouTube - Conversion de l'URL
                const youtubeId = extractYoutubeId(project.youtubeUrl);
                if (youtubeId) {
                    mediaContent = `
                        <div class="project-detail-video">
                            <div class="project-detail-video-container">
                                <iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&mute=1&playlist=${youtubeId}" 
                                        frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen>
                                </iframe>
                            </div>
                        </div>
                    `;
                }
            }

    
        } else if (project.type === 'photo-gallery' && project.photos) {
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
                            <div class="photo-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                                <img src="${photo}" alt="${project.title} - Photo ${index + 1}" loading="lazy">
                                <div class="photo-caption">${project.title} - ${index + 1}/${project.photos.length}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="photo-thumbnails">
                        ${project.photos.map((photo, index) => `
                            <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                                <img src="${photo}" alt="Miniature ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

                    // ▼▼▼ 3. AJOUTE CE NOUVEAU CAS EN DESSOUS ▼▼▼ (projets combinés)
        } else if ((project.type === 'video-photo-gallery' || project.type === 'photo-video-gallery') 
            && (project.videoFile || project.youtubeUrl) 
            && project.photos) {
      mediaContent = `
          <div class="combined-media">
              <!-- Section Vidéo (reprend ton code vidéo existant) -->
              <div class="video-section">
                  ${project.videoFile ? `
                      <video controls autoplay loop muted playsinline>
                          <source src="${project.videoFile}" type="video/mp4">
                      </video>
                  ` : `
                      <iframe src="https://www.youtube.com/embed/${extractYoutubeId(project.youtubeUrl)}?autoplay=1&mute=1" 
                              frameborder="0" allowfullscreen>
                      </iframe>
                  `}
              </div>

              <!-- Section Galerie (reprend ton code galerie existant) -->
              <div class="photo-gallery-container">
                  ${project.photos.map((photo, index) => `
                      <img src="${photo}" alt="Photo ${index + 1}">
                  `).join('')}
              </div>
          </div>`;
  
        }
        function createProjectDetailPages() {
            const container = document.getElementById('project-details');
            if (!container) return;
        
            container.innerHTML = '';
        
            projects.forEach(project => {
                const detailPage = document.createElement('div');
                detailPage.className = 'project-detail';
                detailPage.id = `project-${project.id}`;
        
                let mediaContent = '';
                
                // Gestion des vidéos
                if (project.type.includes('video')) {
                    if (project.videoFile) {
                        mediaContent = `
                            <div class="project-detail-video">
                                <div class="project-detail-video-container">
                                    <video autoplay loop muted playsinline>
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
                                        <iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&mute=1&playlist=${youtubeId}" 
                                                frameborder="0" 
                                                allowfullscreen>
                                        </iframe>
                                    </div>
                                </div>
                            `;
                        }
                    }
                }
                


                
                // Gestion des galeries photo
                if (project.photos && project.photos.length > 0) {
                    mediaContent += `
                        <div class="photo-gallery-container">
                            <div class="gallery-controls">
                                <button class="gallery-nav prev-btn">‹</button>
                                <div class="gallery-counter">
                                    <span class="current-photo">1</span> / ${project.photos.length}
                                </div>
                                <button class="gallery-nav next-btn">›</button>
                            </div>
                            <div class="photo-grid">
                                ${project.photos.map((photo, index) => `
                                    <div class="photo-item ${index === 0 ? 'active' : ''}" data-index="${index}">
                                        <img src="${photo}" alt="${project.title} - Photo ${index + 1}" loading="lazy">
                                    </div>
                                `).join('')}
                            </div>
                            <div class="photo-thumbnails">
                                ${project.photos.map((photo, index) => `
                                    <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                                        <img src="${photo}" alt="Miniature ${index + 1}">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `;
                }
        
                // Gestion de la description avec formatage amélioré
                let descriptionContent = '';
                if (project.description) {
                    // Séparation des paragraphes par les retours à la ligne
                    const paragraphs = project.description.split('\n').filter(p => p.trim() !== '');
                    descriptionContent = paragraphs.map(p => `<p class="project-description-paragraph">${p}</p>`).join('');
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
                            ${descriptionContent}
                        </div>
                    </div>
                `;
        
                container.appendChild(detailPage);
            });
        
            initPhotoGallery();
            initVideoPlayers();
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
                <p class="project-detail-description">${project.description}</p>
            </div>
        `;

        container.appendChild(detailPage);
    });

    // Initialise les galeries photo après leur création
    initPhotoGallery();
}

// Fonction pour extraire l'ID YouTube
function extractYoutubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Fonction d'initialisation de la galerie photo
function initPhotoGallery() {
    document.querySelectorAll('.photo-gallery-container').forEach(container => {
        const photos = container.querySelectorAll('.photo-item');
        const thumbnails = container.querySelectorAll('.thumbnail');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        const counter = container.querySelector('.current-photo');
        
        let currentIndex = 0;
        
        function showPhoto(index) {
            photos.forEach(photo => photo.classList.remove('active'));
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            currentIndex = (index + photos.length) % photos.length;
            photos[currentIndex].classList.add('active');
            thumbnails[currentIndex].classList.add('active');
            counter.textContent = currentIndex + 1;
        }
        
        prevBtn.addEventListener('click', () => showPhoto(currentIndex - 1));
        nextBtn.addEventListener('click', () => showPhoto(currentIndex + 1));
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                showPhoto(parseInt(thumb.dataset.index));
            });
        });
        
        photos.forEach(photo => {
            photo.addEventListener('click', () => {
                photo.classList.toggle('fullscreen');
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (container.querySelector('.fullscreen')) {
                if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
                if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
                if (e.key === 'Escape') {
                    photos[currentIndex].classList.remove('fullscreen');
                }
            }
        });
    });
}

// Fonctions pour afficher/masquer les détails du projet
function showProjectDetail(projectId) {
    const detailPage = document.getElementById(`project-${projectId}`);
    if (detailPage) {
        const video = document.getElementById('background-video');
        if (video) {
            video.style.opacity = '0';
            setTimeout(() => {
                video.style.opacity = '1';
            }, 10);
        }
        
        detailPage.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideProjectDetail(projectId) {
    const detailPage = document.getElementById(`project-${projectId}`);
    if (detailPage) {
        detailPage.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showProjectDetail(projectId) {
    const detailPage = document.getElementById(`project-${projectId}`);
    if (detailPage) {
        // Masquer temporairement la vidéo pour éviter les conflits de superposition
        const video = document.getElementById('background-video');
        if (video) {
            video.style.opacity = '0';
            setTimeout(() => {
                video.style.opacity = '1';
            }, 10);
        }
        
        detailPage.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideProjectDetail(projectId) {
    const detailPage = document.getElementById(`project-${projectId}`);
    if (detailPage) {
        detailPage.classList.remove('active');
        document.body.style.overflow = '';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.project-detail-video-container video');
    
    if(video) {
        // Force la boucle au cas où l'attribut HTML ne fonctionne pas
        video.loop = true;
        
        // Gestion des erreurs et rechargement silencieux
        video.addEventListener('error', function() {
            console.error('Erreur de chargement vidéo');
        });
        
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play().catch(e => console.log('Lecture automatique bloquée:', e));
        }, false);
        
        // Lancement manuel si l'autoplay est bloqué
        const playVideo = () => {
            video.play().catch(e => {
                console.log('Tentative de lecture...');
                // Solution fallback : ajouter un bouton de lecture
                if(e.name === 'NotAllowedError') {
                    const playButton = document.createElement('button');
                    playButton.innerHTML = '▶';
                    playButton.style.position = 'absolute';
                    playButton.style.zIndex = '10';
                    playButton.style.background = 'rgba(0,0,0,0.5)';
                    playButton.style.border = 'none';
                    playButton.style.color = 'white';
                    playButton.style.padding = '10px 15px';
                    playButton.style.borderRadius = '50%';
                    playButton.style.cursor = 'pointer';
                    playButton.addEventListener('click', function() {
                        video.play();
                        this.remove();
                    });
                    video.parentNode.appendChild(playButton);
                }
            });
        };
        

        
        // Démarrage différé pour certains navigateurs
        setTimeout(playVideo, 300);
    }
});





