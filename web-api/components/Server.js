const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Sử dụng cổng được cung cấp bởi Heroku hoặc 3000 nếu chạy local

app.get('/return-url', (req, res) => {
  const code = req.query.code;
  const id = req.query.id;
  const cancel = req.query.cancel === 'true';
  const status = req.query.status;
  const orderCode = req.query.orderCode;

  // Xử lý thông tin từ Return URL
  if (cancel) {
    console.log('Thanh toán bị hủy.');
  } else {
    console.log(`Thanh toán thành công. Mã đơn hàng: ${orderCode}`);
  }

  // Trả về phản hồi cho client (có thể là một trang HTML hoặc JSON response)
  res.send('Xử lý Return URL thành công!');
});

app.listen(port, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});