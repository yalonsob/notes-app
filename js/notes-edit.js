const noteTitleElement = document.querySelector('#note-title');
const noteBodyElement = document.querySelector('#note-body');
const removeNoteButton = document.querySelector('#remove-note');
const dateElement = document.querySelector('#last-edited');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => note.id === noteId);

if(note === undefined) {
    location.assign('/');
}

noteTitleElement.value = note.title;
noteBodyElement.value = note.body;
dateElement.textContent = generateLastEdited(note.updatedAt);

noteTitleElement.addEventListener('input', (e) => {
    note.title = e.target.value;
    note.updatedAt = moment().valueOf();
    dateElement.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

noteBodyElement.addEventListener('input', (e) => {
    note.body = e.target.value;
    note.updatedAt = moment().valueOf();
    dateElement.textContent = generateLastEdited(note.updatedAt);
    saveNotes(notes);
});

removeNoteButton.addEventListener('click', (e) => {
    removeNote(note.id);
    saveNotes(notes);
    location.assign('/')
});

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue);
        note = notes.find((note) => note.id === noteId);

        if (note === undefined) {
            location.assign('/');
        }

        noteTitleElement.value = note.title;
        noteBodyElement.value = note.body;
        dateElement.textContent = generateLastEdited(note.updatedAt);
    }
});

