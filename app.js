const notesContainer = document.querySelector('#app')
const addNoteBtn = document.querySelector('.add-note')

getNotes().forEach((item) => {
  const noteElement = createNoteElement(item.id, item.content)
  notesContainer.insertBefore(noteElement, addNoteBtn)
})

addNoteBtn.addEventListener('click', () => addNote())

/**
 * Gets the notes from local storage.
 * @returns {object[]} An array of notes with an id and content.
 */
function getNotes() {
  // The || '[]' is used to return an empty array if the item is not found in local storage.
  return JSON.parse(localStorage.getItem('notes') || '[]')
}

function saveNotes(notes) {
  localStorage.setItem('notes', JSON.stringify(notes))
}

/**
 * Creates a new note element based on the given id and content.
 * @param {number} id - The id of the note to create.
 * @param {string} content - The content of the note to create.
 * @returns {HTMLTextAreaElement} A new note element.
 */
function createNoteElement(id, content) {
  const noteElement = document.createElement('textarea')

  noteElement.classList.add('note')

  // Set the initial value of the note element to the given content.
  noteElement.value = content

  // Add an event listener for when the user types something in the note element.
  // When the user types something, the updateNote function is called with the
  // id and the new content.
  noteElement.addEventListener('change', () => {
    updateNote(id, noteElement.value)
  })

  // Add an event listener for when the user double clicks on the note element.
  // When the user double clicks, the deleteNote function is called with the
  // id and the note element itself.
  noteElement.addEventListener('dblclick', () => {
    deleteNote(id, noteElement)
  })

  return noteElement
}

function addNote() {
  const notes = getNotes()

  const noteItem = {
    id: Math.floor(Math.random() * 100000),
    content: '',
  }

  const noteElement = createNoteElement(noteItem.id, noteItem.content)
  notesContainer.insertBefore(noteElement, addNoteBtn)

  notes.push(noteItem)
  saveNotes(notes)
}

function updateNote(id, newContent) {
  const notes = getNotes()

  const updatedNote = notes.filter((item) => item.id === id)[0]

  updatedNote.content = newContent
  saveNotes(notes)
}

function deleteNote(id, element) {
  const notes = getNotes().filter((item) => item.id != id)

  saveNotes(notes)
  notesContainer.removeChild(element)
}
