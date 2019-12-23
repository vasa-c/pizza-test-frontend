import axios from "axios";

export const strict = false; // fix for https://github.com/nuxt/nuxt.js/issues/1917

export const state = () => ({
    cookieOnServer: null,
    csrf: null,
});

export const getters = {
};

export const mutations = {
};

export const actions = {

    nuxtServerInit({state, commit, dispatch}, context) {
        if (context.req) {
            state.cookieOnServer = context.req.headers.cookie || null;
        }
        return dispatch("page", "layout").then((data) => {
            state.csrf = data.csrf;
            commit("pizza/types", data.pizza_types);
            commit("user/user", data.user);
            dispatch("price/init", {
                currencies: data.currencies,
            });
        });
    },

    /**
     * Runs API action
     *
     * @param action (for example "layout")
     * @param data (POST data, for POST request without data - set {}, for undefined - GET-request)
     */
    api({state}, {action, data}) {
        const
            baseUrl = process.env.baseUrl,
            url = `${baseUrl}/api/${action}`,
            options = {
                url: url,
            };
        if (process.server && (state.cookieOnServer !== null)) {
            options.headers = {
                Cookie: state.cookieOnServer,
            };
        }
        if (data) {
            options.method = "post";
            options.data = {
                _token: state.csrf,
                ...data,
            };
        } else {
            options.method = "get";
        }
        return axios(options);
    },

    /**
     * Returns data for page
     *
     * @param dispatch
     * @param page (for example, "pizza/chicago")
     */
    page({dispatch}, page) {
        return dispatch("api", {
            action: page,
        }).then((response) => {
            return response.data;
        });
    },

};
