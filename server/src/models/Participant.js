const { Schema, Types, model } = require('mongoose');

const participantSchema = new Schema({
  event: {
    type: Types.ObjectId,
    ref: 'Event',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  birthday: Date,
  feedback: {
    type: String,
    enum: ['socialMedia', 'friends', 'ownSearch']
  }
});

const Participant = model('Participant', participantSchema);

module.exports = Participant;