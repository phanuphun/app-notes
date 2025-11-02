import { Router } from "express";
import webAuthRouter from "./auth.web.router";
import webAccountRouter from "./account.web.router";
import noteService from "../../services/notes.service";
import { requireLogin } from "../../middlewares/web-auth";
import noteController from "../../controllers/notes.controller";
import webNotesRouter from "./notes.web.router";

const webRouter = Router();
webRouter.get("/", requireLogin, noteController.renderedNote);

webRouter.use("/", webAuthRouter);
webRouter.use("/", requireLogin, webAccountRouter);
webRouter.use("/", requireLogin, webNotesRouter);

export default webRouter;