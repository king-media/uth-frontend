<template>
  <div class="App-nav">
    <img class="App-logo" alt="Vue logo" src="./assets/logo.png">
    <h2>ue</h2>
    <div class="nav-links-container">
      <router-link class="App-link" to="/todos">Todos</router-link>
      <router-link class="App-link" to="/completed-todos">Completed Todos</router-link>
    </div>
  </div>
  <router-view/>
</template>

<script>
import { onMounted, provide, readonly } from "vue";
import { todoState, stateApi } from "./state";

  export default {
    setup() {
      provide('todoState', readonly(todoState))
      provide('stateApi', readonly(stateApi))

      onMounted(() => {
        stateApi.fetchTodos()
      })
    }
  }
</script>

<style>

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>
