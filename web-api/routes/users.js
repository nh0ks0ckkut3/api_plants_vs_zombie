var express = require('express');
var router = express.Router();
const UserController = require('../components/users/controller');

/**
 * đăng ký tài khoản
 * method: POST
 * http://localhost:1996/users/register
 */
router.post('/register', async (req, res, next) => {
    try {
        const { body } = req;
        await UserController.register(body);
        return res.status(200).json({ message: 'Đăng ký thành công' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})
/**
 * đăng nhập tài khoản
 * method: POST
 * http://localhost:1996/users/login
 */
router.post('/login', async (req, res, next) => {
    try {
        const { body } = req;
        const user = await UserController.login(body);
        return res.status(200).json({user});
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

module.exports = router;
