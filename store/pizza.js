import axios from "axios";

export const state = () => ({
    types: [],
    current: null,
});

export const getters = {

    types(state) {
        return state.types;
    },

    current(state) {
        return state.current;
    },

    bySlug(state) {
        const result = {};
        for (const pizza of state.types) {
            result[pizza.slug] = pizza;
        }
        return result;
    },
};

export const mutations = {

    types(state, types) {
        state.types = types;
    },

    current(state, current) {
        state.current = current;
    },
};

export const actions = {
};
