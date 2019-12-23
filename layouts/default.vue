<template>
    <div>
        <layout-header></layout-header>
        <nuxt />
    </div>
</template>

<script>
    import LayoutHeader from "~/components/layout/LayoutHeader";

    export default {
        components: {
            LayoutHeader,
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
