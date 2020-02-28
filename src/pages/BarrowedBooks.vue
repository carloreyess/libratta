<template>
  <q-page padding>
      <q-breadcrumbs class="text-white">
        <template v-slot:separator>
          <q-icon
            size="1.5em"
            name="chevron_right"
            color="primary"
          />
        </template>
        <q-breadcrumbs-el label="Home" icon="home" />
        <q-breadcrumbs-el label="List of Barrowed Books" icon="book" />
      </q-breadcrumbs>
      <div class="row q-pa-sm justify-end q-gutter-sm">
        <q-btn color="primary" label="Barrow Book" left icon="playlist_add" @click="add()"/>
        <q-btn color="warning" label="Return Book" left icon="arrow_back_ios" @click="returnBook()"/>
      </div>
      <div class="q-pa-sm">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Image</th>
              <th class="text-left">Serial</th>
              <th class="text-left">Book</th>
              <th class="text-left">Status</th>
              <th class="text-left">...</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result,i) in book_lists" :key="`result${i}`">
              <td class="text-left">{{ i+1 }}</td>
              <td>
                <q-img
                    :src="result.image"
                    spinner-color="white"
                    style="max-width: 80px"
                  />
              </td>
              <td class="text-left">{{ result.serial }}</td>
              <td class="text-left">{{ result.name }}</td>
              <td class="text-left">
                <q-badge outline :color="(status(result.status) === 'Not Available' ? 'red' : 'green')" :label="status(result.status)" />
              </td>
              <td class="text-left">
                <div v-if="result.overdue">
                   <q-btn round color="primary" size="10px" @click="view(result.id)" glossy icon="history" >
                      <q-badge color="red" floating>!</q-badge>
                    <q-tooltip content-class="bg-red">Barrow Overdue Alert</q-tooltip>
                  </q-btn>
                </div>
                <div v-else>
                  <q-btn round color="primary" size="10px" @click="view(result.id)" glossy icon="history" >

                    <q-tooltip content-class="bg-primary">Show History</q-tooltip>
                  </q-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="current"
          color="primary"
          :max="totalPages"
          :max-pages="6"
          :boundary-numbers="false"
        />
      </div>
      <create></create>
      <return></return>
      <extend></extend>
      <history></history>
  </q-page>
</template>
<script>
import Create from '../components/barrow/Create';
import Return from '../components/barrow/Return';
import Extend from '../components/barrow/Extend';
import History from '../components/barrow/History';
export default {
  data : (()=>{
    return{
      results: [],
      current: 1
    }
  }),
  mounted(){
    this.loadData();
    this.$root.$on('loadData',()=>{
      this.loadData();
    });
  },
  methods: {
    loadData(){
      this.$axios.post('barrow/index').then((response)=>{
        this.results = response.data
      });
    },
    add(){
      this.$root.$emit('addBarrowDialog');
    },
    returnBook(){
      this.$root.$emit('addReturnDialog');
    },
    extend(val){
      this.$root.$emit('addExtendDialog', val);
    },
    status(i){
      if(i==1){
        return 'Not Available';
      }else{
        return 'Available';

      }
    },
    view(id){
      this.$root.$emit('showHistoryDialog',id);
    }
  },
  computed: {
      book_lists(){
				return this.results.slice((this.current * 5) - 5, this.current * 5);
			},
			totalPages() {
				return Math.ceil( this.results.length / 5);
			}
  },
  components: {
    Create,
    Return,
    Extend,
    History
  }
}
</script>
