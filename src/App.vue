<template>
  <Grid>
    <div>Test A</div>
    <div>Test B</div>
    <Chart />
    <!-- <Test /> -->
  </Grid>
</template>

<script>
import Grid from './components/Grid.vue'
import Chart from './components/Chart.vue'
// import Test from './components/Test.vue'

export default {
  name: 'App',
  components: {
    Grid,
    Chart,
    // Test
  }
}
</script>

<style>

</style>
