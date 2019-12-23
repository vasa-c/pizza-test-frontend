<template>
  <main>
      <h1>Our Pizza is the Best!</h1>

      <p>Sorry, but it is test project.
          So we won't be able to deliver you pizza :(
      </p>

      <p>See <a href="https://github.com/vasa-c/pizza-test-backend">source code repo</a> for details.</p>

      <p>Names of pizza types, descriptions and photos taken from <a href="https://www.webstaurantstore.com/article/101/types-of-pizza.html">this site</a>.</p>

      <h2>Choose your pizza</h2>

      <pizza-types></pizza-types>
  </main>
</template>

<script>
import PizzaTypes from "~/components/PizzaTypes";

export default {
    components: {
        PizzaTypes,
    },
}
</script>

<style>
</style>
