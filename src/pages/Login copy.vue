<template>
<q-page padding class="flex flex-center">
        <q-card flat class="my-card">
          <center>
            <q-img
              src="https://aws-asia-pacific-testing.s3-ap-southeast-1.amazonaws.com/logo/kaklazelogo.png"
              spinner-color="white"
              id="logo"

            ></q-img>
          </center>
          <q-form @submit="save">
            <q-card-section>
              <q-input
                v-model="form.email"
                name="email"
                label="Email"
                type="email"
                lazy-rules
                required
                autofocus
                autocomplete="username email"
              ></q-input>
              <q-input
                v-model="form.password"
                name="password"
                label="Password"
                type="password"
                lazy-rules
                required
              ></q-input>
            </q-card-section>

            <q-card-section>
              <q-btn type="submit" color="green" label="Login"></q-btn>
            </q-card-section>
          </q-form>
        </q-card>
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
