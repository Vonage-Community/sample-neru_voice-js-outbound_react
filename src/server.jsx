import path from "path";
import fs from "fs";

import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";

import App from "./App";

import { neru, Voice } from 'neru-alpha';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const router = neru.Router();

const __dirname = dirname(fileURLToPath(import.meta.url));
router.use(express.static(path.join(__dirname, 'public')));

router.get("/", (req, res) => {
  fs.readFile(path.resolve("./public/index.html"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred");
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});

router.post('/call', async (req, res, next) => {
  try {
      const session = neru.createSession();
      const voice = new Voice(session);

      const vonageNumber = JSON.parse(process.env.NERU_CONFIGURATIONS).contact;
      const to = { type: 'phone', number: req.body.number };

      const response = await voice
          .vapiCreateCall(
              vonageNumber,
              [to],
              [
                  {
                      action: 'talk',
                      text: "Hi! This is a call made by the Voice API and NeRu",
                  }
              ]
          )
          .execute();

      await voice.onVapiEvent({
          vapiUUID: response?.uuid,
          callback: 'onEvent'
      }).execute();
  } catch (error) {
      next(error);
  }
});

router.post('/onEvent', async (req, res) => {
  console.log('event status is: ', req.body.status);
  console.log('event direction is: ', req.body.direction);
  res.sendStatus(200);
});

export { router };