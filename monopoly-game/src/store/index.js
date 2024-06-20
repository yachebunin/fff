import { createStore } from 'vuex';

export default createStore({
    state: {
        players: JSON.parse(localStorage.getItem('players')) || [],
        transactions: JSON.parse(localStorage.getItem('transactions')) || []
    },
    mutations: {
        addPlayer(state, player) {
            state.players.push(player);
            this.commit('saveState');
        },
        updateBalance(state, { playerId, amount }) {
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                player.balance += amount;
                this.commit('saveState');
            }
        },
        addTransaction(state, transaction) {
            state.transactions.push(transaction);
            this.commit('saveState');
        },
        saveState(state) {
            localStorage.setItem('players', JSON.stringify(state.players));
            localStorage.setItem('transactions', JSON.stringify(state.transactions));
        }
    },
    actions: {
        addPlayer({ commit }, playerName) {
            const newPlayer = {
                id: Date.now(),
                name: playerName,
                balance: 15000000
            };
            commit('addPlayer', newPlayer);
        },
        updateBalance({ commit }, payload) {
            commit('updateBalance', payload);
            const transaction = {
                id: Date.now(),
                ...payload
            };
            commit('addTransaction', transaction);
        },
        transferBetweenPlayers({ commit, state }, { fromPlayerId, toPlayerId, amount }) {
            const fromPlayer = state.players.find(p => p.id === fromPlayerId);
            const toPlayer = state.players.find(p => p.id === toPlayerId);
            if (fromPlayer && toPlayer && fromPlayer.balance - amount >= -5000000) {
                commit('updateBalance', { playerId: fromPlayerId, amount: -amount });
                commit('updateBalance', { playerId: toPlayerId, amount });
                const transaction = {
                    id: Date.now(),
                    fromPlayerId,
                    toPlayerId,
                    amount
                };
                commit('addTransaction', transaction);
            }
        }
    },
    getters: {
        players: state => state.players,
        transactions: state => state.transactions,
        getPlayerById: state => id => state.players.find(p => p.id === id)
    }
});
