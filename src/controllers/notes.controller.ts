import { RequestHandler } from "express";
import NoteModel from "../models/note.model";
import noteService from "../services/notes.service";

const renderedNote: RequestHandler = async (req, res) => {
    const notes = await noteService.getAllNotes(req.user!.id);
    return res.render("home", {
        title: "Home",
        user: req.user,
        notes
    });
}

const getAllNotes: RequestHandler = async (req, res) => {
    const userId = req.query.userId as string;
    try {
        if (!userId) {
            return res.status(400).send({
                ok: false,
                message: 'Missing userId query parameter'
            });
        }
        const notes = await noteService.getAllNotes(userId);
        return res.status(200).send({
            ok: true,
            message: 'Notes retrieved successfully',
            data: notes
        });
    } catch (err: any) {
        return res.status(500).send({
            ok: false,
            message: 'Internal server error',
            error: err.message ? err.message : err
        });
    }
};

const createNote: RequestHandler = async (req, res) => {
    const { title, content, userId } = req.body;
    try {
        if (!title || !content || !userId) {
            return res.status(400).send({
                ok: false,
                message: 'Missing required fields'
            });
        }
        const newNote = await NoteModel.create({
            ...req.body
        });

        return res.status(201).send({
            ok: true,
            message: 'Note created successfully',
            data: newNote
        });
    } catch (err: any) {
        return res.status(500).send({
            ok: false,
            message: 'Internal server error',
            error: err.message ? err.message : err
        });
    }
};

const deleteNote: RequestHandler = async (req, res) => {
    const noteId = req.params.id;
    try {
        if (!noteId) {
            return res.status(400).send({
                ok: false,
                message: 'Missing note ID parameter'
            });
        }
        const note = await noteService.getOneNote(noteId);
        if (!note) {
            return res.status(404).send({
                ok: false,
                message: 'Note not found'
            });
        }
        const deleted = await noteService.deleteNote(noteId);
        if (!deleted) {
            return res.status(500).send({
                ok: false,
                message: 'Failed to delete note'
            });
        }

        return res.status(200).send({
            ok: true,
            message: 'Note deleted successfully'
        });
    } catch (err: any) {

        return res.status(500).send({
            ok: false,
            message: 'Internal server error',
            error: err.message ? err.message : err
        });
    }
};

const deleteNoteHTML: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.redirect('/?error=missing_id');
        const note = await noteService.getOneNote(id);
        if (!note) return res.redirect('/?error=not_found');
        if (String(note.userId) !== String(req.user!.id)) return res.redirect('/?error=forbidden');

        await noteService.deleteNote(id);
        return res.redirect('/?ok=deleted');
    } catch (err: any) {
    }
};

const updateNoteHTML: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.redirect('/?error=missing_id');

        const note = await noteService.getOneNote(id);
        if (!note) return res.redirect('/?error=not_found');
        if (String(note.userId) !== String(req.user!.id)) return res.redirect('/?error=forbidden');

        const { title, content, bgColor } = req.body;
        await noteService.updateNote(id, { title, content, bgColor });

        return res.redirect('/?ok=updated');
    } catch (e) {
        return res.redirect('/?error=update_failed');
    }
};

const noteController = {
    renderedNote,
    createNote,
    getAllNotes,
    deleteNote,
    deleteNoteHTML,
    updateNoteHTML
};

export default noteController;