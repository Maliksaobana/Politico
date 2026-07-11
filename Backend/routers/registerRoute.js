const router = require("express").Router()

const { protect,adminOnly } = require("../middleware/ware")

const {
    runForOffice,
    registerContestant,
    getAllCandidate } = require("../controllers/registercontroller")


router.patch("/:id",protect,adminOnly,registerContestant)

router.get("/",protect,getAllCandidate)

router.post("/:id",protect,runForOffice)


module.exports = router