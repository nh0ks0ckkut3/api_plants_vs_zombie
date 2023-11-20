const UserModel = require('./model')

// đăng ký tài khoản
const register =  async (data) => {
    try {
        const { email, name, password, phone, role, age, gender  } = data;
        const user = new UserModel({
            email,
            name,
            password,
            phone,
            role,
            age,
            gender
        });
        await user.save();
    } catch (error) {
        console.log("create error: ", error);
        throw new Error('có lỗi xảy ra khi đăng ký');
    }
}

// đăng nhập
const login = async (data) => {
    try {
        const { email, password } = data;
        const user = await UserModel.findOne({ email });
        if( !user ) throw new Error('không tìm thấy tài khoản');
        if (user.password != password) throw new Error('Mật khẩu không chính xác');
        return user;
    }catch (error){
        console.log("create error: ", error);
        throw new Error('Có lỗi xảy ra khi đăng nhập');
    }
}


module.exports = {
    register,
    login,
}