<template>
  <div class="layout_container">
    <div class="header">
    <nuxt-link to="/operators" class="header_item">Список операторов</nuxt-link>
    <nuxt-link to="/projects" class="header_item">Список проектов</nuxt-link>
    <nuxt-link to="/controlPanel" class="header_item">Панель управления</nuxt-link>
    </div>
    <Nuxt/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.layout_container {
}
.header {
  background: rgba(250, 144, 9, 0.20);
  min-height: 75px;
  padding: 20px;
  display: flex;
  gap: 50px;
}
.header_item {
  text-decoration: none;
  color:rgba(51, 65, 85, 0.7);
  font-weight: 700;
  transition: all .2s ease;
}
.header_item:hover {
  color: rgba(51, 65, 85, 1);
}
</style>
