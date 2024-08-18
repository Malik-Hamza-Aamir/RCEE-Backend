const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { userRouter } = require("./routers/user.router");
const { AppError } = require("./shared/error");
const { errorHandler } = require("./shared/errorHandler.middleware");
const session = require("express-session");
const passport = require("passport");

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});


const app = express();
const port = process.env.PORT;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15 * 24 * 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.all("*", (req: any, res: any, next: any) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port} in ${process.env.NODE_ENV} mode`
  );
});
