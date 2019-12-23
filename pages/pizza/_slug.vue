<template>
    <main>
        <h2>{{ pizza.name }} pizza</h2>

        <div class="pizza-description">
            <img :src="pizza.photo" :alt="pizza.name" />
            {{ pizza.description }}
        </div>
        <br style="clear:both" />


    </main>
</template>

<script>
    export default {
        asyncData({store, route}) {
            const
                slug = route.params.slug,
                action = `pizza/${slug}`;
            return store.dispatch("page", action);
        },
    }
</script>

<style lang="scss">
    .pizza-description img {
        float: left;
        max-width: 200px;
        margin-right: 50px;
    }

</style>
