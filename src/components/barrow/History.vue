<template>
  <q-dialog
     v-model="dialog"
     persistent
     :maximized="maximizedToggle"
     transition-show="slide-up"
     transition-hide="slide-down"
   >
     <q-card class="bg-grey-10 text-white">
       <q-bar>
         <q-space />

         <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
           <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
         </q-btn>
         <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
           <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
         </q-btn>
         <q-btn dense flat icon="close" v-close-popup>
           <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
       </q-bar>

       <q-card-section>
         <div class="text-h6">History</div>
       </q-card-section>

       <q-card-section class="q-pt-none"  v-if="results.length">

            <q-markup-table>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Image</th>
                  <th class="text-left">Book</th>
                  <th class="text-left">Serial</th>
                  <th class="text-left">Barrowed by</th>
                  <th class="text-left">Date Barrowed</th>
                  <th class="text-left">Expected Date Return</th>
                  <th class="text-left">Date Returned</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">...</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(result,i) in barrowed_lists" :key="`result${i}`">
                  <td class="text-left">{{ i+1 }}</td>
                  <td>
                    <q-img
                        :src="result.image"
                        spinner-color="white"
                        style="height: 90px; max-width: 130px"
                      />
                  </td>
                  <td class="text-left">{{ result.book }}</td>
                  <td class="text-left">{{ result.serial }}</td>
                  <td class="text-left">{{ result.student }}</td>
                  <td class="text-left">{{ result.date_barrowed }}</td>
                  <td class="text-left">{{ result.expected_date_return }}</td>
                  <td class="text-left">{{ result.date_returned }}</td>
                  <td class="text-left">

                  <q-badge transparent align="middle" :color="(result.left==='Returned' ? 'green' : 'orange')">
                    {{ result.left }}
                  </q-badge>
                  </td>
                  <td class="text-left">
                    <div :style="(result.date_returned === null ? 'display:block' : 'display:none')">
                      <q-chip clickable  @click="extend(result)" color="primary" text-color="white" icon="event">
                        Extend
                      </q-chip>
                    </div>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
       </q-card-section>
        <q-card-section  v-else>
            <div class="column">
              <div class="self-center"  style="width: 130px">
                <div class="vertical-center">
                  <q-img
                    src="https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/null.png"
                    style="height: 130px; max-width: 130px"
                  />
                  <p class="text-center">NO RESULT</p>
                </div>
              </div>
            </div>
       </q-card-section>
     </q-card>
  </q-dialog>
</template>

<script>
import Create from '../barrow/Create';
import Return from '../barrow/Return';
import Extend from '../barrow/Extend';
export default {
  data () {
    return {
      dialog: false,
      maximizedToggle: true,
      id: '',
      results: [],
      current: 1
    }
  },
  mounted(){
    this.$root.$on('showHistoryDialog',(id)=>{
      this.dialog = true
      this.id = id
      this.results = []
      this.loadData();
    });
    this.$root.$on('loadData',()=>{
      this.loadData();
    });
  },
  methods: {
    loadData(){

      this.$axios.get(`barrow/history/${this.id}`).then((response)=>{

          this.results = response.data


      })
    },
    add(){
      this.$root.$emit('addBarrowDialog');
    },
    returnBook(){
      this.$root.$emit('addReturnDialog');
    },
    extend(val){
      this.$root.$emit('addExtendDialog', val);
    }
  },
  computed: {
      barrowed_lists(){
				return this.results.slice((this.current * 5) - 5, this.current * 5);
			},
			totalPages() {
				return Math.ceil( this.results.length / 5);
      },

  },
  components: {
    Create,
    Return,
    Extend
  }
}
</script>
