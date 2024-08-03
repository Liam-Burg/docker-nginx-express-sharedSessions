import express from "express";
import os from "os";
import session from "express-session";
import FileStore from "session-file-store";

const FileStoreConstructor = FileStore(session);
const fileStoreOptions = { path: "/usr/src/app/sessions" };

const app = express();
app.use(
  session({
    store: new FileStoreConstructor(fileStoreOptions),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 },
  })
);

app.use("/", async (req, res, next) => {
  req.session.test = "yesI are saved now :)";
  console.log(`I am sending a response ${os.hostname()} ${req.sessionID}`);
  res.json({
    message: "working :) ",
    hostname: os.hostname(),
    sessionID: req.sessionID,
  });
});

app.listen(3000, () =>
  console.log(`I am listening on port 3000 on host ${os.hostname()}`)
);
