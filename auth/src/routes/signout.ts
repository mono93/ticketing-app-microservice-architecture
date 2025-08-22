import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  req.session = null; // Clear the session to sign out the user
  res.status(200).send({ message: "Signed out successfully" });
});

export { router as signoutRouter };
