const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')
const app = express();

app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

app.post('/upload', (req, res) => {
    //TODO better error handling -- input validation, assuming only pdf/docx files are allowed
    if (!req.files) {
        return res.status(500).send({ msg: "Errr" })
    }

    // accessing the file
    const uploadedFile = req.files.file;

    //  mv() method places the file inside public/files directory
    uploadedFile.mv(`${__dirname}/public/files/${uploadedFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // return file path and name
        return res.send({name: uploadedFile.name, path: `/${uploadedFile.name}`});
    });
})

require('dotenv').config({path: __dirname + '/.env'})
const PORT = process.env.PORT
const HOST = process.env.HOST
app.listen(PORT, HOST, () => {
    console.log('server is running at : '+ HOST + ':' + PORT);
})