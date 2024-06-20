<template>
  <div>
    <AddPlayer />
    <PlayerList />
    <TransactionHistory />
  </div>
</template>

<script>
import AddPlayer from '@/components/AddPlayer.vue';
import PlayerList from '@/components/PlayerList.vue';
import TransactionHistory from '@/components/TransactionHistory.vue';

export default {
  name: 'MonopolyGame',
  components: {
    AddPlayer,
    PlayerList,
    TransactionHistory
  }
};
</script>
