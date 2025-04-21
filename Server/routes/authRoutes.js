// Server/routes/authRoutes.js

const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { register, login, authenticateJWT, getProfile } = require("../controllers/authController"); // Adjust path if needed

const router = express.Router();

// --- Multer Configuration ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Go up two levels from Server/routes to the project root, then into 'uploads/influencer_photos'
        const uploadPath = path.join(__dirname, '..', '..', 'uploads', 'influencer_photos'); // <--- CORRECTED PATH
        try {
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
                console.log(`Created directory: ${uploadPath}`);
            }
        } catch (err) {
            console.error("Error creating upload directory:", err);
            return cb(err);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// ... (rest of multer config: fileFilter, upload initialization) ...
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});
// -------------------------

router.post(
    '/register',
    upload.single('profileImage'),
    register
);

router.post('/login', login);
router.get('/profile', authenticateJWT, getProfile);

// ... (Multer error handler - consider moving this to server.js for global handling) ...
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error("Multer Error:", err);
        return res.status(400).json({ message: `File Upload Error: ${err.message}` });
    } else if (err) {
        if (err.message.includes('Invalid file type')) {
            return res.status(400).json({ message: err.message });
        }
        console.error("Unknown Error during upload:", err);
        return res.status(500).json({ message: `An unexpected error occurred: ${err.message}` });
    }
    next();
});

module.exports = router;