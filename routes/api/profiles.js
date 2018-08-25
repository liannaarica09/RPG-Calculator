const router = require("express").Router();
const profileControler = require("../../controllers/profileControler");

// Matches with "/api/users"
router.route("/")
    .get(profileControler.findOne)
    .put(profileControler.update);

module.exports = router;