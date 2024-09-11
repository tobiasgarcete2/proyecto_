document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;

    function generarCV() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Currículum Vitae', 10, 10);
        doc.setFontSize(12);
        doc.text('Habilidades: Ejemplo', 10, 20);
        doc.text('Estudios: Ejemplo', 10, 30);
        doc.text('Idiomas: Ejemplo', 10, 40);

        // Agregar una imagen de ejemplo para pruebas
        const imgData = 'data:image/jpeg;base64, ...'; // Base64 de una imagen de prueba
        const ancho = 40; // 4 cm en mm
        const alto = 40;  // 4 cm en mm
        doc.addImage(imgData, 'JPEG', 10, 50, ancho, alto);
        doc.save('mi-cv.pdf');
    }

    document.getElementById('crearCVButton').addEventListener('click', generarCV);
});