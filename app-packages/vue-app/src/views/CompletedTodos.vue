<template>
  <div class="todos-page" :style="`${fontSize}rem`">
    <h2>Completed Todos</h2>
    <input className="search" type="text" placeholder="Search..." :value="search" />
    <TodosList :todos="completedTodos" />
  </div>
</template>

<script>
// @ is an alias to /src
import TodosList from '@/components/TodosList.vue'

export default {
  name: 'CompleteTodos',
  components: {
    TodosList
  }
}
</script>
