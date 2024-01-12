<template>
  <div class="sign_container">
    <div class="sign_wrapper">
      <h4 class="title">Регистрация</h4>
      <div class="sign_inputs">
        <div class="admin_checkbox">
          <input type="checkbox" id="admin" @click="checkFlag = !checkFlag" class="input_checkbox"/>
          <div class="custom_checkbox_icon"></div>
          <label for="admin">admin</label>
        </div>
        <CustomInput v-model="registration.nameValue"
                     :inputType="typeInputName"
                     :placeholder="placeholderName"
                     :validate="usernameValidate"/>
        <CustomInput v-model="registration.usernameValue"
                     :inputType="typeInputName"
                     :placeholder="placeholderUsername"
                     :validate="usernameValidate"/>
        <CustomInput v-model="registration.passwordValue"
                     :inputType="typeInputPassword"
                     :placeholder="placeholderPassword"/>
        <CustomButton
          @click="handleSignUp(
            registration.usernameValue,
            registration.passwordValue,
            true,
            {
              admin:checkFlag,
              name:registration.nameValue,
              password:registration.passwordValue,
              username:registration.usernameValue
            })"
          :nameBtn="nameBtnRegistration"/>
        <div @click="updateSignState(true)" class="nuxt_link">Авторизоваться</div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/customInput.vue";
import CustomButton from "@/components/customButton.vue";

export default {
  components: {
    CustomButton,
    CustomInput,
  },
  props: {
    handleSignUp: {
      type: Function,
    }
  },
  data() {
    return {
      checkFlag: false,
      usernameValidate: 'validateUsername',
      registration: {
        nameValue: '',
        usernameValue: '',
        passwordValue: '',
      },
      typeInputName: 'text',
      typeInputPassword: 'password',
      placeholderName: 'Введите отображаемое имя',
      placeholderUsername: 'Введите логин',
      placeholderPassword: 'Введите пароль',
      nameBtnRegistration: 'Регистрация'
    }
  },

  methods: {
    updateSignState(newState) {
      this.$emit('update:signState', newState);
      console.log(newState)
    },

  },
}
</script>

<style scoped>

.admin_checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
}

.custom_checkbox_icon {
  position: relative;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  background: transparent;
  border: 1.5px solid #B7B5BE;
  border-radius: 4px;
}

.custom_checkbox_icon::before {
  content: "";
  position: absolute;
  display: none;
  width: 18px;
  height: 18px;
  background: #FA9009 url("static/checkedSvg.svg") no-repeat center;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

input:checked ~ .custom_checkbox_icon::before {
  display: block;
}

.admin_checkbox input {
  display: none;
}


.animation_error-enter-active {
  transition: all .8s cubic-bezier(0, 0.2, 0.8, 1.0);
  transform: translateX(0px);
  opacity: 1;
}


.animation_error-enter, .animation_error-leave-to {
  transform: translateX(50px);
  opacity: 0;
}


</style>
