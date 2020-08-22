class Note {
    id;
    text;
    createdAt;
    constructor({ id, text, createdAt }) {
        this.id = id;
        this.text = text;
        this.createdAt = createdAt
    }
    getId() { return this.id; }
    getText() { return this.text; }
    getCreatedAt() { return this.createdAt; }
}

class NotesRepository {
    static getAll() {
        return fetch(`/api/notes`)
            .then(results => results.json())
            .then(notes => Object.values(notes).map(({ id, text, createdAt }) => new Note({ id, text, createdAt })))
    }
    static get(noteId) {
        return fetch(`/api/notes/${noteId}`)
            .then(results => results.json())
            .then(({ id, text, createdAt }) => new Note({ id, text, createdAt }))
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
            .then(({ id, text, createdAt }) => new Note({ id, text, createdAt }))
    }
}

export default NotesRepository;