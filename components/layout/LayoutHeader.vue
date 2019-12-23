<template>
    <header>
        <div class="wrapper">
            <nuxt-link to="/">
                <div id="logo">
                    PT
                </div>
            </nuxt-link>
        </div>
    </header>
</template>

<script>
    export default {
    }
</script>

<style>
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
    }
</style>
