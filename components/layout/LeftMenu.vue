<template>
    <nav id="left-menu">
        <menu-pizza-list></menu-pizza-list>
    </nav>
</template>

<script>
    import MenuPizzaList from "./MenuPizzaList";

    export default {
        components: {
            MenuPizzaList,
        },
    }
</script>

<style lang="scss">
    #left-menu {
        @media screen and (max-width: 767px) {
            display: none;
        }
        float: left;
        width: 250px;
        padding: 25px 10px 0 0;
    }
</style>
