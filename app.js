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

/**
 * Saves the given notes to local storage.
 * @param {object[]} notes - An array of notes with an id and content.
 */
function saveNotes(notes) {
  console.log('Saving notes to local storage')
  console.log(notes)
  // The JSON.stringify() method converts a JavaScript value to a JSON string.
  // The localStorage.setItem() method sets the value of the specified key in local storage.
  localStorage.setItem('notes', JSON.stringify(notes))
  console.log('Notes saved to local storage')
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

/**
 * Adds a new note to the notes container and saves it to local storage.
 */
function addNote() {
  const notes = getNotes()

  // Generate a random id for the new note.
  // The id is used to identify the note in the notes array.
  const noteItem = {
    id: Math.floor(Math.random() * 100000),
    content: '',
  }

  // Create a new note element based on the given id and content.
  const noteElement = createNoteElement(noteItem.id, noteItem.content)

  // Insert the new note element before the add note button.
  notesContainer.insertBefore(noteElement, addNoteBtn)

  // Add the new note to the notes array and save the notes to local storage.
  notes.push(noteItem)
  saveNotes(notes)
}function updateNote(id, newContent) {
  const notes = getNotes()

  const updatedNote = notes.filter((item) => item.id === id)[0]

  updatedNote.content = newContent
  saveNotes(notes)
}

/**
 * Deletes a note from the notes container and removes it from local storage.
 * @param {number} id - The id of the note to be deleted.
 * @param {HTMLElement} element - The note element itself.
 */
function deleteNote(id, element) {
  console.log(`The deleteNote function is called with id: ${id}`)

  const notes = getNotes().filter((item) => item.id != id)

  // Save the updated notes array to local storage.
  console.log('Saving the updated notes array to local storage')
  saveNotes(notes)

  // Remove the note element from the notes container.
  console.log('Removing the note element from the notes container')
  notesContainer.removeChild(element)
}
