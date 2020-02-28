<template>
  <q-dialog
      v-model="dialog"
      persistent transition-show="scale" transition-hide="scale"
    >
      <q-card style="width: 900px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Barrow Books</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-12 ">

              <q-stepper v-model="step" vertical color="primary" flat animated>
                <q-step
                  :name="1"
                  title="Select Student"
                  icon="settings"
                  :done="step > 1"
                >
                  <q-select outlined  v-model="form.student_id" :options="students" label="Select Student" >
                    <template v-slot:append>
                      <q-btn round dense flat icon="add" @click.stop @click="addStudent" />
                    </template>
                  </q-select>

                  <q-stepper-navigation>
                    <q-btn @click="step = 2" v-if="form.student_id" color="primary" label="Continue" />
                    <q-btn disabled v-else color="primary" label="Continue" />
                  </q-stepper-navigation>
                </q-step>
                <q-step
                  :name="2"
                  title="Select Books"
                  caption="Please a select book(s) you want to barrow"
                  icon="create_new_folder"
                  :done="step > 2"
                >
                  <q-select outlined v-model="form.books" multiple :options="books" label="Select book(s)" />

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
                  <div class="row  q-gutter-sm">
                    <div class="col">
                      <q-input outlined  v-model="form.date_barrowed" hint="Barrowed Date" mask="date" :rules="['date']">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                              <q-date v-model="form.date_barrowed" @input="() => $refs.qDateProxy.hide()" :options="disableAdvance" />
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class="col">
                      <q-input outlined  v-model="form.expected_date_return" hint="Expected Date Return" mask="date" :rules="['date']">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                              <q-date v-model="form.expected_date_return" @input="() => $refs.qDateProxy.hide()" :options="disablePrevious"/>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <q-stepper-navigation>
                    <q-btn @click="step = 4" v-if="form.expected_date_return" color="primary" label="Continue" />
                    <q-btn disabled v-else color="primary" label="Continue" />
                    <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
                  </q-stepper-navigation>
                </q-step>
                <q-step
                  :name="4"
                  title="Finish"
                  icon="add_comment"
                >
                  Please return the book on the given date/time. Thank you
                  <q-stepper-navigation>
                    <q-btn color="primary" label="Finish" @click="add()" />
                    <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
                  </q-stepper-navigation>
                </q-step>
              </q-stepper>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-light-blue-6 text-white">
          <q-btn flat label="CANCEL" v-close-popup />
        </q-card-actions>
      </q-card>
      <add-student></add-student>
  </q-dialog>
</template>

<script>
import AddStudent from '../students/Create';
export default {

  data () {
    return {
      dialog: false,
      step: 1,
      students:[],
      books:[],
      form: {
        student_id: '',
        books: [],
        date_barrowed: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
        expected_date_return: new Date().toJSON().slice(0,10).replace(/-/g,'/')
      }
    }
  },
  components: {
    AddStudent
  },
  mounted(){
    this.$root.$on('addBarrowDialog',()=>{
      this.dialog = true
      this.loadStudents();
      this.loadBooks();
      this.form.student_id= ''
      this.step = 1
    });
    this.$root.$on('loadData',()=>{
      this.loadStudents();
    });
  },
  methods: {
    addStudent(){
      this.$root.$emit('addStudentDialog');
    },
    loadStudents(){
      this.$axios.post('barrow/select-students').then((response)=>{
        this.students = response.data
      });
    },
    loadBooks(){
      this.$axios.post('barrow/select-books').then((response)=>{
        this.books = response.data
      });
    },
    add(){
      this.$axios.post('barrow/store', this.form).then((response)=>{
        this.dialog = false
        this.$root.$emit('loadData');
      });
    },
    disablePrevious (date) {
      return date >= new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    disableAdvance (date) {
      return date <= new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
  }
}
</script>
