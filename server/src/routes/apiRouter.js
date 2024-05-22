const express = require('express');
const upload = require('../middlewares/multer');
const eventController = require('../controllers/Event.controller');

const apiRouner = express.Router();

apiRouner.get('/', eventController.getAllEvents);
apiRouner.get('/count', eventController.getCountEvents);
apiRouner.get('/pages/:pageId', eventController.getEventsPagination);
apiRouner.get('/:eventId', eventController.getOneEvent);
apiRouner.post('/', upload.single('image'), eventController.createEvent);
apiRouner.post('/:eventId', eventController.registerParticipantToEvent);


module.exports = apiRouner;