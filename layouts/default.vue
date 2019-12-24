<template>
    <div>
        <layout-header></layout-header>
        <div class="wrapper">
            <section id="center">
            <left-menu></left-menu>
            <nuxt />
            </section>
        </div>
        <layout-footer></layout-footer>
        <login-popup v-if="isLoginPopupOpened"></login-popup>
    </div>
</template>

<script>
    import LayoutHeader from "~/components/layout/LayoutHeader";
    import LayoutFooter from "~/components/layout/LayoutFooter";
    import LeftMenu from "~/components/layout/LeftMenu";
    import LoginPopup from "~/components/layout/LoginPopup";

    export default {
        middleware: ["cookie", "default"],
        components: {
            LayoutHeader,
            LayoutFooter,
            LeftMenu,
            LoginPopup,
        },
        computed: {
            isLoginPopupOpened() {
                return this.$store.getters["user/loginPopup"] && (!this.$store.getters["user/user"]);
            },
        },
        head() {
            const pageTitle = this.$store.getters.pageTitle;
            let title = "PizzaTest";
            if (pageTitle) {
                title = `${pageTitle} - ${title}`
            }
            return {
                title: title,
            };
        },
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        font-family: "Ubuntu", sans-serif;
        color: #343a40;
    }
    .wrapper {
        @media screen and (min-width: 768px) {
            max-width: 1280px;
        }
        margin: auto;
        padding: 0 25px;
    }
    #center {
        @media screen and (min-width: 768px) {
            width: 1280px;
        }
    }
    main {
        float: left;
        max-width: 950px;
        padding-left: 50px;
        margin-bottom: 50px;
    }
    h1 {
        font-size: 24px;
    }
    h2 {
        font-size: 20px;
    }
</style>
