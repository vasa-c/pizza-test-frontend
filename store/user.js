export const state = () => ({
    user: null,
    loginPopup: false,
    reqLoginEmail: null,
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

    reqLoginEmail(state) {
        return state.reqLoginEmail;
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
        state.reqLoginEmail = null;
    },

    closeLoginPopup({state}) {
        state.loginPopup = false;
        state.reqLoginEmail = null;
    },

    reqLogin({state}, email) {
        state.loginPopup = true;
        state.reqLoginEmail = email;
    },

};
