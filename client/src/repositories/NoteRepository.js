class Note {
    id;
    text;
    constructor({ id, text }) {
        this.id = id;
        this.text = text;
    }
    getId() { return this.id; }
    getText() { return this.text; }
}

class NotesRepository {
    static get(noteId) {
        return fetch(`/api/notes/${noteId}`)
            .then(results => results.json())
            .then(({ id, text }) => new Note({ id, text }))
    }
    static update(noteId, fiields) {
        return fetch(`/api/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({
                note: fiields,
                id: noteId
            })
        })
            .then(results => results.json())
            .then(console.log);
    }
}

export default NotesRepository;