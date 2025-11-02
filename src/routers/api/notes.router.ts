import { Router } from "express";
import noteController from "../../controllers/notes.controller";

const noteRouter = Router();

noteRouter.get('/', noteController.getAllNotes);
noteRouter.post('/', noteController.createNote);
noteRouter.delete('/:id', noteController.deleteNote);

export default noteRouter;