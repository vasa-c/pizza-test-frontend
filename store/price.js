export const state = () => ({
    currencies: [],
    curLabels: {},
    defaultCurrency: null,
    currentCurrency: null,
});

export const getters = {

    currencies(state) {
        return state.currencies;
    },

    curLabels(state) {
        return state.curLabels;
    },

    defaultCurrency(state) {
        return state.defaultCurrency;
    },

    currentCurrency(state) {
        return state.currentCurrency;
    },

};

export const mutations = {

    setCurrencies(state, currencies) {
        const curLabels = {};
        state.currecies = currencies;
        for (const cur of currencies) {
            curLabels[cur.key] = cur.label;
        }
        state.curLabels = curLabels;
        state.defaultCurrency = currencies[0].key;
    },

};

export const actions = {

    init({state, commit}, {currencies}) {
        commit("setCurrencies", currencies);
        state.currentCurrency = state.defaultCurrency;
    },

    loadCurrentCurrency({state, rootGetters}) {
        const cur = rootGetters["cookie/all"].cur;
        if (!cur) {
            return;
        }
        if (!state.curLabels[cur]) {
            return;
        }
        state.currentCurrency = cur;
    },

    setCurrentCurrency({state, dispatch}, cur) {
        if (state.currentCurrency === cur) {
            return;
        }
        state.currentCurrency = cur;
        return dispatch("cookie/set", {
            name: "cur",
            value: cur,
        });
    },

};
