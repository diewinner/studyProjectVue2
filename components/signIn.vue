<template>
  <div class="sign_container">
    <div class="sign_wrapper">
      <h4 class="title">Авторизация</h4>
      <div class="sign_inputs">
        <CustomInput v-model="usernameValue" :inputType="typeInputLogin" :placeholder="placeholderLogin"/>
        <CustomInput v-model="passwordValue" :inputType="typeInputPassword" :placeholder="placeholderPassword"/>
        <button type="submit" @click.prevent="handleSignIn({username:usernameValue,password:passwordValue})" class="custom_btn">Авторизоваться</button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/customInput.vue";
import { ValidationProvider } from 'vee-validate';


export default {
  components: {CustomInput, ValidationProvider},
  props: {
    username: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: ''
    },
    handleSignIn: {
      type:Function
    },
  },
  data() {
    return {
      nameBtn: 'Войти',
      typeInputLogin: 'text',
      placeholderLogin: 'Введите логин',
      typeInputPassword: 'password',
      placeholderPassword: 'Введите пароль',
      usernameValue: '',
      passwordValue: '',
    }
  },
  mounted() {
    this.usernameValue = this.username;
    this.passwordValue = this.password;
  },
  watch: {
    username: () => {
      this.usernameValue = this.username
    },
    password: () => {
      this.passwordValue = this.password
    }
  },
  methods: {
    updateSignState(newState) {
      this.$emit('update:signState', newState);
    }
  },
}
</script>

<style scoped>

</style>
