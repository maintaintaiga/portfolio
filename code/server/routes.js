const express = require("express");
const cvController = require("./controllers/cv");
const contactController = require("./controllers/contact");

const router = express.Router();

router.get("/cv", cvController.get);

router.post("/contact", contactController.create);

router.use((req, res) => {
  res.status(404 /* Not Found */).json({ message: "Invalid route" });
});

module.exports = router;
