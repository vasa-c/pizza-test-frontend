<template>
    <main v-if="user">
        <h1>{{ user.name }}</h1>

        <p>{{ user.email }}, {{ user.address }}, {{ user.contacts }}</p>

        <div v-if="orders.length === 0">No orders</div>

        <div v-if="orders.length > 0">
            <div v-for="order in orders" :key="order.number" class="cabinet-order">
                <div  class="cabinet-order-number">
                    <nuxt-link :to="`/cabinet/${order.number}`">#{{ order.number }}</nuxt-link>
                </div>
                <div  class="cabinet-order-price">
                    {{ price(order.total_price, 1, order.currency) }}
                </div>
                <div class="cabinet-order-status">
                    <span v-if="order.status=='created'" style="background-color:yellow;color:black">Wait call</span>
                    <span v-if="order.status=='delivery'" style="background-color:green;color:white">On the way</span>
                    <span v-if="order.status=='success'" style="background-color:blue;color:white">Success</span>
                    <span v-if="order.status=='fail'" style="background-color:red;color:white">Fail :(</span>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
    export default {
        asyncData({store, error}) {
            return store.dispatch("securePage", {
                page: "cabinet",
                error: error,
            });
        },
        computed: {
            user() {
                return this.$store.getters["user/user"];
            },
        },
        mounted() {
            this.setPageTitle("My Cabinet");
        },
    }
</script>

<style lang="scss">
.cabinet-order {
    background-color: #cccccc;
    padding: 5px;
    margin-bottom: 15px;
    height: 50px;
    width: 600px;
    border-radius: 5px;
}
.cabinet-order-number {
    display: inline-block;
    width: 150px;
    padding-top: 10px;
    a {
        font-size: 20px;
        color: black;
    }
}
.cabinet-order-price {
    display: inline-block;
    width: 150px;
    padding-top: 10px;
}
.cabinet-order-status {
    display: inline-block;
    width: 250px;
    padding-top: 10px;
    text-align: right;
    span {
        display: inline-block;
        color: white;
        padding: 5px 20px;
        border-radius: 10px;
    }
}
</style>
