
const ProductModel = require('./model')

// lấy danh sách sản phẩm
const getAllProduct = async (page, limit) => {
    try {
        page = page || 1;
        limit = limit || 10;
        const skip = (page - 1) * limit;
        let query = {}
        //lấy sản phẩm có giá lớn hơn hoặc bằng 30
        //query.price = { $gte : 30 } // greater than equal
        // lấy sản phẩm có giá nhỏ hơn 30 hoặc lớn hơn 70
        query.price = {
            $or: [{ price: { $lt: 30 }, }, { price: { $gt: 70 }, },],
            $and: [{ quantity: { $gt: 50 }, }, { quantity: { $lt: 100 }, },]
        }
        const products = await ProductModel.find({}).skip(skip).limit(limit);
        return products;
    } catch (error) {
        console.log("getAll error: ", error);
        throw new Error('Có lỗi xảy ra khi lấy danh sách product');
    }
}

// lấy chi tiết sản phẩm
// http://localhost:1996/products/1
// method : GET
const getProductById = async (id) => {
    try {
        const products = await ProductModel.findById(id);
        return products;
    } catch (error) {
        console.log("getOne error: ", error);
        throw new Error('Có lỗi xảy ra khi lấy 1 sản phẩm');
    }
}

// thêm mới sản phẩm
// http://localhost:1996/products
// method : POST
const addProduct = async (data) => {
    try {
        const { name, price, quantity, detail, image, category_id } = data;
        const product = new ProductModel({ name, price, quantity, detail, image, category_id });
        await product.save();
    } catch (error) {
        console.log("addNew error", error);
        throw new Error('Có lỗi xảy ra khi thêm mới 1 sản phẩm');
    }
}

// cập nhật sản phẩm
// http://localhost:1996/products/1
// method : PUT
const updateProduct = async (id, data) => {
    try {
        const { name, price, quantity, detail, image, category_id } = data;
        const product = await ProductModel.findById(id);
        if (product) {
            product.name = name;
            product.price = price;
            product.quantity = quantity;
            product.detail = detail;
            product.image = image;
            product.category_id = category_id;
            await product.save()
            // Return a success message instead of throwing an error
            return 'Cập nhật thành công';
        } else {
            throw new Error('Không tìm thấy product để cập nhật');
        }
    } catch (error) {
        console.log("updateProduct error", error);
        // Throw the original error, or handle it accordingly
        throw error;
    }
}

// tìm kiếm sản phẩm theo từ khóa
// http://localhost:1996/products/search/name
const searchProduct = async (keyword) => {
    try {
        const products = await ProductModel.find({ name: new RegExp(keyword, 'i') })
        return products;
    } catch (error) {
        console.log("search error: ", error);
        throw new Error('Có lỗi xảy ra khi tìm kiếm sản phẩm')
    }
}

// xóa sản phẩm
// http://localhost:1996/products/1
// method : DELETE
const deleteProduct = async (id) => {
    try {
        await ProductModel.findByIdAndDelete(id);
    } catch (error) {
        console.log("deleteProduct error", error);
        throw new Error('Có lỗi xảy ra khi xóa 1 sản phẩm');
    }
}

module.exports = {
    getAllProduct,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProduct
}