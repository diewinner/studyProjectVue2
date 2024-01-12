<template>
  <div class="page_container">
      <div class="create_form">
        <h3 class="create_title">Создать оператора</h3>
        <createForm :formItems="createOperatorForm"/>
        <CustomButton @click="registrNewOperator(
        createOperatorForm[0].inputValue,
        createOperatorForm[1].inputValue,
        createOperatorForm[2].inputValue,
        createOperatorForm[3].inputValue,
        createOperatorForm[4].inputValue)"
                      :nameBtn="nameBtn"/>
      </div>
    <h3 class="table_title">Список операторов</h3>
    <customTable :theadArr="theadArr" :list="list">
      <template v-slot:extraBtn="slotProps">
        <div class="table_btn">
          <CustomButton @click="deleteOperator(slotProps.unit?.id)" :nameBtn="deleteBtn"/>
        </div>
      </template>
      <template v-slot:extraBtnSec="slotProps">
        <div class="table_btn">
          <nuxt-link :to="`/operators/${slotProps.unit?.id}`" :params="{id:slotProps.unit?.id}">
            <CustomButton :nameBtn="detailsBtn"/>
          </nuxt-link>
        </div>
      </template>
    </customTable>
  </div>
</template>

<script>
import CustomButton from "@/components/customButton.vue";
import CustomInput from "@/components/customInput.vue";
import CreateForm from "@/components/createForm.vue";
import InfoOperator from "@/components/infoOperator.vue";
import CustomTable from "@/components/customTable.vue";


export default {
  name: 'operatorsTable',
  components: {CustomTable, InfoOperator, CreateForm, CustomInput, CustomButton},
  layout: 'authUser',
  data() {
    return {
      deleteBtn: 'Удалить',
      checkOperator: 'Получить данные об операторе',
      detailsBtn: 'Подробнее',
      createOperatorForm: [
        {
          labelId: 'email',
          labelName: 'Email',
          inputValue: '',
          inputType: 'text',
          inputPlaceholder: 'Enter to email...',
        },
        {
          labelId: 'name',
          labelName: 'Имя',
          inputValue: '',
          inputType: 'text',
          inputPlaceholder: 'Enter to name...',
        },
        {
          labelId: 'surname',
          labelName: 'Фамилия',
          inputValue: '',
          inputType: 'text',
          inputPlaceholder: 'Enter to surname...',
        },
        {
          labelId: 'telephone',
          labelName: 'Телефон',
          inputValue: '',
          inputType: 'text',
          inputPlaceholder: 'Enter to telephone...',
        },
        {
          labelId: 'town',
          labelName: 'Город',
          inputValue: '',
          inputType: 'text',
          inputPlaceholder: 'Enter to town...',
        }
      ],
      nameBtn: 'Зарегистрировать оператора',
      inputType: 'text',
      list: [],
      theadArr: ['id', 'Имя', 'Фамилия', 'Город', 'Телефон', 'Email', 'Пароль', '', ''],
      placeholderArr: {
        email: 'Введите email',
        name: 'Введите имя',
        surname: 'Введите фамилию',
        telephone: 'Введите телефон',
        town: 'Введите город',
      },
      labelId: {
        email: 'email',
        name: 'name',
        surname: 'surname',
        telephone: 'telephone',
        town: 'town'
      },
      createOperator: {
        emailValue: '',
        nameValue: '',
        surnameValue: '',
        telephoneValue: '',
        townValue: '',
      },
      editNameValue: '',
      editSurnameValue: '',
      editTownValue: '',
      editEmailValue: '',
      editTelephoneValue: '',
      personalId: ''
    }
  },
  middleware: 'authenticated',
  async created() {
    await this.getTableData()
  },
  methods: {
    async deleteOperator(id) {
      await this.$api.$delete(`api/operator/${id}`)
        .then(() => this.getTableData())
        .catch(e => console.log(e))
    },
    async getTableData() {
      await this.$api.$get('api/operator/list')
        .then((res) => {
          this.list = res.data
        })
        .catch(e => console.log(e))
    },

    async registrNewOperator(email, name, surname, telephone, town) {
      await this.$api.$post('api/operator/new', {
        email: email,
        name: name,
        surname: surname,
        telephone: telephone,
        town: town
      })
        .then(() => this.getTableData())
        .catch(e => console.log(e))
    },
  },
}
</script>

<style scoped>

</style>

