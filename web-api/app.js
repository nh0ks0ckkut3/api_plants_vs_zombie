var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
// const { MongoClient } = require('mongodb');

var mongoose = require('mongoose');

const uri = "mongodb+srv://0osuper:fOhL8p11Ng0x8xPx@plantsvszombie.tjmo9fh.mongodb.net/?retryWrites=true&w=majority"

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // Function to connect to the database
// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB Atlas');
//   } catch (err) {
//     console.error('Error connecting to MongoDB Atlas:', err)
//   }
//   finally {
//     // Ensure that the client will close when you finish using it
//     // You might want to call this in your application's shutdown logic
//     // e.g., when your Node.js process is terminating
//     // await client.close();
//   }
// }

// // Call the connectToDatabase function to establish a connection
// connectToDatabase();
const connectionParams = {
  useNewUrlParser : true,
  useUnifiedTopology: true
};
mongoose.connect(uri, connectionParams).then(() => {
  console.info("Connected to the DB");
}).catch((e) => {
  console.log("Error:", e);
});

// mongoose.connect('mongodb://localhost:27017/demoMD18201',
//   { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected successfully'))
//   .catch(err => console.log(err));

//chú ý thứ tự import
require('./components/categories/model');
require('./components/products/model');
require('./components/users/model');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
const categoriesRouter = require('./routes/categories')
const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());//<<<<<<<<<<<<<<<<<<<<<<<<
app.use(bodyParser.json());

// http://localhost:3000/
app.use('/', indexRouter);

// http://localhost:3000/users
app.use('/users', usersRouter);

// http://localhost:3000/products
app.use('/products', productRouter);

// http://localhost:3000/categories
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// http://localhost:3000/phep-toan/
// http://localhost:3000/tinh-toan/10/20/cong




// req : request (yêu cầu)
// + body: dữ liệu gửi lên
// + params: dữ liệu trên url
//  + query: dữ liệu trên url
// res : response (phản hồi)
// + json: trả về dữ liệu dạng json
// + send: trả về dữ liệu dạng text
// + render: trả về dữ liệu dạng html
// next: chuyển tiếp sang middleware tiếp theo
