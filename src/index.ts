const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { userRouter } = require("./routers/user.router");
const { AppError } = require("./shared/error");
const { errorHandler } = require("./shared/errorHandler.middleware");
const cookieSession = require("cookie-session");
const passport = require("passport");

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});


const app = express();
const port = process.env.PORT;

app.use(cookieSession({
  name: "app-auth",
  keys: [process.env.SESSION_SECRET],
  maxAge: 15 * 24 * 60 * 60 * 1000
}));

app.use(express.json()); 
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/user", userRouter);

// for not existant pages
app.all("*", (req: any, res: any, next: any) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// custom error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port} in ${process.env.NODE_ENV} mode`
  );
});
