<template>
  <div class="table_container">
  <table class="table">
    <thead class="thead_container">
    <th class="t_item_header t_item" v-for="item in theadArr">
      {{ item }}
    </th>
    </thead>
    <tbody class="tbody_container">
    <tr class="tr_operator" v-for="unit in paginatedData">
      <td class="t_item_body t_item" v-for="info in unit">{{ info }}</td>
      <slot name='extraBtn' v-bind:unit="unit"></slot>
      <slot name='extraBtnSec' v-bind:unit="unit"></slot>
    </tr>
    </tbody>
  </table>
    <div  v-if="list.length >= size">
      <CustomButton @click="prevPage" :nameBtn="prevNameBtn" :disabled="pageNumber===0"/>
      <CustomButton @click="nextPage" :nameBtn="nextNameBtn" :disabled="pageNumber >= pageCount - 1"/>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/customButton.vue";

export default {
  name: 'customTable',
  components: {CustomButton},
  props: {
    name: 'customTable',
    components: {CustomButton},
    theadArr: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default: () => [],
    },
    size:{
      type:Number,
      required:false,
      default: 5
    },
  },
  data() {
    return {
      prevNameBtn:'Назад',
      nextNameBtn:'Вперед',
      pageNumber:0,
    }
  },
  methods:{
    nextPage(){
      this.pageNumber++;
    },
    prevPage(){
      this.pageNumber--;
    }
  },
  computed: {
    pageCount(){
      let l = this.list.length,
        s = this.size;
      return Math.ceil(l/s);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.list.slice(start, end);
    }
  },
}
</script>

<style scoped>
.table_container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.table {
  border: 1px solid rgba(250, 144, 9, 0.40);
  border-collapse: collapse;
  width: 50em;
}


.thead_container {
  display: flex;
  gap: 50px;
  background: rgba(250, 144, 9, 0.20);
  height: 50px;
  border: 1px none rgba(250, 144, 9, 0.20);
  border-bottom-style: solid;
  padding: 20px;
}

.t_item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5em;
  max-width: 300px;
}


.tr_operator {
  display: flex;
  gap: 50px;
  background: rgba(250, 144, 9, 0.05);
  border: 1px none rgba(250, 144, 9, 0.20);
  border-bottom-style: solid;
  padding: 20px;
}

.tr_operator:last-child {
  border: none;
}

.t_item_header {
  color: #4B465C;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 15px;
  font-weight: 700;
}

.t_item_body {
  color: #334155;
  font-feature-settings: 'clig' off, 'liga' off;
  font-size: 15px;
  word-break: break-word;
}


</style>
