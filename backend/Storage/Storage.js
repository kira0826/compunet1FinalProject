import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Storage'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // Nombre del archivo
  }
});

const upload = multer({ storage });

export default upload