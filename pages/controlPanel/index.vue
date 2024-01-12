<template>
  <div class="page_container">
    <div class="create_form">
      <h3 class="create_title">Создать пользователя</h3>
      <div class="select">
        <span class="item_title">Admin</span>
        <customSelect :options="options" @selected-type-change="handleSelectedChange"/>
      </div>
      <createForm :formItems="formItems"/>
      <customButton :nameBtn="registrUserBtn" @click="registrationUser"/>
    </div>
    <h3 class="table_title">Список пользователей</h3>
    <customTable :theadArr="theadArr" :list="list">
      <template v-slot:extraBtn="slotProps">
        <div class="table_btn">
          <CustomButton @click="deleteUser(slotProps.unit?.id)" :nameBtn="deleteBtn"/>
        </div>
      </template>
      >
    </customTable>
  </div>
</template>

<script>
import CustomTable from "@/components/customTable.vue";
import CreateForm from "@/components/createForm.vue";
import CustomSelect from "@/components/customSelect.vue";
import CustomButton from "@/components/customButton.vue";

export default {
  components: {CustomButton, CustomSelect, CreateForm, CustomTable},
  layout: 'authUser',
  data() {
    return {
      deleteBtn: 'Удалить',
      detailBtn: 'Подробнее',
      registrUserBtn: 'Зарегистрировать пользователя',
      options: [true, false],
      selected: null,
      formItems: [
        {
          labelId: 'name',
          labelName: 'Имя',
          inputValue: '',
          inputType: 'text',
          inputPlaceholder: 'Enter name...',
        },
        {
          labelId: 'password',
          labelName: 'Пароль',
          inputValue: '',
          inputType: 'text',
          inputPlaceholder: 'Enter password...',
        },
        {
          labelId: 'username',
          labelName: 'Имя пользователя',
          inputValue: '',
          inputType: 'text',
          inputPlaceholder: 'Enter placeholder...',
        },
      ],
      list: [],
      theadArr: ['ID', 'Имя', 'Имя пользователя', 'Пароль', 'Admin']
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    async getData() {
      await this.$api.$get(`panel/user/list_users`)
        .then(res => this.list = res.data)
        .catch(e => console.log(e));
    },


    async registrationUser() {
      await this.$api.$post(`panel/admin/new_user`,
        {
          admin: this.selected,
          name: this.formItems[0].inputValue,
          password: this.formItems[1].inputValue,
          username: this.formItems[2].inputValue
        }
      )
        .then(() => this.getData())
    },
    async deleteUser(id) {
      await this.$api.$delete(`panel/admin/${id}`)
        .then(() => this.getData())
        .catch((e) => console.log(e))
    },
    handleSelectedChange(selected) {
      this.selected = selected
    }
  }
}
</script>

<style scoped>
.select {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

</style>
