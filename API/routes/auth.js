import express from "express"
import { register, login } from "../controllers/auth.js";

const router = express.Router();

//Registrar
router.post("/register", register)

//Login
router.get("/login", login)

export default router;