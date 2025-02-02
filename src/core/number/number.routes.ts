import { Router } from "express";
import { classifyNumber } from "./number.controller";

const router = Router();

router.get("/classify-number", (req, res) => {
  classifyNumber(req, res).catch((err) => {
    console.error("Error in classifyNumber:", err);
    res.status(500).json({ error: "Internal Server Error" });
  });
});

export default router;
