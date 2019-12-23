<template>
    <div class="cart-form">
        <h2>Your contact details</h2>
        <form @submit.prevent="submit">
            <div class="cart-form-field" v-if="!user"><input type="text" placeholder="E-mail" value="" ref="email" /></div>
            <div class="cart-form-field" v-if="user">{{ user.email }}</div>
            <div class="cart-form-field"><input type="text" placeholder="Name" value="" ref="name" /></div>
            <div class="cart-form-field"><input type="text" placeholder="Address" value="" ref="address" /></div>
            <div class="cart-form-field"><input type="text" placeholder="Contacts" value="" ref="contacts" /></div>
            <div class="cart-form-field">
                <input type="checkbox" id="outside-checkbox" ref="outside" @click="clickOutside" />
                <label for="outside-checkbox">Delivery outside the city (+ &euro;1 if total price less than &euro;100)</label>
            </div>
            <h2>Order price</h2>
            <p>The sum of {{ $store.getters["cart/count"] }} pizza {{ price(pizzaPrice) }} </p>
            <p v-if="deliveryPrice">Delivery cost: {{ price(deliveryPrice) }}</p>
            <p v-if="!deliveryPrice">Delivery if free</p>
            <p>Total price: <b>{{ price(pizzaPrice + deliveryPrice) }}</b></p>

            <button type="submit" class="buy-button" v-if="!wait">Buy</button>
            <p v-if="wait">Please, wait...</p>

            <p v-if="error" style="color:red">Some, error...</p>
        </form>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                order: {
                    pizza: null,
                    currency: null,
                    email: null,
                    name: null,
                    address: null,
                    contacts: null,
                    outside: false,
                },
                wait: false,
                error: false,
            };
        },

        computed: {
            pizzaPrice() {
                const
                    cart = this.$store.getters["cart/cart"],
                    types = this.$store.getters["pizza/bySlug"],
                    cur = this.currentCurrency();
                let price = 0;
                for (const slug in cart) {
                    if (cart.hasOwnProperty(slug)) {
                        const
                            count = cart[slug],
                            type = types[slug];
                        price += type.prices[cur] * count;
                    }
                }
                return price;
            },
            deliveryPrice() {
                if (!this.order.outside) {
                    return 0;
                }
                if (this.pizzaPrice >= 10000) {
                    return 0;
                }
                return 100; // @todo convert
            },
            user() {
                return this.$store.getters["user/user"];
            },
        },

        methods: {
            clickOutside() {
                this.order.outside = this.$refs.outside.checked;
            },
            submit() {
                if (this.wait) {
                    return;
                }
                this.error = false;
                if (!this.loadForm()) {
                    return;
                }
                this.order.outside = this.$refs.outside.checked;
                this.order.pizza = this.$store.getters["cart/cart"];
                this.order.currency = this.currentCurrency();
                this.wait = true;
                this.$store.dispatch("api", {
                    action: "checkout",
                    data: this.order,
                }).then((response) => {
                    const data = response.data;
                    this.wait = false;
                    if (data.order_number) {
                        this.onCheckout(data.order_number, data.user);
                        return;
                    }
                    if (data.req_login) {
                        this.$store.dispatch("user/reqLogin", this.order.email);
                        return;
                    }
                    this.error = true;
                }).catch((error) => {
                    this.wait = false;
                    this.error = true;
                });
            },
            loadForm() {
                let firstError;
                if (!this.user) {
                    const
                        input = this.$refs.email,
                        value = input.value.replace(/^\s+/, "").replace(/\s$/, "");
                    if ((value === "") || (!/^[^@]+@.+$/.test(value))) {
                        input.classList.add("error-input");
                        if (!firstError) {
                            firstError = input;
                        }
                    } else {
                        input.classList.remove("error-input");
                        this.order.email = value;
                    }
                } else {
                    this.order.email = this.user.email;
                }
                for (const key of ["name", "address", "contacts"]) {
                    const
                        input = this.$refs[key],
                        value = input.value.replace(/^\s+/, "").replace(/\s$/, "");
                    if (value === "") {
                        input.classList.add("error-input");
                        if (!firstError) {
                            firstError = input;
                        }
                        continue;
                    }
                    input.classList.remove("error-input");
                    this.order[key] = value;
                }
                if (firstError) {
                    firstError.focus();
                    return false;
                }
                return true;
            },
            onCheckout(number, user) {
                if (user) {
                    this.$store.commit("user/user", user);
                }
                this.$router.push(`/cabinet/${number}`);
                this.$store.dispatch("cart/clear");
            },
        },
        mounted() {
            if (this.user) {
                this.$refs.name.value = this.user.name || "";
                this.$refs.address.value = this.user.address || "";
                this.$refs.contacts.value = this.user.contacts || "";
            }
        },
    };
</script>

<style lang="scss">
    .cart-form-field {
        margin: 15px 0;
        input[type=text] {
            width: 500px;
            height: 25px;
            font-size: 16px;
            border: 1px solid black;
            border-radius: 5px;
            padding: 5px;
        }
        input[type=checkbox] {
            width: 25px;
            height: 25px;
        }
        .error-input {
            border: 2px solid red !important;
        }
    }
    .buy-button {
        background-color: #28a745;
        border: 1px solid #28a745;
        color: white;
        font-size: 16px;
        padding: 10px 50px;
        cursor: pointer;
    }
</style>
