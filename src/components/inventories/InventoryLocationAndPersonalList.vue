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
  name: "InventoryLocationAndPersonalList",
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
          text: 'KÜLTÜR VE TURİZM BAKANLIĞI', state: {selected: true, expanded: true},
          children: [
            {
              text: 'BİLGİ TEKNOLOJİLERİ GENEL MÜDÜRLÜĞÜ', state: {expanded: true}, children: [
                {
                  text: 'YÖNETİM', state: {expanded: true}, children: [
                    {text: 'GENEL MÜDÜR'},
                    {text: 'YAZILIM BİRİMİ'},

                  ]
                },
                {
                  text: 'İNSAN KAYNAKLARI', state: {expanded: true}, children: [
                    {text: 'İNSAN KAYNAKLARI'},
                    {text: 'SEKRETARYA'},

                  ]
                },
              ]
            },

          ]
        },
        {text: 'MUHAMMED YÜCE'},
        {text: 'ABDULKADİR ÖKLÜ'},
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