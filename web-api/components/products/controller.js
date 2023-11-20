// khai báo các hàm xử lý lo
const ProductModel = require('./model')
// lấy danh sách sản phẩm
const getAllProduct = async (page, limit) =>{
    //lấy dữ liệu từ database
    //trả về dữ liệu cho client
    try {
        page = page || 1;
        limit = limit || 10;
        const skip = (page-1) * limit;
        let query = {};
        // const product = await ProductModel.find({});
        // lấy các sản phẩm có giá trị lớn hơn 100
        // query.price = {$gte: 92}; // gt greater than  // gte lớn hơn hoặc bằng greater than equal
        // lấy các sản phẩm nhỏ hơn 30 và lớn hơn 70 // lt nhỏ hơn 
        // query = {
        //     $or: [
        //         {price: {$lt: 30},},
        //         {price: {$gt: 70},},
        //     ],
        //     $and: [
        //         {quantity: {$gt:30}},
        //         {quantity: {$lt:70}},
        //     ]
        // }
        //lấy đúng số sản phẩm cần
        // query = {price: 19, quantity: 37}
        // $in lấy trong 3 số đó
        // query = {
        //     ...query, // chạy cả trên và dưới
        //     price: {$in: [10,20,37]}}
        const product = await ProductModel.find(query).skip(skip).limit(limit);
        return product;
    } catch (error) {
        console.log('error', error);
        throw new Error('Xảy ra lỗi khi lấy danh sách sản phẩm');
    }
}

//lấy chi tiết sản phẩm 
const getProductById = async (id) =>{
    // lấy dữ liệu từ database
    //trả về dữ liệu cho client
    try {
        const product = await ProductModel.findById(id);
        return product;
    } catch (error) {
        console.log('error', error);
        throw new Error('Xảy ra lỗi khi lấy chi tiết sản phẩm');
    }
}

//tìm kiếm sản phẩm
const searchProduct = async (keyword) =>{
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    try {
        const products = await ProductModel.find({name: new RegExp(keyword, "i")});
        // "i" không phân biệt chữ hoa chữ thường
        // biểu thức chính quy là gì
        return products;
    } catch (error) {
        console.log('error', error);
        throw new Error('Xảy ra lỗi khi tìm kiếm sản phẩm');
    }
}

//thêm mới sản phẩm 
const createProduct = async (data) =>{
    //lấy dữ liệu từ database
    //trả về dữ liệu cho client
    try {
       const {name, price, quantity, detail, image, category_id} = data;
       const product = new ProductModel({
        name, 
        price,
        quantity,
        detail,
        image,
        category_id,
       });
       await product.save();
    } catch (error) {
        console.log('error', error);
        throw new Error('Xảy ra lỗi khi thêm mới sản phẩm');
    }
}

// cập nhập sản phẩm 
const updateProduct = async (id,data) => {
    //lấy dữ liệu từ database
    //trả về dữ liệu cho client
    try {
        const {name, price, quantity, detail, image, category_id} = data;
        const product = await ProductModel.findById(id);
        if(!product) throw new Error('Không tìm thấy sản phẩm');
        product.name = name || product.name;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.detail = detail || product.detail;
        product.image = image || product.image;
        product.category = category_id || product.category_id;
        await product.save();
    } catch (error) {
        console.log('error', error);
        throw new Error('Xảy ra lỗi khi cập nhập sản phẩm');
    }
}

// xóa sản phẩm
const deteleProduct = async (id) => {
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    try {
        const product = await ProductModel.findByIdAndDelete(id);
        return product;
    } catch (error) {
        console.log('error', error);
        throw new Error('Xảy ra lỗi khi xóa 1 sản phẩm');
    }
}


module.exports = {
    getAllProduct,
    getProductById,
    searchProduct,
    createProduct,
    updateProduct,
    deteleProduct,
}
