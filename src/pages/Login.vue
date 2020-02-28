<template>
<q-page padding class="bg-primary flex flex-center" >
    <q-form @submit="save">
      <q-card-section>
        <p class="text-h4 text-center text-weight-thin">LIBRATTA</p>
        <div class="row q-gutter-sm">
          <div class="col-12">
            <q-input
              color="green-12"
              v-model="form.email"
              label="Email address"
              stack-label
              lazy-rules
              required
              outlined
              autofocus
              rounded
              autocomplete="username email">
              <template v-slot:prepend>
                <q-icon name="event" color="white"/>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input
              type="password"
              color="green-12"
              v-model="form.password"
              label="Password"
              lazy-rules
              required
              rounded
              autofocus
              outlined
              stack-label
              >
              <template v-slot:prepend>
                <q-icon name="vpn_key"  color="white"/>
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-btn type="submit" rounded color="green" style="width: 100%" glossy label="Login"></q-btn>
          </div>
        </div>

      </q-card-section>
    </q-form>

</q-page>
</template>

<script>
export default {
  // name: 'PageName',
   data() {
    return {
      form: {
        email: "",
        password: ""
      },
    };
  },
  methods: {
    save(){
      this.$axios.post('v1/auth/login', this.form).then((response)=>{
        localStorage.setItem('token',response.data)
        this.$router.push({
          path: '/'
        })
      })
      .catch(error=>{
        alert('Invalid');
      });
    }
  }
}
</script>

<style scoped>
.my-card {
  width: 40%;
}
@media only screen and (max-width: 600px) {
  .my-card {
    width: 100%;
  }
  #logo {
    text-align: center;
  }
}
</style>
