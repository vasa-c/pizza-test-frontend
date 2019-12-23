<template>
    <main>
        <h1>Shopping Cart</h1>

        <p v-if="isEmpty">Your cart is empty.</p>

        <template v-if="!isEmpty">
            <cart-items></cart-items>
        </template>

    </main>
</template>

<script>
    import CartItems from "~/components/cart/CartItems";

    export default {
        components: {
            CartItems,
        },
        computed: {
            isEmpty() {
                return (this.$store.getters["cart/count"] === 0);
            },
        },
    }
</script>

<style>
</style>
