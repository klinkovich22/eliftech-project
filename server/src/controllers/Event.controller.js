const {Event, Participant} = require('../models');
const {CONSTANTS} = require('../constants');


module.exports.getAllEvents = async(req,res,next) => {
  try {
    const allEvents = await Event.find();
    res.status(200).send({data: allEvents});
  } catch (error) {
    next(error);
  }
};

module.exports.getCountEvents = async(req,res,next) => {
  try {
    const numberEvents = await Event.find().countDocuments();
    res.status(200).send({data: numberEvents});
  } catch (error) {
    next(error);
  }
}

module.exports.getEventsPagination = async(req,res,next)=>{
  try {
    const {params:{pageId}} = req;
    const eventPagination = await Event.find().sort('_id 1').skip(CONSTANTS.PAGE_LIMIT*pageId).limit(CONSTANTS.PAGE_LIMIT);
    res.status(200).send({data: eventPagination});
  } catch (error) {
    next(error);
  }
}

module.exports.createEvent = async (req, res, next) => {
  try {
    const { body, file } = req;
    const newEvent = await Event.create({...body, imagePath: file?.filename});
    res.status(201).send({ data: newEvent })
  } catch (error) {
    next(error)
  }
}

module.exports.getAllEventParticipants = async (req, res, next) => {
  try {
    const { payload: { eventId } } = req;
    const allEventParticipants = await Participant.find({
      event: eventId
    });
    res.status(200).send({ data: allEventParticipants });
  } catch (error) {
    next(error);
  }
}

module.exports.getOneEvent = async (req, res, next) => {
  try {
    const { params: { eventId } } = req;
    const eventInstance = await Event.findById(eventId).populate({path: 'participants'});
    res.status(200).send({ data: eventInstance });
  } catch (error) {
    next(error);
  }
}



module.exports.registerParticipantToEvent = async (req, res, next) => {
  try {
    const { params: { eventId }, body } = req;
    const foundEvent = await Event.findById(eventId);
    if (!foundEvent) {
      throw new Error(`Event haven't found`);
    }
    const participantInstance = await Participant.create({...body, event:eventId});
    foundEvent.participants.push(participantInstance);
    await foundEvent.save();
    res.status(200).send({ data: 'ok' })
  } catch (error) {
    next(error);
  }
}
 
// module.exports.populateData = async(req, res, next) => {
//   try {
//     const response = await fetch('../../seeds/testing-data.json')
//     const testingData = await response.json();
//     for (element of testingData){
//       const newEvent = await Event.create(testingData);
//     }
//     res.status(201).send({ data: "ok" })
//   } catch (error) {
//     next(error)
//   }
// }