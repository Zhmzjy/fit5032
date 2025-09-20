<template>
  <div class="container mt-5">
    <h1>Add a New Book</h1>
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input type="text" class="form-control" id="title" v-model="title" />
    </div>
    <div class="mb-3">
      <label for="author" class="form-label">Author</label>
      <input type="text" class="form-control" id="author" v-model="author" />
    </div>
    <button class="btn btn-primary" @click="addBook" :disabled="loading">Add Book</button>
    <div v-if="status" class="mt-3 alert" :class="status.includes('Added') ? 'alert-success' : 'alert-danger'">
      {{ status }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import db from "../firebase/init"
import { collection, addDoc } from "firebase/firestore"

const title = ref("")
const author = ref("")
const status = ref("")
const loading = ref(false)

async function addBook() {
  if (!title.value || !author.value) {
    status.value = "Please enter title and author."
    return
  }
  loading.value = true
  status.value = ""
  try {
    const docRef = await addDoc(collection(db, "books"), {
      title: title.value,
      author: author.value,
      createdAt: new Date().toISOString()
    })
    console.log("Book added:", docRef.id)
    status.value = "Added! id=" + docRef.id
    title.value = ""
    author.value = ""
  } catch (error) {
    console.error("Error adding book:", error)
    status.value = "Add failed: " + (error.code ?? error.message)
  } finally {
    loading.value = false
  }
}
</script>
