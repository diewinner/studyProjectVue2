<template>
  <div class="select_wrapper">
    <select id="type-select" v-model="selected" class="select_container" @change="handleChange">
      <option disabled value="">Выберите</option>
      <option v-for="option in options" :value="option?.id || option">{{option?.name || option}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'customSelect',
  props: {
    options:{
      type:Array,
      default:() => []
    }
  },
  data() {
    return {
      selected: ''
    }
  },
  methods: {
    handleChange() {
      this.$emit('selected-type-change', this.selected);
    }
  }
}
</script>

<style>


.select_container {
  padding: 10px;
  font-size: 12px;
  font-weight: 600;
  color: #6e6b7b;
  border: 1px solid rgba(88, 86, 91, 0.2);
  border-radius: 6px;
  min-width: 210px;
  max-width: 400px;
}

.select_container:focus {
  border: 1px solid #FA9009;
  box-shadow: 0 2px 4px 0 rgba(250, 144, 9, 0.30);
}

.select_wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
