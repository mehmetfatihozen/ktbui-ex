<template>
  <div class="dashboard">
    <div class="left">
      <div class="my-tasks">
        <tree
            :data="treeData"
            :options="treeOptions"
            @node:selected="onNodeSelected"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InventoryCategoryList",
  data() {
    return {
      treeData: this.getData(),
      treeOptions: {}
    }
  },
  methods: {
    getData() {
      return Promise.resolve([
        {
          text: 'BİLGİSAYAR VE EKİPMANLARI (520)', state: {selected: true, expanded: true},
          children: [
            {text: 'BİLGİSAYAR KASASI (123)', state: {expanded: true}, children: [
                {text: 'BİLGİSAYAR KASASI HP (123)'},

              ]
            },
            {text: 'DİĞER (0)'},
            {text: 'KABİNET (1)', state: {expanded: true}, children: [
                {text: 'KABİNET (1)'},

              ]
            },
            {text: 'KLAVYE (115)', state: {expanded: true}, children: [
                {text: 'KLAVYE (115)'},

              ]
            },
            {text: 'MONİTÖR (218)', state: {expanded: true}, children: [
                {text: 'MONİTÖR HP (115)'},
                {text: 'MONİTÖR SAMSUNG (115)'},
                {text: 'MONİTÖR ACER (115)'},

              ]
            },
          ]
        },

      ])
    },

    onNodeSelected(node) {
      console.log(node.text)
    }
  }
}
</script>

<style scoped>

</style>