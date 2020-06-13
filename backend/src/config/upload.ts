import multer from 'multer';
import path from 'path';
// __dirname -> a referencia é o próprio path do arquivo

// https://www.w3schools.com/nodejs/ref_path.asp
// https://www.w3schools.com/nodejs/met_path_basename.asp
// https://www.w3schools.com/nodejs/met_path_extname.asp
// http://expressjs.com/en/resources/middleware/multer.html

const uploadConfig = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {

            // The path.extname() method returns the extension of a file path.
            // path.extname(path);
            const ext = path.extname(file.originalname);
            // path.basename(path, extension);
            // extension = Optional. If the filename ends with the specified string, the specified string is excluded from the result
            const name = path.basename(file.originalname, ext);

            cb(null, `${name}-${Date.now()}${ext}`);
        }
    }),
}

export default uploadConfig;