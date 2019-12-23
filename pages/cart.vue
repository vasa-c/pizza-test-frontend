<template>
    <main>
        <h1>Shopping Cart</h1>

        <p v-if="isEmpty">Your cart is empty.</p>

        <template v-if="!isEmpty">
            <cart-items></cart-items>
            <cart-form></cart-form>
        </template>

    </main>
</template>

<script>
    import CartItems from "~/components/cart/CartItems";
    import CartForm from "~/components/cart/CartForm";

    export default {
        components: {
            CartItems,
            CartForm,
        },
        computed: {
            isEmpty() {
                return (this.$store.getters["cart/count"] === 0);
            },
        },
        mounted() {
            this.setPageTitle("Shopping Cart");
        },
    }
</script>

<style>
</style>
