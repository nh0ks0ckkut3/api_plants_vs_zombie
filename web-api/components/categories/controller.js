
const CategoryModel = require('./model');

// lấy danh sách danh mục
const getAllCategories = async () => {
    try {
        const categories = await CategoryModel.find({});// select * from
        // const categories = await CategoryModel.find({},' name ');// select name from
        // const categories = await CategoryModel.find({ name : /a/},' name description');// select name, description from categories where name like '%a%'
        return categories;
    }catch (error){
        console.log("getAll error: ", error);
        throw new Error('Có lỗi xảy ra khi lấy danh sách categories');
    }
}

// lấy chi tiết danh mục
// http://localhost:1996/categories/1
// method : GET
const getCategoryById = async (id) => {
    try {
        const category = await CategoryModel.findById(id);
        return category;
    }catch (error){
        console.log("getOne error: ", error);
        throw new Error('Có lỗi xảy ra khi lấy 1 categories');
    }
}

// thêm mới danh mục
// http://localhost:1996/categories
// method : POST
const createCategory = async (data) => {
    try {
        const { name , description } = data;
        const category = new CategoryModel({name, description});
        await category.save();
    }catch (error){
        console.log("addNew error", error);
        throw new Error('Có lỗi xảy ra khi thêm mới 1 categories');
    }
}

// cập nhật danh mục
// http://localhost:1996/categories/1
// method : PUT
const updateCategory = async (id, data) => {
    try {
        const { name, description } = data;
        const category = await CategoryModel.findById(id);
        if (category) {
            category.name = name;
            category.description = description;
            await category.save();
            // Return a success message instead of throwing an error
            return 'Cập nhật thành công';
        } else {
            throw new Error('Không tìm thấy category để cập nhật');
        }
    } catch (error) {
        console.log("updateCategory error", error);
        // Throw the original error, or handle it accordingly
        throw error;
    }
}

// xóa danh mục
// http://localhost:1996/categories/1
// method : DELETE
const deleteCategory = async (id) => {
    try {
        await CategoryModel.findByIdAndDelete(id);
    }catch (error){
        console.log("deleteCategory error", error);
        throw new Error('Có lỗi xảy ra khi xóa 1 categories');
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}