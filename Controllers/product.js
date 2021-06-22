const router = require("express").Router();
const Product = require("../models/product")
const routes = require("../Routes/routes")
const sql = require("../db")
const authorize = require("./Authorization")
const multer = require("multer")

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./uploads/')
    console.log('ggg');
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
})

const fileFilter = (req,file,cb) => {
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
    cb(null,true)
  }else{
    cb(null,false)
  }
  
  
}

const upload = multer({storage:storage,limits:{
  fileSize:1024 * 1024 * 5
},fileFilter:fileFilter
})

router.route(routes.GET_ALL_PRODUCTS).get((req,res)=>{
  Product.find({},(err,products)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      res.status(200).send(products)
    }
  })
})


router.route(routes.GET_PRODUCT).get((req,res)=>{
  let id = req.params.id
  Product.findById({_id:id},(err,product)=>{
    if(err){
      res.status(400).send("Error ",err)
    }else{
      res.status(200).send(product)
    }
  })
})

router.route(routes.ADD_PRODUCT).post(upload.single('image'),isAdmin,(req,res)=>{
  console.log('file',req.file);
    let product = {
        name:req.body.name,
        totalQuantity:req.body.totalQuantity,
        defaultPrice:req.body.defaultPrice,
        image:req.file.path,
        desc: req.body.desc
    }
    const newProduct = new Product(product)

    newProduct.save().then(()=>{
      res.status(200).send("Product Saved Successfully")
    }).catch(err => {
      res.status(400).send("Error ",err)
    })
  })

  

module.exports = router