const express = require("express");
const ControllerForNotification = require("../controller/ControllerForNotification");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const notifyRouter = express.Router();

notifyRouter.get(
  "/lists",
  AuthMiddleware.verify,
  ControllerForNotification.getNotifications
);
notifyRouter.delete(
  "/delete/:id",
  AuthMiddleware.verify,
  ControllerForNotification.deleteNotification
);
notifyRouter.patch(
  "/update/:id",
  AuthMiddleware.verify,
  ControllerForNotification.updateNotification
);

module.exports = notifyRouter;
