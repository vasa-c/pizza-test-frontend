export const state = () => ({
    user: null,
    loginPopup: false,
});

export const getters = {
    user(state) {
        return state.user;
    },

    isLogined(state) {
        return !!state.user;
    },

    ifAdmin(state) {
        return !!(user && user.is_admin);
    },

    loginPopup(state) {
        return state.loginPopup;
    },
};

export const mutations = {

    user(state, user) {
        state.user = user;
    },

};

export const actions = {

    logout({commit, dispatch}) {
        return dispatch("api", {
            action: "logout",
            data: {},
        }, {root: true}).then((response) => {
            commit("user", null);
            return dispatch("page", "layout", {root: true}).then((response) => {
                if (typeof window !== "undefined") {
                    // Flush privileges and csrf token
                    window.location.assign("/");
                }
            });
        });
    },

    signin({state}) {
        state.loginPopup = true;
    },

    closeLoginPopup({state}) {
        state.loginPopup = false;
    },

};
