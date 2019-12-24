<template>
    <div class="pizza-list">
        <nuxt-link v-for="pizza in types" :to="`/pizza/${pizza.slug}`" :key="pizza.slug">
            <div class="pizza-item">
                <div class="pizza-name">{{ pizza.name }}</div>
                <div class="pizza-photo"><img :src="pizza.photo" :alt="pizza.name"></div>
                <div class="pizza-price">{{ price(pizza.prices) }}</div>
            </div>
        </nuxt-link>
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
    .pizza-list {
        @media screen and (max-width: 767px) {
            text-align: center;
        }
        @media screen and (min-width: 768px) {
            margin-left: -50px;
        }
        a {
            text-decoration: none;
        }
        .pizza-item {
            @media screen and (min-width: 768px) {
                display: inline-block;
                width: 200px;
                height: 200px;
                padding-left: 50px;
            }
            @media screen and (max-width: 767px) {
                margin-bottom: 20px;
            }
            cursor: pointer;
            .pizza-photo img {
                width: 150px;
                height: 150px;
            }
            .pizza-price {
                font-style: italic;
            }
            color: #343a40;
        }
        .pizza-item:hover {
            background-color: #bbbbbb;
        }
    }
</style>
