<template>
  <div class="todos-page" :style="{fontSize: `${todoState.fontSize}rem`}">
    <h2>Completed Todos</h2>
    <input class="search" type="text" placeholder="Search..." v-model="search" />
    <todos-list :todos="computedTodos" />
  </div>
</template>

<script>
// @ is an alias to /src
import TodosList from '@/components/TodosList.vue'
import { inject, ref, computed } from "vue";

export default {
  name: 'CompletedTodos',
  components: {
    TodosList
  },
  setup() {
    const todoState = inject('todoState')
    const stateApi = inject('stateApi')
    const search = ref('')
    const computedTodos = computed(() => {
      const todos = stateApi.handleFuzzySearch(search.value) || todoState.todos
      return todos.filter(todo => todo.completed)
  })

    return {
      stateApi,
      todoState,
      computedTodos,
      search,
    }
  }
}
</script>
