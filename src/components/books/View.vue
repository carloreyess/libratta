<template>
  <q-dialog v-model="dialog">
      <q-card class="my-card" style="width: 500px">
        <q-img
          :src="form.image"
          style="height: 500px; max-width: 100%"
          :ratio="1"
        />

        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ form.name }}
            </div>
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
             <q-badge outline :color="(status(form.status) === 'Not Available' ? 'red' : 'green')" :label="status(form.status)" />
          </div>
          <div class="text-caption text-grey  text-caption q-pt-md row no-wrap items-center" v-for="(tag,i) in form.tags" :key="`tag${i}`">
            {{ tag }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            {{ form.author }}
          </div>
          <div class="text-caption text-grey">
            Published Date: {{ form.published_date }}
          </div>
          <div class="text-caption text-grey">
            Publication: {{ form.publication }}
          </div>
        </q-card-section>
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
        name: '',
        author: '',
        published_date: '',
        serial: '',
        publication: '',
        tags: '',
        image: '',
        status: '',
      }
    }
  },
  mounted(){

    this.$root.$on('viewBookDialog',(val)=>{
      this.dialog = true
      this.form.name = val.name
      this.form.author = val.author
      this.form.published_date = val.published_date
      this.form.serial = val.serial
      this.form.publication = val.publication
      this.form.tags = val.tags
      this.form.image = val.image
      this.form.status = val.status
    })
  },
  methods: {
    status(i){
      if(i==1){
        return 'Not Available';
      }else{
        return 'Available';

      }
    },
  }
}
</script>
