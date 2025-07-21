import express from "express";
import multer from "multer";
import { getUserData, uploadProfilePicture, updateProfileData } from "../controllers/profile.controller.js";

const router = express.Router();

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define destination folder for uploaded files
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Save file using original filename
    cb(null, file.originalname);
  },
});

// Configure multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 4 * 1024 * 1024 }, // Limit file size to 4MB
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  }
});

// POST route to handle profile picture upload with error handling
router.post("/updateProfilePicture", (req, res) => {
  upload.single("profileImage")(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: "File size should not exceed 4MB" });
      }
      return res.status(400).json({ message: err.message });
    }
    uploadProfilePicture(req, res);
  });
});

router.route("/updateProfilePicture").post(upload.single('profileImage'), uploadProfilePicture); //posts profile image directly using upload middleware


router.route("/updateProfileData").post(updateProfileData); // update profile like profession and income


router.get('/getUserProfile', getUserData);//fetch user profile and form data

// Export the router to be used in your main app
export default router;
