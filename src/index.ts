const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { userRouter } = require("./routers/user.router");
const { AppError } = require("./shared/error");
const { errorHandler } = require("./shared/errorHandler.middleware");
const passport = require("./services/user/strategy.passport");
const session = require("express-session");
import { Request, Response, NextFunction } from "express";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userRouter);

// for non-existent pages
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// custom error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port} in ${process.env.NODE_ENV} mode`
  );
});
