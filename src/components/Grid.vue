<script>
import { onMounted, onUpdated, h, ref } from 'vue';
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
// THEN to get HTML5 drag&drop
import 'gridstack/dist/h5/gridstack-dd-native';
import WidgetContainer from './WidgetContainer.vue'

export default {
  name: 'Grid',
  props: {
    msg: String
  },
  setup(props, { slots }) {
    // let count = ref(0);
    let items = ref([]);
    let grid = null;
    let refHandler = (el) => {
      items.value.push(el);
    }

    onMounted(() => {
      grid = GridStack.init({
        cellHeight: "100px",
        minRow: 1,
        margin: "10px"
      });

      items.value.forEach((el) => grid.makeWidget(el))
    });

    onUpdated(() => {
      items.value.forEach((el) => grid.makeWidget(el))
    })
    

    return () => {
      const elements = slots.default().map(vnode => h('div', { ref: refHandler, 'gs-w': 3, 'gs-h': 2 }, h(WidgetContainer, { class: 'grid-stack-item-content'}, vnode)));
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
