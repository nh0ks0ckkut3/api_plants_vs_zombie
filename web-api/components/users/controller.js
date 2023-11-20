const UserModel = require('../users/model')

// đăng ký tài khoản
const register = async (data) =>{
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    try {
        const {email, name, password,role} = data;
        const user = new UserModel({
            email,
            name,
            password,
            role,
        });
        await user.save();
    } catch (error) {
        console.log('error', error);
        throw new Error(error);
    }
}

// đăng nhập tài khoản
const login = async (data) =>{
    //lấy dữ liệu từ database
    // trả về dữ liệu cho client
    try {
        const {email, password} = data;
        const user = await UserModel.findOne({email});
        if(!user) throw new Error('Không tìm thấy tài khoản');
        if(user.password != password) throw new Error('Nhập mật khẩu không đúng');
        return user;
    } catch (error) {
        console.log('error', error);
        throw new Error('Xảy ra lỗi khi đăng nhập');
    }
}

//cập nhập thông tin tài khoản
const updateProfile = () =>{
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return {};
}

// đổi mật khẩu
const changedPassword = () =>{
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return {};
}

//quên mật khẩu
// const forgotPassword = () =>{
//     //lấy dữ liệu từ database
//     // trả về dữ liệu cho client
//     return {};
// }

// xem danh sách tài khoản
const getAllUser = () =>{
    //lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return [];
}

// xem chi tiết tài khoản
const getUserById = () =>{
    //lấy dữ liệu từ database
    //trả về dữ liệu cho client
    return {};
}

// tìm kiếm tài khoản
const searchUser = () =>{
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return [];
}

// khóa tài khoản
const lockUser = () =>{
    // lấy dữ liệu từ database
    // trả về dữ liệu cho client
    return {};
}

// mở tài khoản
const unLockUser = () => {
    // lấy dữ liệu cho client
    // trả về dữ liệu cho client
    return {};
}


// game nâng cao
const updateLevel = async (id, data) =>{
    try {
        const {level} = data;
        const user = await UserModel.findById(id);
        if(!user) throw new Error('Không tìm thấy người chơi');
        user.level = level;
        await user.save();
    } catch (error) {
        console.log(error);
    }
}


const nodemailer = require('nodemailer');
const User = require('../users/model'); // 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu hay không
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Email không tồn tại.' });
        }

        // Tạo token đặt lại mật khẩu và lưu vào cơ sở dữ liệu (hoặc gửi qua email)
        const resetToken = 'generate_reset_token_function'; // Hàm tạo token đặt lại mật khẩu
        user.resetToken = resetToken;
        await user.save();

        // Gửi email đặt lại mật khẩu
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Yêu cầu đặt lại mật khẩu',
            text: `Nhấp vào đường dẫn sau để đặt lại mật khẩu: http://your-frontend-app/reset-password?token=${resetToken}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Đã có lỗi xảy ra khi gửi email.' });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ message: 'Yêu cầu đã được gửi, vui lòng kiểm tra email của bạn.' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Đã có lỗi xảy ra khi xử lý yêu cầu.' });
    }
};

module.exports = {
    register,
    login,
    updateProfile,
    changedPassword,
    forgotPassword,
    getAllUser,
    searchUser,
    lockUser,
    unLockUser,
    updateLevel
}