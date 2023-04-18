const mongoose = require("mongoose");

const meetingDetails = mongoose.Schema({

  meetingId: String,
  appointmentId: String //Primary
});

module.exports = mongoose.model("meeting", meetingDetails);
