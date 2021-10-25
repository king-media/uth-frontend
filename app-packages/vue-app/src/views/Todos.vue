<template>
  <div class="todos-page" :style="{fontSize: `${todoState.fontSize}rem`}">
    <h2>Todos</h2>
    <input class="search" type="text" placeholder="Search..." v-model="search" />
    <todos-list :todos="computedTodos" />
    <div class="action-btns-container">
      <button @click="addTodo">Add</button>
      <button @click="stateApi.sortTodosAction">Sort</button>
      <button @click="squareNumbers">^2 Numbers</button>
      <button @click="stateApi.changeFontByType('increment')">Increase Font</button>
      <button @click="stateApi.changeFontByType('reset')">Reset Font</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TodosList from '@/components/TodosList.vue'
import { inject, ref, computed } from "vue";

import _cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Todos',
  components: {
    TodosList
  },
  setup() {
    const todoState = inject('todoState')
    const stateApi = inject('stateApi')
    const search = ref('')
    const computedTodos = computed(() => stateApi.handleFuzzySearch(search.value) || todoState.todos)

    return {
      stateApi,
      todoState,
      computedTodos,
      search,
    }
  },

  methods: {
    addTodo() {
      const newTodos = [...this.todoState.todos]
      if (this.search) {
        newTodos.push({ id: Math.random(), text: this.search, completed: false })
      }

      this.stateApi.updateTodosAction(newTodos)
      this.search = ''
    },
    squareNumsInText(numberSet, text) {
      const squaredSet = numberSet.map(num => num ** 2)
      squaredSet.forEach((num, i) => {
        text = text.replace(numberSet[i], num)
      })

      return text
    },
    squareNumbers() {
      const regex = /\d+/g
      const newTodos = _cloneDeep(this.todoState.todos).map(todo => {
        const numbers = todo.text.match(regex)
        if (numbers) {
          todo.text = this.squareNumsInText(numbers, todo.text)
        }
        return todo
      })

      this.stateApi.updateTodosAction(newTodos)
    }
  }
}
</script>
