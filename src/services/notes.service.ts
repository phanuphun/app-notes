import NoteModel from "../models/note.model";

const getAllNotes = async (userId: string) => {
    const notes = await NoteModel.find({ userId: userId }).lean();
    return notes;
};

const getOneNote = async (noteId: string) => {
    const note = await NoteModel.findById(noteId).lean();
    return note;
};

const deleteNote = async (noteId: string) => {
    const result = await NoteModel.deleteOne({ _id: noteId });
    return result.deletedCount && result.deletedCount > 0;
};

const updateNote = async (noteId: string, payload: Partial<{ title: string; content: string; bgColor: string; }>) => {
    const result = await NoteModel.updateOne({ _id: noteId }, { $set: payload });
    return result.modifiedCount && result.modifiedCount > 0;
};

const noteService = {
    getAllNotes,
    getOneNote,
    updateNote,
    deleteNote
};

export default noteService;