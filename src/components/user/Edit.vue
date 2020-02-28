<template>
   <q-dialog
      v-model="dialog"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Edit User</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-gutter-sm q-mt-xs">
            <div class="col">
              <q-input v-model="form.name"  outlined type="text" label="Name of the User"  stack-label/>
            </div>
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="col">
              <q-input outlined  v-model="form.email" label="Email address" stack-label  />
            </div>
            <div class="col">
              <q-input outlined  v-model="form.password" label="Password" stack-label  />
            </div>
          </div>
          <div class="row q-gutter-sm q-mt-xs">
            <div class="col">
              <q-file accept="image/*" outlined v-model="form.photo" label="Upload Photo" stack-label/>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-light-green-6 text-white">
          <q-btn flat label="OK" @click="add" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      dialog: false,
      form: {
        id: '',
        name: '',
        email: '',
        password: '',
        photo: ''
      }
    }
  },
  mounted(){
    this.$root.$on('editUserDialog',(val)=>{
      this.dialog = true
      this.form.id = val.id
      this.form.name = val.name
      this.form.email = val.email
      this.form.password = ''
      this.form.photo = ''
    });
  },
  methods: {
    add(){
      this.$q.loading.show({
        message: 'Update of users is in progress.<br/><span class="text-primary">Please wait...</span>'
      });
      let formData = new FormData();
      formData.append("id", this.form.id);
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("photo", this.form.photo);
      this.$axios.post('accounts/update',  formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then((response) => {
        setTimeout(() => {
          this.$q.loading.hide()
          this.dialog = false;
          this.$root.$emit('loadData');
        }, 3000)

      });
    }
  }
}
</script>
