const {Schema, Types, model} = require('mongoose');

const eventSchema = new Schema({
  title : {
    type: String,
    required: true
  },
  description: String,
  eventDate: {
    type: Date,
    required: true
  },
  organizer: String,
  participants:[{
    type: Types.ObjectId,
    ref: 'Participant'
  }],
  imagePath: String
});

const Event = model('Event',eventSchema);

module.exports = Event;