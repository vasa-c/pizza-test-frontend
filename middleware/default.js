export default function ({store}) {
    store.commit("pizza/current", null);
    store.dispatch("cart/init");
    store.dispatch("price/loadCurrentCurrency");
}
