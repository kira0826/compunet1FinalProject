const fs = require('fs');
const path = require('path');

/**
 * Función para convertir una imagen a base64.
 * @param {string} imagePath - La ruta de la imagen a convertir.
 * @return {Promise<string>} - Una promesa que se resuelve con la cadena base64 de la imagen.
 */
function imageToBase64(imagePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                reject('Error reading the file:', err);
                return;
            }

            // Convertir a base64
            const base64Image = data.toString('base64');
            const mimeType = path.extname(imagePath).substring(1);

            // Crear la URL base64
            const base64URL = `data:image/${mimeType};base64,${base64Image}`;
            resolve(base64URL);
        });
    });
}

// Ejemplo de uso
const filePath = path.join(__dirname, 'images', 'product1.jpg');

imageToBase64(filePath)
    .then(base64URL => {
        console.log('Base64 URL:', base64URL);
    })
    .catch(error => {
        console.error(error);
    });

export { imageToBase64 };
