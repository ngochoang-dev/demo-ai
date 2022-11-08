const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let path = require("path");
const fs = require("fs");

const execSync = require("child_process").execSync;
const spawn = require("child_process").spawn;
spawn("conda activate envs", { shell: true });
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/model1", (req, res) => {
  res.sendFile(__dirname + "/model1/index.html");
});
spawn("conda activate envs", { shell: true });
io.on("connection", (socket) => {
  console.log("connected");
  socket.on(
    "sendmsg",
    (msg) => {
      // save image here

      var base64Data = msg.replace(/^data:image\/png;base64,/, "");

      var fileName = new Date().getTime() + ".jpeg";
      var basePath = "/home/ngochoangdev/Desktop/Img/";
      var cameraFileName = "input" + fileName;
      var aiFileName = "output" + fileName;
      var cameraFile = basePath + cameraFileName;
      var aiFile = basePath + aiFileName;
      fs.writeFile(cameraFile, base64Data, "base64", function (err) {});

      setTimeout(function () {
        execSync(
          "cd ./yolov7 && python main.py --input " +
            basePath +
            cameraFileName +
            " --output " +
            basePath +
            aiFileName
        );

        setTimeout(function () {
          io.emit("recivemsg", msg);
        }, 2000);
      });
    },
    2000
  );
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

// const express = require("express");
// const app = express();
// var cors = require("cors");
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);
// let path = require("path");
// const fs = require("fs");

// const bodyParser = require("body-parser");

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// const execSync = require("child_process").execSync;
// const spawn = require("child_process").spawn;

// app.use("/assets", express.static(path.join(__dirname, "assets")));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

// app.get("/model2", (req, res) => {
//   res.sendFile(__dirname + "/model2/index.html");
// });

// app.get("/model3", (req, res) => {
//   res.sendFile(__dirname + "/model3/index.html");
// });

// app.get("/modelX", (req, res) => {
//   res.sendFile(__dirname + "/modelX/index.html");
// });

// app.get("/run-command", (req, res) => {
//   spawn("conda activate envs", { shell: true });

//   execSync(
//     "cd ./yolov7 && python main.py --input images/imgpsh_fullsize_anim.jpeg --output output/imgpsh_fullsize_anim.jpeg"
//   );
// });

// io.on("connection", (socket) => {
//   console.log("connected");
//   socket.on("sendmsg", (msg) => {
//     // save image here

//     var base64Data = msg.replace(/^data:image\/png;base64,/, "");

//     var fileName = new Date().getTime() + ".jpeg";
//     var basePath = "C:\\Project\\Support\\Img\\";
//     var cameraFileName = "input" + fileName;
//     var aiFileName = "output" + fileName;
//     var cameraFile = basePath + cameraFileName;
//     var aiFile = basePath + aiFileName;
//     fs.writeFile(cameraFile, base64Data, "base64", function (err) {
//       console.log(err);
//     });

//     setTimeout(function () {
//       io.emit("recivemsg", msg);
//     }, 2000);
//   });
// });

// app.listen(3000, () => {
//   console.log(`localhost: 3000`);
// });
