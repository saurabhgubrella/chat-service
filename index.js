const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./database.config");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
});

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Running');
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

require("./meeting.routes")(app);

mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("successfully connected to the DB");
	})
	.catch((err) => {
		console.log("could not connect top DB");
		process.exit();
	});

app.get("/", (req, res) => {
	res.json({ message: "welcome to nodejs apis" });
});




server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
