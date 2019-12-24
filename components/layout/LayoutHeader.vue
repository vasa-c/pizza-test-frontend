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
                    <span class="user-block-name mobile-hidden" style="padding-right:15px"><nuxt-link to="/cabinet">{{ user.name }}</nuxt-link></span>
                    <img src="~/assets/icons/logout.svg" style="width:20px;cursor:pointer" alt="Logout" title="logout" @click="logout" class="mobile-hidden" />

                    <span v-if="user.is_admin" style="padding-left:15px" class="mobile-hidden">
                        <nuxt-link to="/admin">
                            <img src="~/assets/icons/tools.svg" style="width:20px;cursor:pointer" title="Admin area" alt="" />
                        </nuxt-link>
                    </span>
                </template>

                <template v-if="!user">
                    <img src="~/assets/icons/login.svg" style="width:20px;cursor:pointer" alt="Login" titlie="Login" @click="signin" class="mobile-hidden" />
                </template>

                <span class="mobile-menu-icon">
                    <img src="~/assets/icons/menu.svg" alt="" @click="toggleMobileMenu" />
                </span>

            </div>
            <br style="clear:both" />
        </div>
        <mobile-menu></mobile-menu>
    </header>
</template>

<script>
    import Currencies from "./Currencies";
    import MobileMenu from "./MobileMenu";

    export default {
        components: {
            Currencies,
            MobileMenu,
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
            toggleMobileMenu() {
                this.$store.commit("toggleMobileMenu");
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
        @media screen and (max-width: 767px) {
            padding-right: 20px;
        }
        @media screen and (min-width: 768px) {
            padding-right: 50px;
        }
    }
    .user-block-name {
        display:inline-block;
        white-space: nowrap;
        @media screen and (max-width: 767px) {
            display: none;
        }
        @media screen and (min-width: 768px) {
            max-width:150px;
        }
        overflow:hidden;
        a {
            color: white;
        }
    }
    .mobile-menu-icon {
        padding-left: 50px;
        img {
            width: 25px;
        }
    }
</style>
