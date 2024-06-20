<template>
  <div>
    <input v-model="playerName" placeholder="Enter player name" />
    <button @click="addPlayer">Add Player</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerName: ''
    };
  },
  methods: {
    addPlayer() {
      if (this.playerName) {
        this.$store.dispatch('addPlayer', this.playerName);
        this.playerName = '';
      }
    }
  }
};
</script>
