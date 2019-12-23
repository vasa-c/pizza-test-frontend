export const state = () => ({
    cart: null,
});

export const getters = {
    cart(state) {
        return state.cart;
    },
    /* Count of all items */
    count(state) {
        const cart = state.cart || [];
        let count = 0;
        for (const slug in cart) {
            if (cart.hasOwnProperty(slug)) {
                count += cart[slug];
            }
        }
        return count;
    },
};

export const mutations = {

};

export const actions = {

    init({state, rootGetters, dispatch}) {
        if (state.cart !== null) {
            return;
        }
        const
            cookie = rootGetters["cookie/all"].cart,
            cart = {};
        if (typeof cookie === "string") {
            for (const item of cookie.split(";")) {
                const [slug, count] = item.split(":");
                if (count) {
                    cart[slug] = parseInt(count) || 1;
                }
            }
        }
        state.cart = cart;
        dispatch("normalize");
    },

    add({state, dispatch}, slug) {
        const count = state.cart[slug] || 0;
        return dispatch("set", {
            slug: slug,
            count: count + 1,
        });
    },

    remove({dispatch}, slug) {
        return dispatch("set", {
            slug: slug,
            count: 0,
        });
    },

    set({state, dispatch}, {slug, count}) {
        const
            cart = state.cart,
            current = cart[slug] || 0;
        if (current === count) {
            return;
        }
        cart[slug] = count;
        dispatch("normalize");
        state.cart = cart;
        return dispatch("save");
    },

    save({state, dispatch}) {
        const
            cart = state.cart,
            items = [];
        for (const slug in cart) {
            const count = cart[slug];
            if (count > 0) {
                if (cart.hasOwnProperty(slug)) {
                    items.push(`${slug}:${count}`);
                }
            }
        }
        return dispatch("cookie/set", {
            name: "cart",
            value: items.join(";"),
        }, {root:true});
    },

    normalize({state}) {
        const
            cart = state.cart,
            normalized = {};
        for (const slug in cart) {
            if (cart.hasOwnProperty(slug)) {
                let count = cart[slug];
                if (count > 0) {
                    if (count > 10) {
                        count = 10;
                    }
                    normalized[slug] = count;
                    // @todo check pizza type
                }
            }
        }
        state.cart = normalized;
    },
};
