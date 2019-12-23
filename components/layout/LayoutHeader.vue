<template>
    <header>
        <div class="wrapper">
            <nuxt-link to="/">
                <div id="logo">
                    PT
                </div>
            </nuxt-link>
            <div id="user-block">
                <nuxt-link to="/cart">
                    <img src="~/assets/icons/shopping.svg" alt="Shopping cart" class="cart-icon" />
                    <span class="cart-count" v-if="cartCount">{{ cartCount }}</span>
                </nuxt-link>
            </div>
            <br style="clear:both" />
        </div>
    </header>
</template>

<script>
    export default {

        computed: {

            cartCount() {
                return this.$store.getters["cart/count"];
            },
        },

    }
</script>

<style lang="scss">
    header {
        background-color: #343a40;
    }
    #logo {
        display: inline-block;
        color: white;
        font-size: 32px;
        margin: 5px 0;
        padding: 5px;
        border: 2px solid white;
        border-radius: 5px;
        float: left;
    }
    #user-block {
        float: right;
        color: white;
        padding: 15px;
        .cart-icon {
            width: 20px;
        }
    }
    .cart-count {
        color: white;
        font-size: 12px;
        display: inline-block;
        background-color: #ee2459;
        border-radius: 10px;
        width: 15px;
        height: 15px;
        margin-left: -10px;
        text-align: center;
    }
</style>
