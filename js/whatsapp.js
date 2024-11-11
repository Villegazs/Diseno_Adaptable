const telefonoDr = "573054241832"; // Numero del hotel en formato internacional
const mensaje = `Hola, quiero contactarme con la Dra. Victoria Morales`;

document.getElementById('whatsapp-link').href = `https://wa.me/${telefonoDr}?text=${encodeURIComponent(mensaje)}`;