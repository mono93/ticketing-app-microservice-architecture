import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

const signupValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .matches(/[A-Z]/)
    .matches(/[a-z]/)
    .matches(/\d/)
    .matches(/[^A-Za-z0-9]/)
    .not().matches(/\s/)
    .withMessage("Password must be valid"),
];

const handleSignup = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  res.status(201).send({});
};

router.post("/api/users/signup", signupValidation, handleSignup);

export { router as signupRouter };
