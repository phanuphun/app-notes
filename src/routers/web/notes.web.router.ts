import { Router } from 'express';
import { getUserById } from '../../services/user.service';
import { requireLogin } from '../../middlewares/web-auth';
import noteService from '../../services/notes.service';
import noteController from '../../controllers/notes.controller';

const webNotesRouter = Router();

webNotesRouter.get("/", noteController.renderedNote);
webNotesRouter.delete("/notes/:id", noteController.deleteNoteHTML);
webNotesRouter.put('/notes/:id', requireLogin, noteController.updateNoteHTML);

export default webNotesRouter;