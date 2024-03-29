import express from "express";
import * as cvController from "./controllers/cv";
import * as contactController from "./controllers/contact";
import * as utilController from "./controllers/util";

const router = express.Router();

router.get("/csrf-init", utilController.csrfInit);

router.get("/cv", cvController.get);

router.get("/cv/:name", cvController.getItem);

router.post("/contact", contactController.create);

router.use((req, res) => {
  res.status(404 /* Not Found */).json({ message: "Invalid route" });
});

export default router;
