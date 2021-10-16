<script>
import { onMounted, onUpdated, h, ref, provide } from 'vue';
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
// THEN to get HTML5 drag&drop
import 'gridstack/dist/h5/gridstack-dd-native';
import WidgetContainer from './WidgetContainer.vue'
import { nanoid } from 'nanoid'

export default {
  name: 'Grid',
  props: {
    msg: String
  },
  setup(props, { slots }) {
    // let count = ref(0);
    let items = ref([]);
    let grid = ref(null);
    let refHandler = (el) => {
      items.value.push(el)
    }

    onMounted(() => {
      grid.value = GridStack.init({
        cellHeight: "150px",
        minRow: 1,
        margin: "10px"
      });

      items.value.forEach((el) => grid.value.makeWidget(el))
    });

    onUpdated(() => {
      items.value.forEach((el) => grid.value.makeWidget(el))
    })

    provide('Grid', grid)
    

    return () => {
      const elements = slots.default().map(vnode => {
        let id = nanoid();
        return h('div', { ref: refHandler, 'gs-w': 4, 'gs-h': 2, 'id': id }, h(WidgetContainer, { class: 'grid-stack-item-content' }, h(vnode, { gridId: id }))) 
      });
      return h('div', { class: { 'grid-stack': true } }, elements);
    }
  }
}
</script>


<style>
.grid-stack-item-content {
  overflow-y: hidden;
}
</style>
