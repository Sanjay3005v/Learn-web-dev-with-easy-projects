const noteInput = document.getElementById('noteInput');
const saveNoteButton = document.getElementById('saveNote'); // corrected ID
const notesContainer = document.getElementById('noteContainer'); // corrected to match your HTML

document.addEventListener('DOMContentLoaded', displayNotes);

saveNoteButton.addEventListener('click', function () {
    const noteText = noteInput.value.trim();
    if (noteText === "") return;

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));

    noteInput.value = '';
    displayNotes();
});

function displayNotes() {
    notesContainer.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add("note");

        noteElement.innerHTML = `
            <span>${note}</span>
            <button class="deleteBtn" onclick="deleteNote(${index})">Delete</button>
        `;

        notesContainer.prepend(noteElement); // newest on top
    });
}


function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}
