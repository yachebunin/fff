<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <MonopolyGame />
</template>

<script>
import MonopolyGame from "@/views/MonopolyGame.vue";

export default {
  name: 'App',
  components: {
    MonopolyGame,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
