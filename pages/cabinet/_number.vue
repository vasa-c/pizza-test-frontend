<template>
    <main>
        <h1>Order #{{ order.number }}</h1>

        <p><nuxt-link to="/cabinet">&larr; See all orders</nuxt-link></p>

        <p>Status: {{ order.status }}</p>
        <p>Contact data: {{ order.user_name }}, {{ order.email }}, {{ order.address }}, {{ order.contacts }}</p>
        <p v-if="order.outside">Delivery outside city</p>
        <p v-if="!order.outside">Delivery inside city</p>

        <p>Total price is <b>{{ price(order.total_price, 1, order.currency) }}</b></p>

        <p>Created at {{ order.created_at }}</p>
        <p v-if="order.finalized_at">Finalized at {{ order.finalized_at }}</p>

        <h2>Pizza</h2>

        <div v-for="item of order.items">
            {{ item.name }}<template v-if="item.count > 1"> x {{ item.count }}</template>
        </div>

    </main>
</template>

<script>
    export default {
        asyncData({store, route}) {
            const
                number = route.params.number,
                action = `cabinet/${number}`;
            return store.dispatch("page", action);
        },
        computed: {
            user() {
                console.log(this.order);
                return this.$store.getters["user/user"];
            },
        },
        mounted() {
            if (this.order) {
                this.setPageTitle(`Order #${this.order.number} details`);
            }
        },
    }
</script>

<style lang="scss">

</style>
