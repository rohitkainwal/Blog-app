import { Schema } from "mongoose";
import CustomError from "../utils/CustomError.util.js";

export const validate = (Schema) => {
  return (req, res, next) => {
    const { error, value } = Schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      next(
        new CustomError(
          400, //? status code
          `${error.details.map((ele) => ele.message)}` //? error message
        )
      );
    }
    req.body = value;
    next();
  };
};
