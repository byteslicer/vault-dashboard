<script lang="ts">
import { ElCard } from 'element-plus';
import {
  defineComponent,
  computed,
  toRefs,
  ref,
  Ref,
  ComputedRef,
  PropType,
  DefineComponent,
  h,
} from 'vue';
// import { nanoid } from 'nanoid';

export interface Widget {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  component: DefineComponent<{}, {}, any>;
}

export interface ComputedWidget extends Widget {
  style: Record<string, any>;
}

const useGrid = (
  widgets: Ref<Widget[]>
): ComputedRef<Record<string, ComputedWidget>> => {
  const out = computed(() => {
    return widgets.value.reduce((acc, widget) => {
      acc[widget.id] = {
        ...widget,
        style: {
          gridColumnStart: widget.x + 1, // X
          gridRowStart: widget.y + 1, // Y
          gridColumnEnd: `span ${widget.width}`,
          gridRowEnd: `span ${widget.height}`,
        },
      };
      return acc;
    }, {} as Record<string, ComputedWidget>);
  });

  return out;
};

// function convertToGridPos(element, x, y) {
//   const cellWidth = element.offsetWidth / 6;
//   const cellHeight = element.offsetHeight / 6;

//   return {
//     x: Math.floor(x / cellWidth) + 1,
//     y: Math.floor(y / cellHeight) + 1,
//   };
// }

export default defineComponent({
  props: {
    widgets: {
      type: Array as PropType<Widget[]>,
      required: true,
    },
  },
  setup(props) {
    const { widgets } = toRefs(props);
    console.log('setup');
    const styledWidgets = useGrid(widgets);

    return () =>
      h(
        'div',
        { class: 'grid-container' },
        Object.values(styledWidgets.value).map(widget =>
          h('div', { class: 'grid-item', style: widget.style as any }, [
            h(ElCard, { style: 'height: 100%;' }, h(widget.component)),
          ])
        )
      );
  },
});
</script>

<style>
.grid-container {
  padding-top: 20px;
  padding: 12px 10px 10px 10px;
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
}
</style>
