<template>
    <div class="currency-select">
        <span v-for="cur of currencies" :key="cur.key" :class="{'currency-current': cur.current}" @click="change(cur)">
            {{ cur.label }}
        </span>
    </div>
</template>

<script>
    export default {
        computed: {
            currencies() {
                const
                    curs = this.$store.getters["price/currencies"],
                    current = this.$store.getters["price/currentCurrency"],
                    result = [];
                for (const item of curs) {
                    result.push({
                        ...item,
                        current: (current === item.key),
                    });
                }
                return result;
            },
        },
        methods: {
            change(cur) {
                if (!cur.current) {
                    this.$store.dispatch("price/setCurrentCurrency", cur.key);
                }
            },
        },
    }
</script>

<style lang="scss">
    .currency-select {
        display: inline-block;
        padding-right: 50px;
        font-size: 20px;
        span {
            color: #999999;
            padding-left: 10px;
            cursor: pointer;
        }
        span.currency-current {
            font-weight: bold;
            color: white;
            cursor: auto;
        }
    }
</style>
