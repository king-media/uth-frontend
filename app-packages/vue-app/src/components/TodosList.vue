<template>
  <div class="todos-container">
    <div v-for="todo in todos" :key="todo.id">
      <input type="checkbox" v-model="todo.completed" :name="getFieldName(todo)" @input="saveCompletion(todo)">
      <label :class="todo.completed ? 'completed-todo' : undefined" :for="getFieldName(todo)">
        {{ todo.text }}
      </label>
    </div>
  </div>
</template>

<script>

import { inject } from "vue";

export default {
  name: 'TodosList',
  props: {
    todos: Array
  },
  setup() {
    const todoState = inject('todoState')
    const stateApi = inject('stateApi')

    return { todoState, stateApi }
  },
  methods: {
    getFieldName(todo) {
      return todo.text.replace(/\s/g, '')
    },
    saveCompletion(todo) {
      const trueIndex = this.todoState.todos.findIndex(internalTodo => internalTodo.id === todo.id)
      this.stateApi.handleTodoCompletion(trueIndex)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
