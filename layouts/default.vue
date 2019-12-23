<template>
    <div>
        <layout-header></layout-header>
        <nuxt />
        <layout-footer></layout-footer>
    </div>
</template>

<script>
    import LayoutHeader from "~/components/layout/LayoutHeader";
    import LayoutFooter from "~/components/layout/LayoutFooter";

    export default {
        components: {
            LayoutHeader,
            LayoutFooter,
        },
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        font-family: "Ubuntu", sans-serif;
    }
    .wrapper {
        max-width: 1280px;
        margin: auto;
    }
</style>
