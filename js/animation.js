document.addEventListener("DOMContentLoaded", function () {
    // Selecciona todas las secciones con la clase animate-section
    const animateSections = document.querySelectorAll('.animate-section');

    // Crea un observer para detectar cuándo las secciones entran en el viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agrega la clase para activar la animación
                entry.target.classList.add('active');
                // Deja de observar esta sección una vez que se ha animado
                observer.unobserve(entry.target);
            }
        });
    });

    // Comienza a observar cada sección
    animateSections.forEach(section => {
        observer.observe(section);
    });
});
