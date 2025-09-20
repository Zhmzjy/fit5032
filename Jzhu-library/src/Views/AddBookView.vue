<template>
  <div class="container mt-5">
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input type="text" class="form-control" id="isbn" v-model="isbn" required />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="name" required />
      </div>
      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>
    <p v-if="status" class="mt-3">{{ status }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import db from "../firebase/init"
import { collection, addDoc } from "firebase/firestore"

const isbn = ref("")
const name = ref("")
const status = ref("")

async function addBook() {
  const isbnNumber = Number(isbn.value)
  if (!name.value || !isbn.value || Number.isNaN(isbnNumber)) {
    status.value = "ISBN must be a number and both fields required"
    return
  }

  try {
    const docRef = await addDoc(collection(db, "books"), {
      isbn: isbnNumber,
      name: name.value,
      createdAt: new Date().toISOString()
    })
    console.log("Book added:", docRef.id)
    status.value = "Book added successfully!"
    isbn.value = ""
    name.value = ""
  } catch (error) {
    status.value = "Error adding book: " + error.message
  }
}
</script>
