import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@mstickets93/common";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

const signinValidation = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().notEmpty().withMessage("Password must be provided"),
];

const handleSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError("Invalid credentials");
  } else {
    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!, // Ensure JWT_KEY is set in environment variables
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
};

router.post("/api/users/signin", signinValidation, validateRequest, handleSignin);

export { router as signinRouter };
