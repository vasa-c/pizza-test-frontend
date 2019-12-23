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
    </div>
</template>

<script>
    import LayoutHeader from "~/components/layout/LayoutHeader";
    import LayoutFooter from "~/components/layout/LayoutFooter";
    import LeftMenu from "~/components/layout/LeftMenu";

    export default {
        middleware: ["default"],
        components: {
            LayoutHeader,
            LayoutFooter,
            LeftMenu,
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
        max-width: 1280px;
        margin: auto;
        padding: 0 25px;
    }
    #center {
        width: 1280px;
    }
    main {
        float: left;
        max-width: 950px;
        padding-left: 50px;
    }
    h1 {
        font-size: 24px;
    }
    h2 {
        font-size: 20px;
    }
</style>
