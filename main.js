document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        let popup = document.getElementById("popup");
        popup.style.display = "flex"; // Affiche le pop-up après le délai
    }, Math.floor(Math.random() * (47000 - 34000) + 26000)); // Délai aléatoire entre 10 et 15 sec

    // Fermer le pop-up en cliquant sur le bouton
    document.querySelector(".close-btn").addEventListener("click", function () {
        document.getElementById("popup").style.display = "none";
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Fermer toutes les fenêtres SAUF search au chargement
    const allWindows = document.querySelectorAll('.section-window, .about-window, .projects-window, .cv-window, .contact-window');
    allWindows.forEach(window => {
        window.style.display = 'none';
    });


    
    // Masquer toutes les stacks SAUF search au chargement
    const allStacks = document.querySelectorAll('.about-window-stack, .project-window-stack, .cv-window-stack, .contact-window-stack');
    allStacks.forEach(stack => {
        stack.style.display = 'none';
    });

    // La fenêtre search reste visible
    document.querySelector('.search-window-stack').style.display = 'block';
    document.querySelectorAll('.search-window').forEach(win => {
        win.style.display = 'block';
    });

    // Rendre les fenêtres draggables
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

    

    // Configurer les boutons de fermeture (sauf pour search)
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const window = button.closest('.section-window, .projects-window, .cv-window, .contact-window');
            if (window) {
                const stack = window.closest('.about-window-stack, .project-window-stack, .cv-window-stack, .contact-window-stack');
                if (stack) {
                    stack.style.display = 'none';
                    stack.querySelectorAll('div[class*="-window"]').forEach(win => {
                        win.style.display = 'none';
                    });
                }
            }
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
        description: "Pour mon projet de fin de semestre, j'ai exploré l'impact de la pop culture sur différentes personnes à travers une série d'interviews. L'objectif ? Capturer comment les références culturelles - musique, films, séries, jeux vidéo - façonnent nos identités et nos interactions au quotidien. Le projet se compose de deux volets : Un court-métrage documentaire (en cours de finalisation) présentant des témoignages authentiques, monté avec des animations After Effects recréant l'interface  d'un iPod. Un site web conçu avec Cargo. Projet à suivre : le montage final sera partagé prochainement !",
        image: "https://i.pinimg.com/736x/f8/c5/5a/f8c55ae0bd8c62dd381306c580ab1fd4.jpg",
        videoId: "fqAScQgcX44",
        type: "video"
    },
    {
        id: 2,
        title: "Salle d'Arcade Memphis - Blender",
        shortDescription: "Modélisation 3D d'une salle d'arcade",
        description: "Dans le cadre d'un workshop d'une semaine, nous avons été amenés à créer un objet 3D inspiré du mouvement Memphis, j'ai donc réalisé une salle d'arcade. une fusion entre le design Memphis (années 80) et l'esthétique rétro des salles d'arcade (années 70-80).",
        image: "https://i.pinimg.com/736x/c9/fb/f7/c9fbf7ae24aa4d4aacc69b1e7fe9f734.jpg",
        videoId: "dQw4w9WgXcQ",
        type: "video"
    },
    {
        id: 3,
        title: "Le Fablab des Gobelins",
        shortDescription: "Découvrez le Fablab des Gobelins",
        description: "J'ai imaginé une manière simple et parlante de présenter notre FabLab à travers ce site : fab-blog.cargo.site. L'idée n'était pas de tout expliquer, mais de montrer concrètement ce qu'on y fait - des impressions 3D qui prennent forme, des découpes laser précises, des circuits électroniques qui s'éveillent. Le parti pris ? Une navigation intuitive où les réalisations parlent d'elles-mêmes. Pas de longs discours, juste l'essentiel : des visuels qui donnent envie de créer, des projets qui inspirent, le tout dans une interface épurée qui laisse la place à l'imagination. Ce projet reflète ma capacité à synthétiser une identité visuelle et à mettre en valeur un espace créatif sans surcharger le message.",
        image: "https://i.pinimg.com/736x/c9/fb/f7/c9fbf7ae24aa4d4aacc69b1e7fe9f734.jpg",
        videoId: "EhgghqJtQA8",
        type: "video"
    },
    {
        id: 4,
        title: "Photographie",
        shortDescription: "Découvrez mes photos",
        description: "Je suis passionné par la photographie. À travers cet art, je trouve un moyen unique de m'exprimer et de partager ma vision du monde ainsi que ma sensibilité. La musique est une source inépuisable de mon inspiration. Elle nourrit ma créativité, stimule mon imagination et me pousse à explorer de nouveaux horizons. Chaque mélodie, chaque rythme est une invitation à la découverte et à l'exploration de moi-même ainsi que du monde qui m'entoure. Le cinéma a un impact profond sur moi et mon univers visuel car il me transporte dans des mondes imaginaires et me fait ressentir une émotion qui nourrit ma créativité. Les visuels et scènes esthétiques m'inspirent influencent ma perception du monde et ma vision artistique.",
        image: "https://i.pinimg.com/564x/79/4b/0f/794b0fff82b5959d1cdc64c29fd88b57.jpg",
        type: "photo-gallery",
        photos: [
            "https://i.pinimg.com/736x/87/e5/ce/87e5ce65acde203b14024090af10d015.jpg",
            "https://i.pinimg.com/736x/89/8e/8b/898e8b2fab7726fd3d363bf4da05d0b2.jpg",
            "https://i.pinimg.com/736x/38/9e/ee/389eee4f1d0006132a69325dc767a5bc.jpg",
            "https://i.pinimg.com/736x/eb/c7/54/ebc75472fd5db45d314b9b7930b8c9a7.jpg",
            "https://i.pinimg.com/736x/ef/db/b0/efdbb0a9663caf99bd4dbab607ddb76a.jpg",
            "https://i.pinimg.com/736x/53/b9/a6/53b9a67e07bda74411dff4cc28e3a1eb.jpg"
        ]
    },
    {
        id: 5,
        title: "Pochette CD",
        shortDescription: "Design d'une pochette de CD",
        description: "Conception et design d'une pochette de CD via InDesign, Ilusyrator et Photoshop",
        image: "https://i.pinimg.com/736x/44/d7/ef/44d7ef24279af92d74609d6885f6ffee.jpg",
        type: "image"
    },
    {
        id: 6,
        title: "Music Player",
        shortDescription: "Lecteur de musique style Mac",
        description: "Un lecteur de musique interactif inspiré du design Mac, créer en HTML CSS & JS.",
        image: "https://i.pinimg.com/736x/a6/f6/a5/a6f6a56d4ccbda600e2b1b8eb2375b63.jpg",
        videoId: "peeleiYAJrQ",
        type: "video"
        
    }
];





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
                ${project.type === 'video' ? `
                    
                ` : ''}
            </div>
            <div class="project-info">
                <div class="project-title">${project.title}</div>
                <div class="project-description">${project.shortDescription}</div>
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });
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
        if (project.type === 'video' && project.videoId) {
            mediaContent = `
                <div class="project-detail-video">
                    <div class="project-detail-video-container">
                        <iframe 
                            src="https://www.youtube.com/embed/${project.videoId}"
                            title="${project.title}"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            `;
        } else if (project.type === 'photo-gallery' && project.photos) {
            mediaContent = `
                <div class="photo-grid">
                    ${project.photos.map(photo => `
                        <div class="photo-item">
                            <img src="${photo}" alt="${project.title}">
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (project.type === 'interactive' && project.playerContent) {
            mediaContent = `
                <div class="music-player">
                    <div class="title-bar">
                        <h3>Music Player</h3>
                    </div>
                    
                    <div class="now-playing">
                        <div class="album-art">
                            <img src="${project.playerContent.songs[0].image}" alt="Album cover" id="albumArt">
                        </div>
                        
                        <div class="track-info">
                            <h4 id="artist">${project.playerContent.songs[0].artist}</h4>
                            <p id="song">${project.playerContent.songs[0].song}</p>
                        </div>
                        
                        <div class="controls">
                            <button id="prev">‹</button>
                            <button id="play">▶</button>
                            <button id="next">›</button>
                        </div>
                    </div>

                    <div class="playlist">
                        <ul>
                            ${project.playerContent.songs.map((song, index) => `
                                <li class="${index === 0 ? 'active' : ''}">${song.song} - ${song.artist}</li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="visualizer">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </div>
            `;
        } else {
            mediaContent = `<img src="${project.image}" alt="${project.title}" class="project-detail-image">`;
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

        // Initialize music player if it's the interactive project
        if (project.type === 'interactive' && project.playerContent) {
            initializeMusicPlayer(project.id, project.playerContent.songs);
        }
    });
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
