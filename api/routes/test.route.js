import express from "express";
import { shouldBeLoggedIn } from "../controllers/test.controller.js";
import { shouldBeAdmin } from "../controllers/test.controller.js";

const router = express.Router() 

router.get("/should-be-logged-in", shouldBeLoggedIn);

router.post("/should-be-admin", shouldBeAdmin);

// router.put("/test", (req,res) => {
//     console.log("router works!")
// });

// router.delete("/test", (req,res) => {
//     console.log("router works!")
// });


export default router;