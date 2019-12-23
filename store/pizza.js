import axios from "axios";

export const state = () => ({
    types: [],
});

export const getters = {

    types(state) {
        return state.types;
    },

};

export const mutations = {

    types(state, types) {
        state.types = types;
    },

};

export const actions = {
};
