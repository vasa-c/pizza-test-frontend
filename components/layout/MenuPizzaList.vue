<template>
    <ul>
        <li v-for="pizza in types">
            <nuxt-link :to="`/pizza/${pizza.slug}`">{{ pizza.name }}</nuxt-link>
        </li>
    </ul>
</template>

<script>
    export default {
        computed: {
            types() {
                return this.$store.getters["pizza/types"];
            },
        },
    }
</script>

<style lang="scss">

</style>
