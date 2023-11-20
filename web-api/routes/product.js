var express = require("express");
var router = express.Router();
const ProductController = require('../components/products/controller')


// lấy danh sách sản phẩm
//http://localhost:3000/products
// method: get
router.get('/', async (req, res, next) => {
  try {
    const {page, limit} = req.query;
    const product = await ProductController.getAllProduct(page, limit);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// lấy chi tiết danh sách sản phẩm
//http://localhost:3000/products/1
// method: get
router.get("/:id", async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await ProductController.getProductById(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// tìm kiếm 1 sản phẩm
//http://localhost:3000/products/1
// method: get
router.get("/search/name", async (req, res, next) =>{
  try {
    const {keywork} = req.query;
    const product = await ProductController.searchProduct(keywork);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// thêm 1 sản phẩm mới
//http://localhost:3000/products
// method: post
router.post('/', async (req, res, next) => {
  try {
    const {body} = req;
    await ProductController.createProduct(body);
    return res.status(200).json({message: 'Thêm 1 sản phẩm mới thành công'});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message});
  }
})

// cập nhập 1 sản phẩm
//http://localhost:3000/products
// method: put
router.put('/:id', async (req, res, next) =>{
  try {
    const{id} = req.params;
    const{body} = req;
    const product = await ProductController.updateProduct(id, body);
    return res.status(200).json({message: 'Cập nhập 1 sản phẩm mới thành công'});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});

// xóa 1 sản phẩm
//http://localhost:3000/products
// method: delete
router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    await ProductController.deteleProduct(id);
    return res.status(200).json({status: true});
  } catch (error) {
    console.log(error);
    return res.status(500).json({status: false});
  }
})

module.exports = router;
