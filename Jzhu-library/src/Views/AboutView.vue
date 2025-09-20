<template>
  <div class="container mt-5">
    <h1>About Our Library</h1>
    <p>Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</p>

    <div class="mt-5">
      <h2>Our Book Collection</h2>
      <div v-if="loading" class="text-center">
        <p>Loading books...</p>
      </div>

      <div v-else-if="books.length === 0" class="text-center">
        <p>No books available in the collection.</p>
      </div>

      <div v-else class="row">
        <div class="col-md-4 mb-3" v-for="book in books" :key="book.id">
          <div class="card">
            <div class="card-body">
              <div v-if="editingBook === book.id">
                <div class="mb-2">
                  <label class="form-label">Title</label>
                  <input type="text" class="form-control" v-model="editTitle" />
                </div>
                <div class="mb-2">
                  <label class="form-label">Author</label>
                  <input type="text" class="form-control" v-model="editAuthor" />
                </div>
                <button class="btn btn-success btn-sm me-2" @click="saveUpdate(book.id)" :disabled="updating">
                  {{ updating ? 'Saving...' : 'Save' }}
                </button>
                <button class="btn btn-secondary btn-sm" @click="cancelEdit">Cancel</button>
              </div>

              <div v-else>
                <h5 class="card-title">{{ book.title }}</h5>
                <p class="card-text">Author: {{ book.author }}</p>
                <p class="card-text"><small class="text-muted">Added: {{ formatDate(book.createdAt) }}</small></p>
                <button class="btn btn-primary btn-sm me-2" @click="startEdit(book)">Update</button>
                <button class="btn btn-danger btn-sm" @click="deleteBook(book.id)" :disabled="deleting === book.id">
                  {{ deleting === book.id ? 'Deleting...' : 'Delete' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="message" class="alert mt-3" :class="message.type === 'success' ? 'alert-success' : 'alert-danger'">
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../firebase/init'
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'

const books = ref([])
const loading = ref(true)
const editingBook = ref(null)
const editTitle = ref('')
const editAuthor = ref('')
const updating = ref(false)
const deleting = ref(null)
const message = ref(null)

const fetchBooks = async () => {
  try {
    loading.value = true
    const querySnapshot = await getDocs(collection(db, 'books'))
    books.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error fetching books:', error)
    showMessage('Failed to load books', 'error')
  } finally {
    loading.value = false
  }
}

const startEdit = (book) => {
  editingBook.value = book.id
  editTitle.value = book.title
  editAuthor.value = book.author
}

const cancelEdit = () => {
  editingBook.value = null
  editTitle.value = ''
  editAuthor.value = ''
}

const saveUpdate = async (bookId) => {
  if (!editTitle.value || !editAuthor.value) {
    showMessage('Please fill in both title and author', 'error')
    return
  }

  try {
    updating.value = true
    const bookRef = doc(db, 'books', bookId)
    await updateDoc(bookRef, {
      title: editTitle.value,
      author: editAuthor.value,
      updatedAt: new Date().toISOString()
    })

    const bookIndex = books.value.findIndex(book => book.id === bookId)
    if (bookIndex !== -1) {
      books.value[bookIndex] = {
        ...books.value[bookIndex],
        title: editTitle.value,
        author: editAuthor.value,
        updatedAt: new Date().toISOString()
      }
    }

    cancelEdit()
    showMessage('Book updated successfully!', 'success')
    console.log('Book updated:', bookId)
  } catch (error) {
    console.error('Error updating book:', error)
    showMessage('Failed to update book', 'error')
  } finally {
    updating.value = false
  }
}

const deleteBook = async (bookId) => {
  if (!confirm('Are you sure you want to delete this book?')) {
    return
  }

  try {
    deleting.value = bookId
    const bookRef = doc(db, 'books', bookId)
    await deleteDoc(bookRef)

    books.value = books.value.filter(book => book.id !== bookId)
    showMessage('Book deleted successfully!', 'success')
    console.log('Book deleted:', bookId)
  } catch (error) {
    console.error('Error deleting book:', error)
    showMessage('Failed to delete book', 'error')
  } finally {
    deleting.value = null
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  try {
    return new Date(dateString).toLocaleDateString()
  } catch {
    return 'Invalid date'
  }
}

const showMessage = (text, type) => {
  message.value = { text, type }
  setTimeout(() => {
    message.value = null
  }, 3000)
}

onMounted(() => {
  fetchBooks()
})
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
