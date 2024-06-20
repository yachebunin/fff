<template>
  <div>
    <h2>Players</h2>
    <ul>
      <li v-for="player in players" :key="player.id">
        {{ player.name }}: {{ formatMoney(player.balance) }}
        <input type="number" v-model.number="amounts[player.id]" placeholder="Enter amount" />
        <button @click="updateBalance(player.id, amounts[player.id])">Добавить мани</button>
        <button @click="updateBalance(player.id, -amounts[player.id])">Убрать мани</button>
        <select v-model="selectedPlayers[player.id]">
          <option :value="null">Select Player</option>
          <option v-for="p in players" :key="p.id" :value="p.id">{{ p.name }}</option>
        </select>
        <button @click="transferMoney(player.id, selectedPlayers[player.id])">Transfer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const amounts = reactive({});
    const selectedPlayers = reactive({});

    const setAmount = (playerId, value) => {
      amounts[playerId] = value;
    };

    const setSelectedPlayer = (playerId, value) => {
      selectedPlayers[playerId] = value;
    };

    return {
      amounts,
      selectedPlayers,
      setAmount,
      setSelectedPlayer,
    };
  },
  computed: {
    players() {
      return this.$store.getters.players;
    }
  },
  methods: {
    updateBalance(playerId, amount) {
      if (amount !== undefined) {
        this.$store.dispatch('updateBalance', { playerId, amount });
        this.amounts[playerId] = 0;
      }
    },
    transferMoney(fromPlayerId, toPlayerId) {
      const amount = this.amounts[fromPlayerId];
      if (amount !== undefined && toPlayerId) {
        this.$store.dispatch('transferBetweenPlayers', { fromPlayerId, toPlayerId, amount });
        this.amounts[fromPlayerId] = 0;
      }
    },
    formatMoney(value) {
      if (typeof value !== "number") {
        return value;
      }
      return value.toLocaleString();
    }
  }
};
</script>
