let express = require('express');
let router = express.Router();
let eventsController = require("../controllers/events-controller");

/* GET events  */
router.get('/', eventsController.listEvents);
router.get('/:id', eventsController.getEventById);

/* POST event */
router.post('/', eventsController.createEvent);
module.exports = router;
