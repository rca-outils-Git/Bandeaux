    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const carouselContainer = document.getElementById("carousel");

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    const slideDuration = 4000; // Durée d'affichage de chaque slide en millisecondes (4 secondes)

    function goToSlide(index) {
      // Vérifier que le carrousel contient des slides
      if (totalSlides === 0) return;
      // Boucler au début ou à la fin
      currentSlide = (index + totalSlides) % totalSlides;
      // Afficher uniquement la slide active
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentSlide);
      });
    
      // Mettre à jour les points de navigation
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
      });
}
    
    // Fonctions de navigation
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }
    function prevSlide() {
      goToSlide(currentSlide - 1);
    }
   function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(nextSlide, slideDuration);
    }
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    // Événements sur les boutons Précédent / Suivant
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoPlay();
    });

    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoPlay();
    });

    // Événement clic sur les puces (dots)
    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"), 10);
        goToSlide(index);
        resetAutoPlay();
      });
    });

    // Remet à zéro le minuteur automatique lorsqu'un utilisateur clique manuellement
    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Pause au survol de la souris
    carouselContainer.addEventListener("mouseenter", stopAutoPlay);
    carouselContainer.addEventListener("mouseleave", startAutoPlay);
    // Démarrage immédiat du carrousel
    goToSlide(0);
    startAutoPlay();

    // Navigation au clavier avec les flèches directionnelles
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        goToSlide(currentSlide + 1);
      } else if (event.key === "ArrowLeft") {
        goToSlide(currentSlide - 1);
      }
    });

