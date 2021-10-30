<template>
    <WidgetContainer>
      <div class="d-flex flex-column container">
        <div v-if="title" class="d-flex flex-row flex-align-center">{{ title }}</div>
        <div v-if="value" class="flex-grow stat">{{ value }}</div>
      </div>
    </WidgetContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WidgetContainer from './WidgetContainer.vue'

export default defineComponent({
  components: { WidgetContainer },
  props: {
    value: String,
    title: String
  }
});
</script>

<style>
.stat {
  font-size: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}
</style>
