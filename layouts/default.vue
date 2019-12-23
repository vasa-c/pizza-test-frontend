<template>
    <div>
        <layout-header></layout-header>
        <section id="center">
            <div class="wrapper">
                <left-menu></left-menu>
                <nuxt />
            </div>
        </section>
        <layout-footer></layout-footer>
    </div>
</template>

<script>
    import LayoutHeader from "~/components/layout/LayoutHeader";
    import LayoutFooter from "~/components/layout/LayoutFooter";
    import LeftMenu from "~/components/layout/LeftMenu";

    export default {
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
    }
    main {
        float: left;
    }
</style>
