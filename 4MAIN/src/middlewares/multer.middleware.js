import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, File, cb) {
        cb(null, "./public/temp")
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
//akhiya 

export const upload = multer({ storage })