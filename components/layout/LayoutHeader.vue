<template>
    <header>
        <div class="wrapper">
            <nuxt-link to="/">
                <div id="logo">
                    PT
                </div>
            </nuxt-link>
            <div id="user-block">
                <currencies></currencies>
                <span class="user-block-cart">
                    <nuxt-link to="/cart">
                        <img src="~/assets/icons/shopping.svg" alt="Shopping cart" class="cart-icon" />
                        <span class="cart-count" v-if="cartCount">{{ cartCount }}</span>
                    </nuxt-link>
                </span>

                <template v-if="user">
                    <span class="user-block-name" style="padding-right:15px"><nuxt-link to="/cabinet">{{ user.name }}</nuxt-link></span>
                    <img src="~/assets/icons/logout.svg" style="width:20px;cursor:pointer" alt="Logout" title="logout" @click="logout" />

                    <span v-if="user.is_admin" style="padding-left:15px">
                        <nuxt-link to="/admin">
                            <img src="~/assets/icons/tools.svg" style="width:20px;cursor:pointer" title="Admin area" alt="" />
                        </nuxt-link>
                    </span>
                </template>

                <template v-if="!user">
                    <img src="~/assets/icons/login.svg" style="width:20px;cursor:pointer" alt="Login" titlie="Login" @click="signin" />
                </template>
            </div>
            <br style="clear:both" />
        </div>
    </header>
</template>

<script>
    import Currencies from "./Currencies";

    export default {
        components: {
            Currencies,
        },
        computed: {
            cartCount() {
                return this.$store.getters["cart/count"];
            },
            user() {
                return this.$store.getters["user/user"];
            },
        },
        methods: {
            logout() {
                this.$store.dispatch("user/logout");
            },
            signin() {
                this.$store.dispatch("user/signin");
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
    .user-block-cart {
        padding-right: 50px;
    }
    .user-block-name {
        display:inline-block;
        max-width:150px;
        overflow:hidden;
        a {
            color: white;
        }
    }
</style>
