<template>
    <div id="mobile-menu" v-if="isOpened">
        <template v-if="user">
            <nuxt-link to="/admin" v-if="user.is_admin">Admin Area</nuxt-link>
            <nuxt-link to="/cabinet">My Cabinet</nuxt-link>
            <a @click.prevent="logout">Logout</a>
        </template>
        <template v-if="!user">
            <a @click.prevent="signin">Login</a>
        </template>
        <nuxt-link v-for="pizza in pizzaTypes" :to="`/pizza/${pizza.slug}`" :key="pizza.key">{{ pizza.name }}</nuxt-link>
    </div>
</template>

<script>
    export default {
        computed: {
            isOpened() {
                return this.$store.getters.isMobileMenuOpened;
            },
            user() {
                return this.$store.getters["user/user"];
            },
            pizzaTypes() {
                return this.$store.getters["pizza/types"];
            },
            currentPizza() {
                const current = this.$store.getters["pizza/current"];
                return current ? current.slug : null;
            },
        },
        methods: {
            logout() {
                this.$store.commit("closeMobileMenu");
                this.$store.dispatch("user/logout");
            },
            signin() {
                this.$store.commit("closeMobileMenu");
                this.$store.dispatch("user/signin");
            },
        },
    }
</script>

<style lang="scss">
    #mobile-menu {
        @media screen and (min-width: 768px) {
            display: none;
        }
        @media screen and (max-width: 767px) {
            display: block;
        }
        position: absolute;
        background-color: white;
        z-index: 3000;
        left: 0;
        right: 0;
        top: 60px;
        bottom: 0;
        height: 100%;
        a {
            text-decoration: none;
            color: #343a40;
            display: block;
            font-size: 16px;
            padding: 10px 5px 5px 25px;
            border-bottom: 1px solid #eeeeee;
        }
    }
</style>
