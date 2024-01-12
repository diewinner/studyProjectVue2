<template>
  <div class="main_container">
    <nuxt-link to="/login">Войти</nuxt-link>
  </div>
</template>

<script>
export  default  {
  middleware: 'authenticated',

}
</script>
