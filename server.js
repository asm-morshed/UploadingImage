const express = require('express');
const app = express();
const multer = require('multer');

//  const uploadPath = multer({ dest: 'uploads/images/'});

const storage = multer.diskStorage({
    
    destination: function(req,file,cb){
        cb(null,'./uploads/images/')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+ file.originalname)
        //cb(null, file.originalname + '-' + Date.now())
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif'){
        cb(null,true)
    }
    else{
        cb('File should be JPEG, PNG or GIF type')
    }
}
var upload = multer({
    storage: storage,
    limits: {
        fileSize:3*1024*1024
    },
    fileFilter: fileFilter

}).single('myImage')


// app.use(express.static('./uploads'));
app.get('/',(req,res)=>{
    res.send("Welcome to uploading image file");
})
app.post('/uploads',(req,res)=>{
    upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          return res.status(404).json({
              message: err
          })
        }
        res.status(200).json({
            message:'Image uploaded'
        })
        // Everything went fine
      })
      
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})