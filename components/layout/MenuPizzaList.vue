<template>
    <ul class="pizza-menu">
        <li v-for="pizza in types" class="pizza-menu-item" :class="{current: (pizza.slug === currentSlug)}" :key="pizza.slug">
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
    list-style: none;
    padding-left: 0;
    .pizza-menu-item {
        list-style-type: none;
        padding: 5px 0;
        border-bottom: 1px solid #cccccc;
        a {
            color: #343a40;
            text-decoration: none;
            display: block;
        }
        cursor: pointer;
    }
    .pizza-menu-item:hover {
        background-color: #eeeeee;
    }
    .pizza-menu-item.current {
        background-color: #eeeeee;
    }
}
</style>
