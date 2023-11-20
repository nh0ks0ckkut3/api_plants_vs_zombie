var express = require('express');
var router = express.Router();
const CategoryController = require('../components/categories/controller');

// lấy danh sách danh mục
// http://localhost:1996/categories
// method : GET
router.get('/', async (req, res, next) => {
    try {
        const categories = await CategoryController.getAllCategories();
        return res.status(200).json(categories);
    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({ message: error.message });
    }
});
// lấy 1 categories
// http://localhost:1996/categories/1
// method : GET
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const categories = await CategoryController.getCategoryById(id);
        return res.status(200).json(categories);
    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({ message: error.message });
    }
});
// thêm mới 1 categories
// http://localhost:1996/categories/
// method : POST
router.post('/', async (req, res, next) => {
    try {
        const { body } = req;
        const categories = await CategoryController.createCategory(body);
        return res.status(200).json({ message: 'Thêm mới thành công' });
    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({ message: error.message });
    }
});
// update 1 categories
// http://localhost:1996/categories/1
// method : PUT
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const message = await CategoryController.updateCategory(id, body);
        return res.status(200).json({ message });
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật category' });
    }
});
// delete 1 categories
// http://localhost:1996/categories/1
//method : DELETE
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await CategoryController.deleteCategory(id);
        return res.status(200).json({ message: 'xóa thành công' });
    } catch (error) {
        console.log("error: ", error)
        return res.status(500).json({ messeage: error.message });
    }
})

module.exports = router;