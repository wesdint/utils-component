<template>
  <div class="bm-search-input">
    <div class="bm-search-input-wrapper" :class="{active: active}" 
      :style="{color: (active ? activeColor : '#333'), borderBottomColor: (active ? activeColor : '#999')}">
      <svg class="search-icon" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <bm-svg-search-icon :color="active ? activeColor : '#ccc'"></bm-svg-search-icon>
      </svg>
      <div class="search-input-wrapper">
        <input class="search-input" 
          type="text" 
          @blur="blur" 
          @focus="focus" 
          @input="input"
          :value="value"
          :placeholder="placeholder"
          :maxlength="maxLength"
          v-fastclick
          ref="searchInput">
      </div>
      
      <img src="../../assert/icon/delete.png" @click="deleteValue" v-fastclick v-show="value" class="delete-icon" alt="">
      <div class="search-btns" v-fastclick>
        <div v-show="showSubmit" @click="doSubmit">{{ submitText }}</div>
        <div v-show="showCancel" @click="doCancel">{{ cancelText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'bm-search-input',
    props: {
      placeholder: {
        type: String,
        default: '请输入'
      },
      value: null,
      maxLength: {
        type: Number,
        default: 50,
        validator (value) {
          return value > 0 && value % 1 === 0 && value <= 200
        }
      },
      activeColor: {
        type: String,
        default: '#1fb8ff'
      },
      submitText: {
        type: String,
        default: '确 定'
      },
      cancelText: {
        type: String,
        default: '取 消'
      }
    },
    data () {
      return {
        isFocus: false
      }
    },
    computed: {
      active () {
        return !!this.value || this.isFocus
      },
      showSubmit () {
        return !!this.value
      },
      showCancel () {
        return this.isFocus && !this.value
      }
    },
    methods: {
      deleteValue (event) {
        this.$emit('input', '')
        Vue.nextTick(() => {
          this.$refs.searchInput.focus()
        })
      },
      focus (event) {
        this.isFocus = true
        this.$emit('focus', event.target.value)
        Vue.nextTick(() => {
          event.target.select()
        })
      },
      blur (event) {
        this.isFocus = false
        this.$emit('blur', event.target.value)
      },
      input (event) {
        this.$emit('input', event.target.value)
      },
      doSubmit (event) {
        this.$emit('doSubmit', event)
      },
      doCancel (event) {
        // noting todo
        this.$emit('doCancel', event)
      }
    }
  }
</script>

<style lang="less" scoped>
  .bm-search-input {
    padding: 0.429em 0.714em;
    &-wrapper {
      border-bottom: 1px solid #999;
      padding: .5em 0.429em;
      padding-bottom: .143em;
      display: flex;
      align-items: center;
      color: #333;

      .search-icon {
        flex: none;
        width: 2.143em;
        height: 2.143em;
      }
      .search-input-wrapper {
        flex: auto;
        .search-input {
          width: 100%;
          color: #333;
          outline: none;
          border: none;
          height: 1.429em;
          line-height: 1.429em;
          font-size: inherit;
          min-width: 50px;
          &::-webkit-input-placeholder {
            color: #999;
          }
        }
      }
      
      .delete-icon {
        flex: none;
        width: 1.429em;
      }
      .search-btns {
        flex: none;
        padding-left: .857em;
      }
    }

    &-wrapper.active {
      border-bottom: 1px solid #1fb8ff;
      color: #1fb8ff;
    }
    
  }
</style>