<template>
  <q-dialog
      v-model="dialog"
      persistent transition-show="scale" transition-hide="scale"
  >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">New Student</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row q-gutter-sm q-mt-xs">
          <div class="col">
            <q-input v-model="form.student_id"  outlined type="text" label="Student ID" stack-label />
          </div>
          <div class="col">
            <q-select outlined v-model="form.grade_level" :options="levels" type="text" label="Grade Level"  stack-label/>
          </div>
        </div>
        <div class="row q-gutter-sm q-mt-xs">
          <div class="col">
            <q-input v-model="form.name"  outlined type="text" label="Student name"  stack-label/>
          </div>
        </div>
        <div class="row q-gutter-sm q-mt-xs">
          <div class="col">
            <q-input v-model="form.address"  outlined type="text" label="Permanent Address"  stack-label/>
          </div>
        </div>
        <div class="row q-gutter-sm q-mt-xs">
          <div class="col">
            <q-file accept="image/*" outlined v-model="form.photo" label="Upload Photo"  stack-label/>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="bg-light-blue-6 text-white">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="OK" @click="add()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      levels: ['Nursery', 'Senior Nursery','Kinder','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'],
      form: {
        student_id: '',
        name: '',
        address: '',
        grade_level: '',
        photo: ''
      }
    }
  },
  mounted(){
    this.$root.$on('addStudentDialog',()=>{
      this.dialog = true
    });
  },
  methods: {
    add(){
      this.$q.loading.show({
        message: 'Adding of student is in progress.<br/><span class="text-primary">Please wait...</span>'
      });
      let formData = new FormData();
      formData.append("student_id", this.form.student_id);
      formData.append("name", this.form.name);
      formData.append("address", this.form.address);
      formData.append("grade_level", this.form.grade_level);
      formData.append("photo", this.form.photo);
      this.$axios.post('students/store',  formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((response) => {
          this.$q.loading.hide()
          this.dialog = false;
          this.$root.$emit('loadData');
      });
    }
  }
}
</script>
