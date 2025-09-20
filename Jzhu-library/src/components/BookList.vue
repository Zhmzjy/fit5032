<template>
  <div>
    <h1>Books with ISBN > 1000 (Top 5, A→Z)</h1>
    <ul>
      <li v-for="b in books" :key="b.id">
        {{ b.name }} - ISBN: {{ b.isbn }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import db from "../firebase/init"
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore"

const books = ref([])

async function fetchBooks() {
  const q = query(
    collection(db, "books"),
    where("isbn", ">", 1000),
    orderBy("name", "asc"),
    limit(5)
  )

  const querySnapshot = await getDocs(q)
  books.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

onMounted(() => {
  fetchBooks()
})
</script>
