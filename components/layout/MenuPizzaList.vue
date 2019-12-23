<template>
    <ul class="pizza-menu">
        <li v-for="pizza in types" class="pizza-menu-item" :class="{current: (pizza.slug === currentSlug)}">
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
            currentSlug() {
                const current = this.$store.getters["pizza/current"];
                return current ? current.slug : null;
            },
        },
    }
</script>

<style lang="scss">
.pizza-menu {
    .pizza-menu-item.current {
        font-weight: bold;
    }
}
</style>
