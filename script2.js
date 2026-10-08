        // Attente du chargement complet du DOM
        document.addEventListener('DOMContentLoaded', () => {
            // Initialisation des icônes Lucide
            lucide.createIcons();

            // Éléments du DOM
            const container = document.getElementById('carousel-container');
            const slides = document.querySelectorAll('.carousel-slide');
            const dots = document.querySelectorAll('.dot');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const progressBar = document.getElementById('progress');
            const pauseBadge = document.getElementById('pause-badge');

            // État du carrousel
            let currentIndex = 0;
            const totalSlides = slides.length;
            const autoPlayDuration = 5000; // 5 secondes par diapositive
            let intervalId = null;
            let progressIntervalId = null;
            let startTime = 0;
            let elapsedTime = 0;
            let isPaused = false;

            // Mettre à jour l'affichage de la diapositive
            function updateCarousel(newIndex) {
                // Masquer la diapositive actuelle
                slides[currentIndex].classList.remove('active');
                
                // Mettre à jour les puces
                dots[currentIndex].className = 'dot w-2 h-2 rounded-full bg-slate-700 hover:bg-slate-500 transition-all duration-300';
                
                // Définir le nouvel index
                currentIndex = (newIndex + totalSlides) % totalSlides;

                // Afficher la nouvelle diapositive
                slides[currentIndex].classList.add('active');

                // Mettre à jour la puce active
                dots[currentIndex].className = 'dot w-8 h-2 rounded-full bg-indigo-500 transition-all duration-300';

                // Réinitialiser la barre de progression
                resetProgress();
            }

            // Gestion de la barre de progression
            function startProgress() {
                if (isPaused) return;
                
                startTime = Date.now() - elapsedTime;
                progressIntervalId = setInterval(() => {
                    elapsedTime = Date.now() - startTime;
                    const percentage = Math.min((elapsedTime / autoPlayDuration) * 100, 100);
                    progressBar.style.width = `${percentage}%`;

                    if (elapsedTime >= autoPlayDuration) {
                        nextSlide();
                    }
                }, 20);
            }

            function stopProgress() {
                clearInterval(progressIntervalId);
            }

            function resetProgress() {
                stopProgress();
                elapsedTime = 0;
                progressBar.style.width = '0%';
                startProgress();
            }

            // Actions de navigation
            function nextSlide() {
                updateCarousel(currentIndex + 1);
            }

            function prevSlide() {
                updateCarousel(currentIndex - 1);
            }

            // Événements des boutons
            nextBtn.addEventListener('click', () => {
                nextSlide();
            });

            prevBtn.addEventListener('click', () => {
                prevSlide();
            });

            // Événements des indicateurs (puces)
            dots.forEach((dot) => {
                dot.addEventListener('click', (e) => {
                    const targetIndex = parseInt(e.target.getAttribute('data-index'));
                    if (targetIndex !== currentIndex) {
                        updateCarousel(targetIndex);
                    }
                });
            });

            // Mise en pause au survol
            container.addEventListener('mouseenter', () => {
                isPaused = true;
                stopProgress();
                pauseBadge.style.opacity = '1';
            });

            container.addEventListener('mouseleave', () => {
                isPaused = false;
                startProgress();
                pauseBadge.style.opacity = '0';
            });

            // Support des touches du clavier (Flèches gauche / droite)
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            });

            // Démarrer le carrousel
            startProgress();
        });

