const Meeting = require("./meeting.model");

exports.getMeetingId = (req, res) => {
  Meeting.findOne({ appointmentId: req.params.appointmentId })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "error occured while fetching users",
      });
    });
};

exports.createMeeting = (req, res) => {
  console.log((req.params.appointmentId));
  // if (!req.body) {
  //   return res.status(400).send({
  //     message: "Meeting content connot be empty",
  //   });
  // }

  // let meetingvalidate = await User.findOne({
  //   appointmentId: req.body.appointmentId,
  // });

  // if (meetingvalidate) {
  //   return res.status(400).send({ message: "appointment already registered" });
  // }

  const meeting = new Meeting({

    appointmentId: req.params.appointmentId,
    meetingId: req.params.meetingId, //Primary
  });

  meeting
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "error occured while creating record !!",
      });
    });
};

exports.testing = (req,res) => {
  return res.status(200).send("Hello")
}