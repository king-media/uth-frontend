<template>
  <div class="todos-container">
    <div>
      <input type="checkbox">
      <label class="dynamic" htmlFor="checkbox">
        Todo Text
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodosList',
  props: {
    todos: Array
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
