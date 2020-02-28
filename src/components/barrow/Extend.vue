<template>
  <q-dialog
      v-model="dialog"
    >
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Extend Date</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input outlined v-model="form.extend_date" hint="Returned Date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.extend_date" @input="() => $refs.qDateProxy.hide()" :options="disablePrevious"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right" class="bg-primary text-white">
          <q-btn flat label="OK" @click="add()" v-on:submit.prevent="add()"/>
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
        extend_date: ''
      }
    }
  },
  mounted(){
    this.$root.$on('addExtendDialog', (val)=>{
      this.dialog = true
      this.form.extend_date = val.expected_date_return
      this.form.id = val.id
    })
  },
  methods: {
    disablePrevious (date) {
      return date >= new Date().toJSON().slice(0,10).replace(/-/g,'/')
    },
    add(){
      this.$axios.post('barrow/barrow-extend', this.form).then((response)=>{
        this.dialog = false
        this.$root.$emit('loadData');
      });
    }
  }
}
</script>
