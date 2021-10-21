<template>
  <div class="todos-page" :style="`${fontSize}rem`">
    <h2>Todos</h2>
    <input class="search" type="text" placeholder="Search..." v-model="search" />
    <todos-list :todos="todos" />
    <div class="action-btns-container">
      <button @click="addTodo">Add</button>
      <button @click="sortTodos">Sort</button>
      <button @click="squareNumbers">^2 Numbers</button>
      <button @click="changeFontByType('increment')">Increase Font</button>
      <button @click="changeFontByType('reset')">Reset Font</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TodosList from '@/components/TodosList.vue'

export default {
  name: 'Todos',
  components: {
    TodosList
  }
}
</script>
