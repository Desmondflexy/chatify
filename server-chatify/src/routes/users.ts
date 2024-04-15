import express from 'express';
import * as users from '../controllers/users';
import authenticate from '../middleware/authentication';

const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.get("/me", authenticate, users.me);

export default router;