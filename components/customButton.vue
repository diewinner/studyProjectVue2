<template>
  <button class="custom_btn" @click="click">{{nameBtn}}</button>
</template>

<script>
export default {
  props: {
    nameBtn: {
      type:String,
      default:''
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>


