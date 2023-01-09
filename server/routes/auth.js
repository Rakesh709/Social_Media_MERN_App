import express from "express";
import {login} from "../controllers/auth.js";

const router =express.Router(); // the code for all the routes are configured  insep file

router.post("./login",login);

export default router;