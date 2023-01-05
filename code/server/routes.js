const express = require("express");
const cvController = require("./controllers/cv");
const contactController = require("./controllers/contact");
const utilController = require("./controllers/util");

const router = express.Router();

router.get("/csrf-init", utilController.csrfInit);

router.get("/cv", cvController.get);

router.post("/contact", contactController.create);

router.use((req, res) => {
  res.status(404 /* Not Found */).json({ message: "Invalid route" });
});

module.exports = router;
