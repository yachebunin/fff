<template>
  <div>
    <h2>Transaction History</h2>
    <ul>
      <li v-for="transaction in transactions" :key="transaction.id">
        <div v-if="transaction.fromPlayerId && transaction.toPlayerId">
          {{ getPlayerName(transaction.fromPlayerId) }} transferred {{ formatMoney(transaction.amount) }} to {{ getPlayerName(transaction.toPlayerId) }}
        </div>
        <div v-else>
          {{ getPlayerName(transaction.playerId) }} {{ transaction.amount >= 0 ? 'received' : 'lost' }} {{ formatMoney(Math.abs(transaction.amount)) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    transactions() {
      return this.$store.getters.transactions;
    }
  },
  methods: {
    getPlayerName(playerId) {
      const player = this.$store.getters.getPlayerById(playerId);
      return player ? player.name : 'Unknown';
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
