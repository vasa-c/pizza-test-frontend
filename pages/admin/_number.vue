<template>
    <main>
        <h1>Order #{{ order.number }}</h1>

        <p><nuxt-link to="/admin">&larr; See all orders</nuxt-link></p>

        <table class="admin-order-table">
            <tbody>
                <tr><td>User:</td><td>{{ order.user_name }}</td></tr>
                <tr><td>E-mail:</td><td>{{ order.email }}</td></tr>
                <tr><td>Address:</td><td>{{ order.address }}</td></tr>
                <tr><td>Contacts:</td><td>{{ order.contacts }}</td></tr>
                <tr><td>Delivery:</td><td v-if="order.outside">outside</td><td v-else>inside</td></tr>
                <tr>
                    <td>Price</td>
                    <td>
                        <b>{{ price(order.total_price, null, order.currency) }}</b>
                        <template v-if="order.delivery_price">
                            (including delivery cost {{ price(order.delivery_price, null, order.currency )}})
                        </template>
                    </td>
                </tr>
                <tr>
                    <td>Created:</td>
                    <td>{{ order.created_at }}</td>
                </tr>
                <tr v-if="order.finalized_at">
                    <td>Finalized:</td>
                    <td>{{ order.finalized_at }}</td>
                </tr>
            </tbody>
        </table>

        <h2>Status is "{{ order.status }}"</h2>

        <template v-if="order.status === 'created'">
            Call to the customer.
            <div>
                <button class="status-button" @click="change('delivery')">Send to delivery</button>
                <button class="status-button" @click="change('fail')">Cancel</button>
            </div>
        </template>
        <template v-if="order.status === 'delivery'">
            Pizza on the way.
            <div>
                <button class="status-button" @click="change('success')">Delivered!</button>
                <button class="status-button" @click="change('fail')">Fail</button>
            </div>
        </template>
        <template v-if="order.status === 'success'">
            It is final status.
            Order is successfully closed.
        </template>
        <template v-if="order.status === 'fail'">
            It is final status.
            Order is closed.
        </template>

    </main>
</template>

<script>
    export default {
        data() {
            return {
                wait: false,
            };
        },
        asyncData({store, route, error}) {
            const
                number = route.params.number,
                page = `admin/${number}`;
            return store.dispatch("securePage", {
                page,
                error,
            });
        },
        computed: {
        },
        methods: {
            change(status) {
                if (this.wait) {
                    return;
                }
                this.wait = true;
                this.$store.dispatch("api", {
                    action: `admin/${this.order.number}/status`,
                    data: {
                        status: status,
                    }
                }).then((response) => {
                    this.wait = false;
                    this.order = response.data.order;
                }).catch((error) => {
                    this.wait = false;
                });
            },
        },
        mounted() {
            if (this.order) {
                this.setPageTitle(`Order #${this.order.number} admin`);
            }
        },
    }
</script>

<style lang="scss">
    .admin-order-table td {
        padding: 3px 10px;
    }
    .status-button {
        margin: 20px 20px 0 0;
        border: 1px solid black;
        padding: 5px 25px;
        background-color: white;
        font-size: 16px;
        border-radius: 3px;
        cursor: pointer;
    }
    .status-button:hover {
        background-color: #bbbbbb;
    }
</style>
