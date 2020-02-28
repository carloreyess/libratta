<template>
  <q-dialog
      v-model="dialog"
      persistent transition-show="scale" transition-hide="scale"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Return Book</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-stepper
             v-model="step"
             vertical
             color="primary"
             animated
             flat
           >
             <q-step
               :name="1"
               title="Select Student"
               icon="settings"
               :done="step > 1"
             >
               <q-select outlined v-model="select_student" :options="students" label="Select Student" />

               <q-stepper-navigation>
                 <q-btn @click="step = 2" v-if="select_student" color="primary" label="Continue" />
                 <q-btn color="primary" v-else disabled label="Continue" />
               </q-stepper-navigation>
             </q-step>

             <q-step
               :name="2"
               title="Select Books"
               caption="Select a book(s) you want to return"
               icon="create_new_folder"
               :done="step > 2"
             >
               <q-select outlined v-model="form.books" multiple :options="books" label="Select Books" />

               <q-stepper-navigation>
                 <q-btn @click="step = 3" v-if="form.books.length" color="primary" label="Continue" />
                 <q-btn disabled v-else color="primary" label="Continue" />
                 <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
               </q-stepper-navigation>
             </q-step>

             <q-step
               :name="3"
               title="Agreement"
               icon="assignment"
               :done="step > 3"
             >
               <q-markup-table >
                 <thead>
                   <th class="text-left">#</th>
                   <th class="text-left">Book</th>
                   <th class="text-left">Expected Date Return</th>
                 </thead>
                 <tbody>
                   <tr v-for="(book,i) in form.books" :key="`book${i}`">
                     <td>{{ i + 1 }}</td>
                     <td>{{ book.label }}</td>
                     <td>{{ book.expected_date_return }}</td>
                   </tr>
                 </tbody>
               </q-markup-table><br/>
               <q-input outlined v-model="form.date_returned" hint="Returned Date" mask="date" :rules="['date']">
                 <template v-slot:append>
                   <q-icon name="event" class="cursor-pointer">
                     <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                       <q-date v-model="form.date_returned" @input="() => $refs.qDateProxy.hide()" :options="disablePrevious"/>
                     </q-popup-proxy>
                   </q-icon>
                 </template>
               </q-input>
               <q-stepper-navigation>
                 <q-btn @click="step = 4" v-if="form.date_returned" color="primary" label="Continue" />
                 <q-btn disabled v-else color="primary" label="Continue" />
                 <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
               </q-stepper-navigation>
             </q-step>

             <q-step
               :name="4"
               title="Finish"
               icon="add_comment"
             >
              Thank you for giving back the books barrowed..
               <q-stepper-navigation>
                 <q-btn color="primary" label="Finish" @click="add()"/>
                 <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
               </q-stepper-navigation>
             </q-step>
          </q-stepper>
        </q-card-section>

        <q-card-actions align="right" class="bg-warning text-white">
          <q-btn flat label="CANCEL" v-close-popup />
        </q-card-actions>
      </q-card>
  </q-dialog>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      step: 1,
      select_student: '',
      dialog: false,
      students: [],
      books: [],
      form: {
        student_id: '',
        books: [],
        date_returned: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
      }
    }
  },
  mounted(){
    this.$root.$on('addReturnDialog',()=>{
      this.dialog = true
      this.loadStudents();
      this.form.student_id=''
      this.step = 1
    })
  },
  methods: {
    loadStudents(){
      this.$axios.post('barrow/select-students').then((response)=>{
        this.students = response.data
      });
    },
    add(){
      this.$axios.post('barrow/return-books', this.form).then((response)=>{
        this.dialog = false
        this.$root.$emit('loadData');
      });
    },
    disablePrevious (date) {
      return date >= new Date().toJSON().slice(0,10).replace(/-/g,'/')
    }
  },
  watch: {
    'select_student': function(val){

      this.form.student_id = val.value;
      this.$axios.get(`barrow/barrowed-books/${val.value}`).then((response)=>{
        this.books = response.data
      });
    }
  }
}
</script>
