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
            let [key, value] = item.split("=");
            if (typeof value === "undefined") {
                continue;
            }
            key = key.replace(/^\s+/, "").replace(/\s+$/, "");
            value = decodeURIComponent(value);
            all[key] = value;
        }
        state.all = all;
    },
    setAll(state, all) {
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

    set({state, commit}, {name, value}) {
        const all = state.all;
        if (typeof window === "undefined") {
            return;
        }
        window.document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=31000000`;
        all[name] = value;
        commit("setAll", all);
    },
};
