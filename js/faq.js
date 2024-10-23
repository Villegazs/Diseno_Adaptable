function toggleFaq(header) {
    const content = header.nextElementSibling; // Selecciona el siguiente elemento (content_faq)
    if (content.style.display === "none") {
        content.style.display = "block"; // Muestra el contenido
        header.querySelector('.icon').textContent = '-'; // Cambia el icono a "-"
    } else {
        content.style.display = "none"; // Esconde el contenido
        header.querySelector('.icon').textContent = '+'; // Cambia el icono a "+"
    }
}
