import express, { Request, Response } from "express";
import { currentUser } from "../middleware/current-user";
import { requireAuth } from "../middleware/require-auth";

const router = express.Router();

const handleCurrentUserCheck = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

router.get("/api/users/currentuser", currentUser, requireAuth, handleCurrentUserCheck);

export { router as currentUserRouter };
