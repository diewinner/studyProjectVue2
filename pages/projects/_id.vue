<template>
  <div class="page_info">
    <h2 class="title_id">Project information:</h2>
    <div class="info_container">
      <div class="info_item">
        <div class="info_title">
          Name:
        </div>
        <div class="info_edit">
          <span class="info_name" v-if="editFlag === false">{{ data?.name }}</span>
          <CustomInput v-model="newValues.name" :inputType="inputType" v-else/>
        </div>
      </div>
      <div class="info_item">
        <div class="info_edit">
          <span class="info_name" v-if="editFlag === false">{{ data?.typeProject }}</span>
          <CustomSelect v-else :options="options" @selected-type-change="handleSelectedTypeChange"/>
        </div>
      </div>
    </div>
    <CustomButton :nameBtn="editFlag ? saveBtn : editBtn"
                  @click="editFlag === false ? editInfo() : saveInfo(project.id)"/>
  </div>
</template>

<script>
import CustomButton from "@/components/customButton.vue";
import CustomInput from "@/components/customInput.vue";
import CustomSelect from "@/components/customSelect.vue";

export default {
  components: {CustomSelect, CustomInput, CustomButton},
  layout: 'authUser',
  asyncData({params}) {
    const projectId = params.id;
    return {
      project: {
        id: projectId,
      },
    };
  },
  data() {
    return {
      options: ['входящий', 'исходящий', 'автоинформатор'],
      inputType: 'text',
      editFlag: false,
      saveBtn: 'Save',
      editBtn: 'Edit',
      data: null,
      newValues: {
        name: '',
        typeProject: this.data?.typeProject,
      }
    };
  },
  methods: {
    handleSelectedTypeChange(selectedType) {
      this.newValues.typeProject = selectedType
    },
    editInfo() {
      this.editFlag = true
      this.newValues.name = this.data?.name
    },
    async saveInfo(id) {
      await this.$api.put(`api/project/${id}`, this.newValues)
        .then(this.getValue())
      this.editFlag = !this.editFlag
    },
    async getValue() {
      await this.$api
        .get(`api/project/${this.project.id}`)
        .then((res) => (this.data = res.data))
        .then(() => console.log(this.data))
        .catch(e => console.log(e))
    },
  },
  async created() {
    await this.getValue();
  },
}
</script>


