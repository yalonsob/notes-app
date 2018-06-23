const noteTitleElement = document.querySelector('#note-title');
const noteBodyElement = document.querySelector('#note-body');
const removeNoteButton = document.querySelector('#remove-note');
const noteId = location.hash.substring(1);
const notes = getSavedNotes();
const note = notes.find(function(note) {
    return note.id === noteId;
});

if(note === undefined) {
    location.assign('/');
}

noteTitleElement.value = note.title;
noteBodyElement.value = note.body;

noteTitleElement.addEventListener('input', function(e) {
    note.title = e.target.value;
    saveNotes(notes);
});

noteBodyElement.addEventListener('input', function(e) {
    note.body = e.target.value;
    saveNotes(notes);
});

removeNoteButton.addEventListener('click', function(e) {
    removeNote(note.id);
    saveNotes(notes);
    location.assign('/')
});


