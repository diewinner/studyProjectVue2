<template>
  <div class="page_info">
    <h2 class="title_id">User information:</h2>
    <div class="info_container">
      <div class="info_item">
        <div class="info_title">
          Admin:
        </div>
        <div class="info_edit">
          <span class="info_name" v-if="editFlag === false">{{ data?.admin }}</span>
          <CustomSelect @selected-type-change="handleSelectedAdmin" :options="optionsAdmin" v-else/>
        </div>
      </div>
      <div class="info_item">
        <div class="info_title">
          Имя:
        </div>
        <div class="info_edit">
          <span class="info_name" v-if="editFlag === false">{{ data?.name }}</span>
          <CustomInput v-model="newValues.name" :inputType="inputType" v-else/>
        </div>
      </div>
      <div class="info_item">
        <div class="info_title">
          Имя пользователя:
        </div>
        <div class="info_edit">
          <span class="info_name" v-if="editFlag === false">{{ data?.username }}</span>
          <CustomInput v-model="newValues.username" :inputType="inputType" v-else/>
        </div>
      </div>
      <div class="info_item">
        <div class="info_title">
          Пароль:
        </div>
        <div class="info_edit">
          <span class="info_name" v-if="editFlag === false">{{ data?.password }}</span>
          <CustomInput v-model="newValues.password" :inputType="inputType" v-else/>
        </div>
      </div>
      <CustomButton :nameBtn="editFlag ? saveBtn : editBtn"
                    @click="editFlag === false ? editInfo() : saveInfo(panel.id)"/>
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/customInput.vue";
import CustomSelect from "@/components/customSelect.vue";
import CustomButton from "@/components/customButton.vue";

export default {
  components: {CustomButton, CustomSelect, CustomInput,},
  layout: 'authUser',
  asyncData({params}) {
    const panelId = params.id;
    return {
      panel: {
        id: panelId,
      },
    };
  },
  data() {
    return {
      optionsAdmin: [
        {
          id: true,
          name: 'true',
        },
        {
          id: false,
          name: 'false'
        }
      ],
      inputType: 'text',
      editFlag: false,
      saveBtn: 'Save',
      editBtn: 'Edit',
      data: null,
      newValues: {
        admin: '',
        name: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleSelectedAdmin(selectedType) {
      this.newValues.admin = selectedType
    },
    editInfo() {
      this.editFlag = true
      this.newValues.name = this.data?.name
      this.newValues.username = this.data?.username
      this.newValues.password = this.data?.password
    },
    async saveInfo(id) {
      await this.$api.put(`panel/admin/${id}`, this.newValues)
        .then(() => console.log('success'))
      this.editFlag = !this.editFlag
    },

  },
}
</script>


