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

    set({state}, {name, value}) {
        const all = state.all;
        if (typeof window === "undefined") {
            return;
        }
        document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=31000000`;
        all[name] = value;
        state.all = all; // @todo
    },
};
