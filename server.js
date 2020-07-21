const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();

app.use(express.static('public')); //to access the files in public folder
app.use(cors()); // it enables all cors requests
app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    // accessing the file
    const myFile = req.files.file;

    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/files/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
})

require('dotenv').config({path: __dirname + '/.env'})
const PORT = process.env.PORT
const HOST = process.env.HOST
app.listen(PORT, HOST, () => {
    console.log('server is running at : '+ HOST + ':' + PORT);
})