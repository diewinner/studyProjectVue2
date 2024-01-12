<template>
  <div class="info_container">
    <div class="info_item">
      <span class="info_title">Name:</span>
      <div class="info_edit">
        <span class="info_name" v-if="editFlag === false">{{ name }}</span>
        <CustomInput v-model="newValues.name" :inputType="inputType" v-else/>
      </div>
    </div>
    <div class="info_item">
      <span class="info_title">Surname:</span>
      <div class="info_edit">
        <span class="info_name" v-if="editFlag === false">{{ surname }}</span>
        <CustomInput v-model="newValues.surname" :inputType="inputType" v-else/>
      </div>
    </div>
    <div class="info_item">
      <span class="info_title">Town:</span>
      <div class="info_edit">
        <span class="info_name" v-if="editFlag === false">{{ town }}</span>
        <CustomInput v-model="newValues.town" :inputType="inputType" v-else/>
      </div>
    </div>
    <div class="info_item">
      <span class="info_title">Email:</span>
      <div class="info_edit">
        <span class="info_name" v-if="editFlag === false">{{ email }}</span>
        <CustomInput v-model="newValues.email" :inputType="inputType" v-else/>
      </div>
    </div>
    <div class="info_item">
      <span class="info_title">Telephone:</span>
      <div class="info_edit">
        <span class="info_name" v-if="editFlag === false">{{ telephone }}</span>
        <CustomInput v-model="newValues.telephone" :inputType="inputType" v-else/>
      </div>
    </div>
    <div class="info_item">
      <span class="info_title">Password:</span>
      <div class="info_edit">
        <span class="info_name" v-if="editFlag === false">{{ password }}</span>
        <CustomInput v-model="newValues.password" :inputType="inputType" v-else/>
      </div>
    </div>
    <CustomButton :nameBtn="editFlag ? saveBtn : editBtn" @click="editFlag === false ? editInfo() : saveInfo(id)"/>
  </div>
</template>

<script>
import CustomButton from "@/components/customButton.vue";
import CustomInput from "@/components/customInput.vue";

export default {
  name: 'InfoOperator',
  components: {CustomInput, CustomButton},
  props: {
    name: {
      type: String,
      default: ''
    },
    surname: {
      type: String,
      default: ''
    },
    town: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    telephone: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      btn: 'check',
      editBtn: 'Edit',
      saveBtn: 'Save',
      editFlag: false,
      inputType: 'text',
      newValues: {
        email: '',
        name: '',
        password: '',
        surname: '',
        telephone: '',
        town: '',
      }
    }
  },
  methods: {
    editInfo() {
      this.editFlag = true
      this.newValues.email = this.email
      this.newValues.name = this.name
      this.newValues.password = this.password
      this.newValues.surname = this.surname
      this.newValues.telephone = this.telephone
      this.newValues.town = this.town
    },
    async saveInfo(id) {
      await this.$api.put(`api/operator/${id}`, this.newValues)
        .then(this.$api.get(`api/operator/${id}`)
          .then(res => this.newValues = res.data))
      this.editFlag = !this.editFlag
    },
  },

}
</script>

<style scoped>

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
