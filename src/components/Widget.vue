<template>
  <div class="grid-item">
    Test
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  components: { Widget },
  props: {
    widget: Object,
  },
  setup(props) {},
});
</script>

<style>
.grid-container {
  height: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
}

.grid-item {
  grid-column-start: auto;
  grid-column-end: auto;
  grid-row-start: auto;
  grid-row-end: auto;

  background-color: blueviolet;
}
</style>
