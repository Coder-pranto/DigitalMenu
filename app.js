// const express = require("express");
// const cors = require("cors");
// const session = require('express-session');
// const morgan = require('morgan');
// const app = express();
// const Routes = require("./routes/v1/index");
// const errorHandler = require("./middleware/errorHandler");
// const CustomError = require("./utils/customError");
// const cookieParser = require("cookie-parser");
// const { super_admin_token } = require("./config");
// const path = require('path')

// // global middlewares
// app.use(cors({
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
// }));


// app.use(express.json());
// app.use(morgan('tiny'));
// // app.use(viewCount);
// // app.use(limiter);

// // application middlewares
// //for local use 
// // app.use("/api/v1", Routes);
// // app.use("/api/v1", express.static(path.join(__dirname, "images")));

// // for hosting purpose
// app.use("/api/v1", Routes);
// app.use("/api/v1/images", express.static("images"));

// //server root Route
// app.get("/", async (req, res) => {
//   // const id = await generateRestaurantUniqueId();
//   res.send('E-Food server is running');
// });


// // route not found middleware
// app.use((req, res, next) => {
//   next(new CustomError(`No route found in ${req.url}`, 404))
// });

// // global error handler middleware
// app.use(errorHandler);


// module.exports = app;



const express = require("express");
const cors = require("cors");
const app = express();
const Routes = require("./routes/v1/index");
const errorHandler = require("./middleware/errorHandler");
const CustomError = require("./utils/customError");
const path = require('path');

// CORS Options
const corsOptions = {
  origin: [
    "https://chixxers.tecklyne.com",
    "https://chixxer.tecklyne.com",
    "https://chixxer.digitalmenu-admin.tecklyne.com",
    "https://chixxer.digitalmenu.tecklyne.com",
    "https://digitalmenu-admin-demo.deshit-bd.com",
    "http://localhost:3004",
    "https://digitalmenu.discounthut-bd.com",
    "https://digitalmenu-user.discounthut-bd.com",
    "https://e-food.user.discounthut-bd.com",
    "https://e-food.super.discounthut-bd.com",
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS','-DEV'], // Allow all methods
  credentials: true, // Allow cookies and credentials
  allowedHeaders: ['Authorization', 'Content-Type'], // Allow these headers
  preflightContinue: false, // Stop the OPTIONS preflight from moving on to the next middleware
  optionsSuccessStatus: 200 // Send 200 for preflight requests
};

// Use CORS middleware
app.use(cors(corsOptions));

// Preflight request handler
app.options('*', cors(corsOptions)); // Handle preflight for all routes

// Body parser
app.use(express.json());

// Serving static files for images
app.use("/api/v1/images", express.static("images"));

// Application Routes
app.use("/api/v1", Routes);

// Root Route
app.get("/", (req, res) => {
  res.send('Digital-Menu e server is running');
});

// Route not found middleware
app.use((req, res, next) => {
  next(new CustomError(`No route found in ${req.url}`, 404));
});

// Global Error Handler
app.use(errorHandler);

// Export the app module
module.exports = app;

