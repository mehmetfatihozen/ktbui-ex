<template>
  <div>
    <tree
        :data="treeData"
        :options="treeOptions"
        @node:selected="onNodeSelected"
    />
  </div>
</template>

<script>
export default {
  data(){
    return{
      treeData: this.getData(),
      treeOptions: {
      }
    }
  },
  methods:{
    getData() {
      return Promise.resolve([
        { text: 'Item 1' },
        { text: 'Item 2', state: { expanded: true }, children: [
            { text: 'Item 2.1' },
            { text: 'Item 2.2' },
            { text: 'Item 2.3' }
          ]},
        { text: 'Item 3', state: { selected: true } },
        { text: 'Item 4' }
      ])
    },

    onNodeSelected(node) {
      console.log(node.text)
    }
  }
}
</script>