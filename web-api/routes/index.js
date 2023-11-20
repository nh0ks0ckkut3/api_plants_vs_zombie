var express = require('express');
var router = express.Router();
const upload = require('../components/helper/Upload')

// upload file 
// middleware upload file
// http://localhost:1996/upload-file
//middeware: xử lý trung tâm
router.post('/upload-file', [upload.single('image')] , async(req, res, next)=>{
    const path = 'http://192.168.1.3:1996/images/'+ req.file.filename;
    return res.json({path: path});
});


module.exports = router;
