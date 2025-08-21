<script setup>
import { ref } from 'vue';

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
});

const submittedCards = ref([]);

const submitForm = () => {
  submittedCards.value.push({
    ...formData.value
  });
};
</script>

<template>
  <div class="form">
    <h1>User Information Form / Credentials</h1>
    <form @submit.prevent="submitForm">
      <label for="username">Username:</label><br>
      <input type="text" id="username" name="username" v-model="formData.username"><br>

      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password" v-model="formData.password"><br>

      <label for="isAustralian">Australian Resident?</label><br>
      <input type="checkbox" id="isAustralian" name="isAustralian" v-model="formData.isAustralian"><br>

      <label for="reason">Reason For Joining:</label><br>
      <textarea id="reason" name="reason" rows="3" v-model="formData.reason"></textarea><br>

      <label for="gender">Gender</label><br>
      <select id="gender" v-model="formData.gender">
        <option value="" disabled>Select…</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      <br>
      <button type="submit">Submit</button>
    </form>
  </div>

  <div class="row mt-5" v-if="submittedCards.length">
    <div class="d-flex flex-wrap justify-content-start">
      <div
        v-for="(card, index) in submittedCards"
        :key="index"
        class="card m-2"
        style="width: 18rem;"
      >
        <div class="card-header">User Information</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Username: {{ card.username }}</li>
          <li class="list-group-item">Password: {{ card.password }}</li>
          <li class="list-group-item">Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}</li>
          <li class="list-group-item">Gender: {{ card.gender }}</li>
          <li class="list-group-item">Reason: {{ card.reason }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
   .card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }
</style>
