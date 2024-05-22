const {Schema, Types, model} = require('mongoose');
const fakery = require('mongoose-fakery');

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


fakery.fake('event', model('Event'), {
  title: 'Test event 1',
  description: 'Best event in your life. Just register here and you will be happy. Common buddy!',
  eventDate: '2024-06-01',
  organizer: 'Nastya'
});

module.exports = Event;