<template>
  <div>
     <div style="margin-bottom: 20px;">
       <span style="margin-right:20px">省市区</span><input type="text" @click="openPcc" :value="pccV" readonly>
       <bm-region :ranks="3" @output-region="pccOutput" ref="pcc"></bm-region>
     </div>
    <!--存在初始值start-->
    <div style="margin-bottom: 20px;">
      <span style="margin-right:20px">省市区(有初始值)</span><input type="text" @click="openEditPcc" :value="pccEditV" readonly>
      <bm-region :ranks="3" :preData="preData" @output-region="editPccOutput" ref="pccEdit"></bm-region>
    </div>
    <!--存在初始值end-->
    <div style="margin-bottom: 20px;">
      <span style="margin-right:20px">省市区街道</span><input type="text" @click="openPccs" :value="pccsV" readonly>
      <bm-region :ranks="4" @output-region="pccsOutput" ref="pccs"></bm-region>
    </div>
    <div>
      <h4>输出json</h4>
      <p>{{outputJson}}</p>
    </div>
  </div>
</template>
<script>
  /**
   * Created by Wesdint on 2017/6/29.
   */
  export default {
    data () {
      return {
        pccV: '',
        pccsV: '',
        pccEditV: '',
        outputJson: '',
        preData: [
          {dcode: "44", dname: "广东", pcode: "", type: "province"},
          {dcode: "4401", dname: "广州", pcode: "44", type: "city"},
          {dcode: "440106", dname: "天河区", pcode: "4401", type: "county"}]
      }
    },
    mounted () {
      this.pccEditV = this.preData[0].dname + this.preData[1].dname + this.preData[2].dname
    },
    methods: {
      openPcc () {
        this.$refs.pcc.open()
      },
      openEditPcc () {
        this.$refs.pccEdit.open()
      },
      openPccs () {
        this.$refs.pccs.open()
      },
      pccOutput (data) {
        console.log(data)
        this.outputJson = JSON.stringify(data)
        this.pccV = data.province.data.dname + data.city.data.dname + data.county.data.dname
      },
      pccsOutput (data) {
        console.log(data)
        this.outputJson = JSON.stringify(data)
        this.pccsV = data.province.data.dname + data.city.data.dname + data.county.data.dname + data.street.data.dname
      },
      editPccOutput (data) {
        console.log(data)
        this.outputJson = JSON.stringify(data)
        this.pccEditV = data.province.data.dname + data.city.data.dname + data.county.data.dname
      }
    }
  }
</script>

<style lang="less" scoped>

</style>


