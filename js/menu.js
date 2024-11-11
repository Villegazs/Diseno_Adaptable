document.getElementById("menu-toggle").addEventListener("click", function() {
    document.getElementById("menu-items").classList.toggle("show");
});
document.addEventListener("DOMContentLoaded", function () {
    // Obtener todos los párrafos y sus botones "Ver más"
    const paragraphs = document.querySelectorAll('.content_display p');
    const seeMoreButtons = document.querySelectorAll('.see-more');
    
    paragraphs.forEach((paragraph, index) => {
        const button = seeMoreButtons[index];
        
        // Verificar si el texto está truncado
        const isTextTruncated = paragraph.scrollHeight > paragraph.clientHeight;
        
        if (!isTextTruncated) {
            // Si el texto no se trunca, ocultar el botón
            button.style.display = 'none';
        } else {
            // Si el texto se trunca, asegurarse de que el botón esté visible
            button.style.display = 'inline-block';
        }

        // Agregar funcionalidad de "Ver más" y "Ver menos"
        button.addEventListener('click', function() {
            if (paragraph.classList.contains('expanded')) {
                // Si está expandido, volver a truncar el texto
                paragraph.classList.remove('expanded');
                button.textContent = "Ver más";
            } else {
                // Si está truncado, mostrar el texto completo
                paragraph.classList.add('expanded');
                button.textContent = "Ver menos";
            }
        });
    });
});
