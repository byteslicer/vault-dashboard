<template>
  <el-button class="settings" type="primary" icon="el-icon-setting" circle  @click="dialogVisible = true"></el-button>
  <el-dialog
    v-model="dialogVisible"
    title="Settings"
    width="50%"
  >
    <prism-editor class="my-editor" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save"
          >Save</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

import { useConfigStore } from '../stores/config';

export default defineComponent({
  components: { PrismEditor },
  setup() {
    const config = useConfigStore();
    const code = ref(JSON.stringify(config.widgets, null, 2));
    const dialogVisible = ref(false)

    const highlighter = (code) => highlight(code, languages.json); // languages.<insert language> to return html with markup
    
    const save = () => {
      dialogVisible.value = false;
      config.widgets = JSON.parse(code.value);
    }

    return {
      save,
      code,
      highlighter,
      dialogVisible,
    }
  },
});
</script>

<style scoped>
.settings {
  margin-left: 10px;
}

.my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }

  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>
