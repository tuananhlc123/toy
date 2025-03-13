const express = require("express");
const router = express.Router();

// Định nghĩa route mặc định
router.get("/", (req, res) => {
  res.send("User route is working!");
});

module.exports = router;