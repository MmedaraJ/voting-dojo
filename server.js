const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

require('./server/config/mongoose.config');

app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./server/routes/poll.routes')(app);

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`) 
});

const io = require("socket.io")(server, {cors: true});

io.on("connection", (socket) => {
  socket.on("event_from_client", data => {
    socket.broadcast.emit("send_data_to_all_other_clients", data);
  });
});