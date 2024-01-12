<template>
  <div class="page_container">
    <div class="extra_info">
      <div class="create_form">
        <h3 class="create_title">Создать проект</h3>
        <createForm :formItems="createProjectInputs"/>
        <div class="create_project_item">
          <span class="assign_operator_item_title">Тип проекта</span>
          <customSelect :options="options" @selected-type-change="handleSelectedTypeChange"/>
        </div>
        <CustomButton :nameBtn="createProjectBtn" @click="createProject"/>
      </div>
      <div class="create_form">
        <h3 class="create_title">Назначить оператора</h3>
        <div class="create_project_item">
          <span class="item_title">Выберите проект</span>
          <customSelect :options="list" @selected-type-change="handleSelectedProject"/>
        </div>
        <div class="create_project_item">
          <span class="item_title">Выбери оператора</span>
          <customSelect :options="listOperators" @selected-type-change="handleSelectedOperator"/>
        </div>
        <customButton :nameBtn="assignOperatorBtn" @click="assignOperator"/>
      </div>
    </div>
    <h3 class="table_title">Список проектов</h3>
    <customTable :theadArr="theadArr" :list="list">
      <template v-slot:extraBtn="slotProps">
        <div class="table_btn">
          <CustomButton @click="deleteProject(slotProps.unit?.id)" :nameBtn="deleteBtn"/>
        </div>
      </template>
      <template v-slot:extraBtnSec="slotProps">
        <div class="table_btn">
          <nuxt-link :to="`/projects/${slotProps.unit?.id}`" :params="{id:slotProps.unit?.id}">
            <CustomButton :nameBtn="detailsBtn"/>
          </nuxt-link>
          <CustomButton @click="deleteOperInProject(bunchId)" :nameBtn="deleteOperInProjectBtn"/>
        </div>
      </template>
    </customTable>
  </div>
</template>

<script>
import CreateForm from "@/components/createForm.vue";
import CustomButton from "@/components/customButton.vue";
import CustomTable from "@/components/customTable.vue";
import CustomSelect from "@/components/customSelect.vue";

export default {
  components: {CustomSelect, CustomTable, CustomButton, CreateForm},
  layout: 'authUser',
  data() {
    return {
      options: ['входящий', 'исходящий', 'автоинформатор'],
      bunchId: '',
      deleteOperInProjectBtn: 'Убрать оператора',
      assignOperatorBtn: 'Назначить оператора',
      selectedOperator: '',
      selectedProject: '',
      detailsBtn: 'Подробнее',
      deleteBtn: 'Удалить',
      list: [],
      listOperators: [],
      theadArr: ['ID', 'Имя', 'Тип проекта'],
      selectedType: '',
      createProjectBtn: 'Создать проект',
      createProjectInputs: [
        {
          labelId: 'name',
          labelName: 'Имя',
          inputValue: '',
          inputType: 'text',
          inputPlaceholder: 'Введите имя проекта...',
        },
      ]
    }
  },
  async created() {
    await this.getTableDataProjects()
    await this.getTableDataOperators()
  },
  methods: {
    handleSelectedTypeChange(selectedType) {
      this.selectedType = selectedType
    },
    handleSelectedProject(selectedProject) {
      this.selectedProject = selectedProject
    },
    handleSelectedOperator(selectedOperator) {
      this.selectedOperator = selectedOperator
    },
    async createProject() {
      await this.$api.post('api/project/new', {
        name: this.createProjectInputs[0].inputValue,
        typeProject: this.selectedType
      })
        .then(() => this.getTableDataProjects())
        .catch(e => console.log(e))
    },
    async getTableDataProjects() {
      await this.$api.$get('api/project/list')
        .then((res) => {
          this.list = res.data
          console.log(this.list)
        })
        .catch(e => console.log(e))
      console.log(this.$cookies.get('token'))
    },
    async getTableDataOperators() {
      await this.$api.$get('api/operator/list')
        .then((res) => {
          this.listOperators = res.data
          console.log(this.listOperators)
        })
        .catch(e => console.log(e))
      console.log(this.$cookies.get('token'))
    },
    async deleteProject(id) {
      await this.$api.$delete(`api/project/${id}`)
        .then(() => this.getTableDataProjects())
        .catch(e => console.log(e))
    },
    async assignOperator() {
      await this.$api.$post(`api/project/assign`, {idOperator: this.selectedOperator, idProject: this.selectedProject})
        .then(res => this.bunchId = res?.id)
        .catch(e => console.log(e))
    },
    async deleteOperInProject(id) {
      await this.$api.$delete(`api/project/remove/${id}`)
        .then(() => console.log('operator has been deleted in project'))
        .catch(e => console.log(e))
    }
  },
}
</script>

<style scoped>
.extra_info {
  display: flex;
  gap: 200px;
}

.create_project_item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
