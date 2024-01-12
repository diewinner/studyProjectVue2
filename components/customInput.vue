<template>
  <ValidationProvider
    class="validator_container"
    :rules="validate"
    v-slot="{ errors }"
  >
    <transition name="animation_error">
      <span v-show="errors[0]" class="error_message">{{ errors[0] }}</span>
    </transition>
    <input
      ref="inputContainer"
      class="custom_input"
      :id="id"
      :type="inputType"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </ValidationProvider>
</template>

<script>
import { extend, ValidationProvider } from "vee-validate";

extend("validateUsername", (value) => {
  if (!value) {
    return "Поле пустое!";
  }
  const regex = /^[a-zA-Z0-9]{4,10}$/i;
  if (!regex.test(value)) {
    return "Используй буквы и цифры(4-10)";
  }
  return true;
});
export default {
  components: { ValidationProvider },
  props: {
    inputType: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    validate: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.animation_error-enter-active {
  transition: all 0.8s cubic-bezier(0, 0.2, 0.8, 1);
  transform: translateX(0px);
  opacity: 1;
}

.animation_error-enter,
.animation_error-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
