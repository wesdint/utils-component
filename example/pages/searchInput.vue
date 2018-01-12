<template>
  <div>
    <bm-search-input 
      style="font-size: 14px" 
      v-model="value"
      placeholder="请输入"
      :max-length="10"
      active-color="#1fb8ff"
      submit-text="确 定"
      @focus="focus"
      @blur="blur"
      @doSubmit="doSubmit"></bm-search-input>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: ''
      }
    },
    methods: {
      doSubmit () {
        console.log('submit')
      },
      doCancel () {
        console.log('cancel')
      },
      focus (value) {
        console.log('focus value:' + value)
      },
      blur (value) {
        console.log('blur value:' + value)
      }
    }
  }
</script>