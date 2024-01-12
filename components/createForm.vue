<template>
  <div class="create_operator_form">
    <div class="create_operator_form_item" v-for="item in formItems">
      <label :for="item.labelId" class="label">{{ item.labelName }}</label>
      <CustomInput v-model="item.inputValue" :id="item.labelId" :inputType="item.inputType"
                   :placeholder="item.inputPlaceholder"/>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/customInput.vue";
import CustomButton from "@/components/customButton.vue";

export default {
  name: 'createForm',
  components: {CustomButton, CustomInput},
  props: {
    formItems: {
      type: Array,
      default: () => []
    }
  },

}
</script>

<style scoped>
.create_operator_form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
}
.create_operator_form_item {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.label {
  color:  #334155;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 15px;
  font-weight: 700;
}
</style>
