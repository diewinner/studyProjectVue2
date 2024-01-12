<template>
  <div class="page_info">
    <h2 class="title_id">Operator information:</h2>
    <InfoOperator
      :name="data?.name"
      :surname="data?.surname"
      :town="data?.town"
      :email="data?.email"
      :telephone="data?.telephone"
      :password="data?.password"
      :id="operator.id"
      @update:name="name = $event"
    />
  </div>
</template>

<script>
import InfoOperator from "@/components/infoOperator.vue";

export default {
  components: { InfoOperator},
  layout: 'authUser',
  asyncData({params}) {
    const operatorId = params.id;
    return {
      operator: {
        id: operatorId,
      },
    };
  },
  data() {
    return {
      data: null,
      titles: ['Имя', 'Фамилия', 'Город', 'Email', 'Телефон', 'Пароль']
    };
  },
  methods: {
    async getValue() {
      await this.$api
        .get(`api/operator/${this.operator.id}`)
        .then((res) => (this.data = res.data))
        .then(() => console.log(this.data));
    },
  },
  async created() {
    await this.getValue();
  },
};
</script>


