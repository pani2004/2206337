import express from "express";
import { numberController } from "../controllers/numberController.js";

const router = express.Router();

router.get("/:numberId", numberController);

export default router;
