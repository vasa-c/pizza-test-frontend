<template>
    <main>
        <h2>Choose your pizza</h2>

        <pizza-types></pizza-types>
    </main>
</template>

<script>
    import PizzaTypes from "~/components/PizzaTypes";

    export default {
        components: {
            PizzaTypes,
        },
    }
</script>

<style>
</style>
