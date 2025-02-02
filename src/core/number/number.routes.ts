import { Router } from "express";
import { classifyNumber } from "./number.controller";

const router = Router();

router.get("/classify-number", classifyNumber);

export default router;
