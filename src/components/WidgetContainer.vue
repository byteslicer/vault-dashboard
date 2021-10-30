<template>
    <ElCard shadow="hover">
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData"><slot :name="name" v-bind="slotData" /></template>
    </ELCard>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue';
import { ElCard } from 'element-plus'

export default defineComponent({
    components: { ElCard },
    setup(props, {slots}) {
        
    }
})

</script>

<style>

</style>
