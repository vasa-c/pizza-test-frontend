export const state = () => ({
    cart: null,
});

export const getters = {

};

export const mutations = {

};

export const actions = {

    init({state, rootGetters}) {
        if (state.cart !== null) {
            return;
        }
        const
            cookie = rootGetters["cookie/all"].cart,
            cart = {};
        if (typeof cookie === "string") {
            for (const item in cookie.split(";")) {
                const [slug, count] = item.split("=");
                if (count) {
                    cart[slug] = count;
                }
            }
        }
        state.cart = cart;
    },

};
