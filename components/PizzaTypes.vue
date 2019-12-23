<template>
    <div class="pizza-list">
        <div v-for="pizza in types" class="pizza-item">
            <div class="pizza-name">{{ pizza.name }}</div>
            <div class="pizza-photo"><img :src="pizza.photo" :alt="pizza.name"></div>
            <div class="pizza-price">&euro;&nbsp;{{ pizza.prices.eur }}</div>
        </div>
    </div>
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
    .pizza-item {
        width: 200px;
        height: 200px;
        display: inline-block;
        .pizza-photo img {
            width: 150px;
            height: 150px;
        }
        .pizza-price {
            font-style: italic;
        }
    }
</style>
