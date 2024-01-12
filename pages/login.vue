<template>
  <div class="main_container">
    <transition name="animation">
      <SignIn v-if="signState" :username="username" :password="password" @update:signState="signState = $event" :handleSignIn="handleSignIn"/>
    </transition>
    <SignUp v-if="!signState" @update:signState="signState = $event" :handleSignUp="handleSignUp"/>
  </div>
</template>

<script>
import SignIn from "~/components/signIn.vue";
import SignUp from "@/components/signUp.vue";
import axios from "axios";

const BASE_URL = 'https://oas.api.training-stands.nextcontact.ru'

export default {
  name: 'IndexPage',
  components: {SignUp, SignIn},
  data() {
    return {
      username: '',
      password: '',
      signState: false,
    }
  },
  methods: {
    async handleSignUp  (updateUsername, updatePassword, newState,registration)  {
      await axios.post(`${BASE_URL}/auth/sign-up`, registration)
        .then(() => {
          this.username = updateUsername;
          this.password = updatePassword;
          this.signState = newState;
        })
        .catch(event => console.log(event.message))
    },
    async handleSignIn(auth) {
      await axios.post(`${BASE_URL}/auth/sign-in`, auth)
        .then((res) => {
          this.$store.commit('userAuth')
          this.$cookies.set('token', res.data.token)
          this.$router.push('operators')
        })
    },
  }
}
</script>

<style>
.main_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}



.animation-enter-active {
  transition: all .8s cubic-bezier(0, 0.2, 0.8, 1.0);
  transform: translateX(0px);
  opacity: 1;
}

.animation-leave-active {
  transition: all .8s cubic-bezier(0, 0.2, 0.8, 1.0);
}

.animation-enter, .animation-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
