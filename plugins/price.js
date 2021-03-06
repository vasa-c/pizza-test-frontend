import Vue from 'vue';

Vue.prototype.currentCurrency = function () {
    return this.$store.getters["price/currentCurrency"];
};

Vue.prototype.price = function (price, count, cur) {
    const
        currency = cur || this.$store.getters["price/currentCurrency"],
        label = this.$store.getters["price/curLabels"][currency];
    if (price && (typeof price === "object")) {
        price = parseInt(price[currency]);
    }
    if (count) {
        price *= count;
    }
    let cents = "" + (price % 100);
    while (cents.length < 2) {
        cents += "0";
    }
    price = Math.floor(price / 100);
    return `${label}${price},${cents}`;
};

Vue.prototype.setPageTitle = function (title) {
    this.$store.commit("pageTitle", title);
};
