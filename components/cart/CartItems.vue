<template>
    <div class="shopping-cart">
        <div v-for="item in items" class="cart-item" :key="item.pizza.slug">
            <div class="cart-item-photo">
                <nuxt-link :to="`/pizza/${item.pizza.slug}`">
                    <img :src="item.pizza.photo" alt="" />
                </nuxt-link>
            </div>
            <div class="cart-item-name">
                {{ item.pizza.name }}
            </div>
            <div class="cart-item-count">
                <span class="cart-item-count-dec" @click="dec(item)" :class="{'cart-item-disabled': item.count <= 1}">-</span>
                <span class="cart-item-count-count">{{ item.count }}</span>
                <span class="cart-item-count-inc" @click="inc(item)" :class="{'cart-item-disabled': item.count >= 10}">+</span>
            </div>
            <div class="cart-item-del">
                <img src="~/assets/icons/delete.svg" alt="" title="Remove from the cart" @click="del(item)" />
            </div>
            <div class="cart-item-price">
                {{ item.pizza.prices.eur }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            items() {
                const
                    cart = this.$store.getters["cart/cart"],
                    types = this.$store.getters["pizza/bySlug"],
                    items = [];
                for (const slug in cart) {
                    if (cart.hasOwnProperty(slug)) {
                        const
                            count = cart[slug],
                            type = types[slug];
                        if ((count > 0) && type) {
                            items.push({
                                pizza: type,
                                count: count,
                            });
                        }
                    }
                }
                return items;
            },
        },
        methods: {
            del(item) {
                this.$store.dispatch("cart/remove", item.pizza.slug);
            },
            dec(item) {
                if (item.count > 1) {
                    this.$store.dispatch("cart/set", {
                        slug: item.pizza.slug,
                        count: item.count - 1,
                    });
                }
            },
            inc(item) {
                if (item.count <= 10) {
                    this.$store.dispatch("cart/set", {
                        slug: item.pizza.slug,
                        count: item.count + 1,
                    });
                }
            },
        },
    }
</script>

<style lang="scss">
    .cart-item {
        background-color: #cccccc;
        padding: 5px;
        margin-bottom: 15px;
        height: 55px;
        width: 600px;
    }
    .cart-item-photo {
        display: inline-block;
        width: 75px;
        height: 55px;
        img {
            max-width: 50px;
            max-height: 50px;
        }
    }
    .cart-item-name {
        display: inline-block;
        width: 200px;
        height: 55px;
        line-height: 55px;
        vertical-align: top;
    }
    .cart-item-count {
        display: inline-block;
        width: 100px;
        height: 55px;
        line-height: 55px;
        vertical-align: top;
        user-select: none;

        .cart-item-count-dec {
            font-size: 24px;
            color: red;
            cursor: pointer;
        }
        .cart-item-count-inc {
            font-size: 24px;
            color: green;
            cursor: pointer;
        }
        .cart-item-count-count {
            font-size: 20px;
            margin-top: -5px;
            padding: 0 10px;
        }
        .cart-item-disabled {
            opacity: .5;
        }
    }
    .cart-item-del {
        display: inline-block;
        width: 50px;
        height: 55px;
        line-height: 55px;
        vertical-align: top;
        margin-top: 5px;
        img {
            width: 25px;
            cursor: pointer;
        }
    }
    .cart-item-price {
        display: inline-block;
        width: 100px;
        height: 55px;
        line-height: 55px;
        vertical-align: top;
        text-align: right;
    }
</style>
