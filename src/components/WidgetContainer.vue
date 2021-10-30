<template>
  <ElCard shadow="hover">
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData"
      ><slot :name="name" v-bind="slotData"
    /></template>
  </ElCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElCard } from 'element-plus';

export default defineComponent({
  components: { ElCard },
});
</script>

<style></style>
