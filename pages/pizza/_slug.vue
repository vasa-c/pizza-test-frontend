<template>
    <main>
        <h2>{{ pizza.name }} pizza</h2>

        <div class="pizza-description">
            <img :src="pizza.photo" :alt="pizza.name" />
            <p>{{ pizza.description }}</p>
            <p style="font-size:36px;">{{ price(pizza.prices) }}</p>
        </div>
        <br style="clear:both" />

        <h2>Buy It</h2>

        <button @click="addToCart" v-if="!inCart" class="add-to-cart">
            Add to the cart ({{ price(pizza.prices)}})
        </button>

        <div v-if="inCart" style="user-select:none">
            <p>Already in Cart.
                <nuxt-link to="/cart" style="text-decoration:none">Go to checkout &rarr;.</nuxt-link>
            </p>
            <span @click="decrement" class="p-cart-dec" :class="{'mp-disabled': count <= 1}">-</span>
            <span class="p-cart-item-count">{{ count }}</span>
            <span @click="increment" class="p-cart-inc" :class="{'mp-disabled': count >= 10}">+</span>
            <span @click="del" class="p-cart-delete">
                <img src="~/assets/icons/delete.svg" alt="Delete from cart" title="Delete from cart" />
            </span>
            <span class="p-cart-price">
                {{ price(totalPrice) }}
            </span>
        </div>

    </main>
</template>

<script>
    const MAX_PIZZA = 10;

    export default {
        asyncData({store, route}) {
            const
                slug = route.params.slug,
                action = `pizza/${slug}`;
            return store.dispatch("page", action);
        },
        computed: {
            count() {
                const
                    cart = this.$store.getters["cart/cart"] || [],
                    count = cart[this.pizza.slug] || 0;
                return count;
            },
            inCart() {
                return (this.count > 0);
            },
            totalPrice() {
                return this.pizza.prices[this.currentCurrency()] * this.count;
            },
        },
        methods: {
            addToCart() {
                this.$store.dispatch("cart/add", this.pizza.slug);
            },
            increment() {
                if (this.count < 10) {
                    this.$store.dispatch("cart/set", {
                        slug: this.pizza.slug,
                        count: this.count + 1,
                    });
                }
            },
            decrement() {
                if (this.count > 1) {
                    this.$store.dispatch("cart/set", {
                        slug: this.pizza.slug,
                        count: this.count - 1,
                    });
                }
            },
            del() {
                this.$store.dispatch("cart/remove", this.pizza.slug);
            },
        },
        mounted() {
            if (this.pizza) {
                this.$store.commit("pizza/current", this.pizza);
            }
        },
    }
</script>

<style lang="scss">
    .pizza-description img {
        float: left;
        max-width: 200px;
        margin-right: 50px;
    }

    .add-to-cart {
        background-color: #28a745;
        border: 1px solid  #28a745;
        color: white;
        padding: 10px 50px;
        font-size: 16px;
        border-radius: 3px;
        cursor: pointer;
    }

    .p-cart-dec {
        color: red;
        font-size: 36px;
        cursor: pointer;
    }
    .p-cart-inc {
        color: green;
        font-size: 36px;
        cursor: pointer;
    }
    .p-cart-item-count {
        font-size: 36px;
        padding: 0 15px;
    }

    .p-cart-delete {
        padding-left: 25px;
        cursor: pointer;
        img {
            width: 25px;
        }
    }
    .p-cart-price {
        padding-left: 50px;
        font-size: 36px;
    }

    .mp-disabled {
        opacity: .5;
    }

</style>
