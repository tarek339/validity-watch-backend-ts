import { createServer } from "http";
import { Request, Response } from "express";
import { Server } from "socket.io";
import { setSocket } from "./socket";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const moment = require("moment");
const companyRoutes = require("./routes/companyRoutes");
const driverRoutes = require("./routes/driverRoutes");
const truckRoutes = require("./routes/truckRoutes");
const trailerRoutes = require("./routes/trailerRoutes");
const {
  checkDriverDocsValidation,
} = require("./controller/driver/notficationDriver");
const {
  checkTruckValidation,
} = require("./controller/truck/notificationTruck");
const {
  checkTrailerValidation,
} = require("./controller/trailer/notificationTrailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/company", companyRoutes);
app.use("/driver", driverRoutes);
app.use("/truck", truckRoutes);
app.use("/trailer", trailerRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json(
    `server is running on 4500 ${moment()
      .locale("de")
      .format("DD.MM.YYYY, LT")}`
  );
});

// run function every 24 hours
// setInterval(checkDriverDocsValidation, 86400000);
// setInterval(checkTruckValidation, 86400000);
// setInterval(checkTrailerValidation, 86400000);

// run for testing
checkDriverDocsValidation();
// checkTruckValidation();
// checkTrailerValidation();

const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

io.on("connection", (socket) => {
  setSocket(socket);
  console.log("connection established");
});

mongoose
  .connect(
    "mongodb+srv://tarek:Sony2020@cluster0.ywzi97j.mongodb.net/fleet-management?retryWrites=true&w=majority"
  )
  .then(() => {
    const port = process.env.PORT || 4500;
    server.listen(port, () => {
      console.log(
        `server started on http://localhost:${port}, ${moment()
          .locale("de")
          .format("DD.MM.YYYY, LT")}`
      );
    });
  });
