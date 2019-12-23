<template>
    <header>
        <div class="wrapper">
            <nuxt-link to="/">
                <div id="logo">
                    PT
                </div>
            </nuxt-link>
            <div id="user-block">
                <img src="~/assets/icons/shopping.svg" alt="Shopping cart" class="cart-icon" />
            </div>
            <br style="clear:both" />
        </div>
    </header>
</template>

<script>
    export default {
    }
</script>

<style lang="scss">
    header {
        background-color: #343a40;
    }
    #logo {
        display: inline-block;
        color: white;
        font-size: 32px;
        margin: 5px 0;
        padding: 5px;
        border: 2px solid white;
        border-radius: 5px;
        float: left;
    }
    #user-block {
        float: right;
        color: white;
        padding: 15px;
        .cart-icon {
            width: 20px;
        }
    }
</style>
