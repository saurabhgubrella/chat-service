module.exports = (app) => {
    const user = require("./meeting.controller");
  
    app.post("/api/v1/meeting/:appointmentId/:meetingId", user.createMeeting);
    app.get("/api/v1/meeting/:appointmentId", user.getMeetingId);
    app.post("/api/v1/meeting", user.testing);
   
  };
  