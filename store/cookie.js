export const state = () => ({
    all: {},
});

export const getters = {
    all(state) {
        return state.all;
    },
};

export const mutations = {
    setAsString(state, str) {
        const all = {};
        for (const item of str.split(";")) {
            const [key, value] = item.split("=");
            if (typeof value === "undefined") {
                continue;
            }
            all[key] = value;
        }
        state.all = all;
    },
};

export const actions = {
    init({commit}, context) {
        let str = "";
        if (process.server) {
            str = context.req.headers.cookie;
        } else if (typeof window !== "undefined") {
            str = window.document.cookie;
        }
        return commit("setAsString", str || "");
    },
};
