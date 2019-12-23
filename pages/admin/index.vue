<template>
    <main>
        <h1>Hi, admin</h1>

        <p v-if="!groups.length">No orders... :(</p>

        <template v-for="group in groups">
            <h2>{{ group.title }} ({{ group.count }})</h2>

            <div v-for="order in group.orders" :key="order.number" style="padding-bottom: 10px;">
                <nuxt-link to="`/admin/${order.number}`">#{{ order.number }}</nuxt-link>;
                {{ price(order.total_price, 1, order.currency) }}
            </div>

        </template>

    </main>
</template>

<script>
    export default {
        asyncData({store}) {
            return store.dispatch("page", "admin");
        },
        computed: {

            groups() {
                const
                    keys = ["created", "delivery", "success", "fail"],
                    groups = {},
                    result = [];
                for (const key of keys) {
                    groups[key] = {
                        title: key,
                        orders: [],
                    };
                }
                for (const order of this.orders) {
                    const
                        status = order.status,
                        group = groups[status];
                    if (group) {
                        group.orders.push(order);
                    }
                }
                for (const key of keys) {
                    const group = groups[key];
                    group.count = group.orders.length;
                    if (group.count > 0) {
                        result.push(group);
                    }
                }
                return result;
            },

        },
        mounted() {
            this.setPageTitle("Admin Area");
        },
    }
</script>

<style lang="scss">

</style>
