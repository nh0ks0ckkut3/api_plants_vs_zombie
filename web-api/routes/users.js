var express = require('express');
var router = express.Router();
const UserController = require('../components/users/controller')

// đăng ký
//http://localhost:3000/users
// method: post
router.post('/register', async (req, res, next) => {
  try {
    const{body} = req;
    const user = await UserController.register(body);
    return res.status(200).json({message: 'Đăng ký thành công'});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
});


// đăng nhập
//http://localhost:3000/users
// method: post
router.post('/login', async (req, res, next) =>{
  try {
    const {body} = req;
    const user = await UserController.login(body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
})


/// game 
router.put('/updateLevel/:id', async (req, res, next) =>{
  try {
    const {body} = req;
    const {id} = req.params;
    await UserController.updateLevel(id, body);
    return res.status(200).json({message: 'cập nhập thành công'});
  } catch (error) {
    return res.status(500).json({message: 'cập nhập thất bại'});
  }
})

// gửi email
const nodemailer = require("nodemailer");
router.post("/forgot-password", async (req, res, next) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hoangkun610@gmail.com",
        pass: "rnujovhgtwuccsjm",
      },
    });

    // send mail with defined transport object
    await transporter.sendMail({
      from: "hoangkun610@gmail.com",
      to: `${email}`,
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    // If the email is sent successfully, respond with a success message
    res.json({ message: `Gửi email thành công đến ${email}` });
  } catch (error) {
    // If there is an error, respond with an error message
    console.error(error);
    res.status(500).json({
      message: "Đã có lỗi xảy ra khi gửi email.",
      error: error.message,
    });
  }
});



module.exports = router;
