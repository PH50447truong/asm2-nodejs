import { Router } from "express";
import productRouter from "./productRouter";

const router = Router();

router.get("/", function (req, res) {
    res.send("Welcome");
})

router.use("/products", productRouter)

export default router;