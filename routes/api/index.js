const router = require("express").Router();

const authRoutes = require("./auth");

const charRoutes = require("./chars");

// profile routes
router.use("/auth", authRoutes);

router.use("/chars", charRoutes);

module.exports = router;
