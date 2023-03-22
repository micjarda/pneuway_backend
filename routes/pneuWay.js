const express = require('express');

const {
    itIsOpen,
    setPneuInitData,
    postOpeningHours,
    getAllOpeningHours
} = require('../controllers/pneuWayController');

const router  = express.Router();


router.get ('/pneuInitData', itIsOpen);

router.get ('/getAllOpeningHours', getAllOpeningHours);

router.post ('/setPneuInitData', setPneuInitData);

router.post('/updateOpeningHours', postOpeningHours);

module.exports = router;
