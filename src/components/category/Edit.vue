<template>
  <q-dialog
    v-model="dialog"
  >
    <q-card style="width: 300px">
      <q-card-section>
        <div class="row  q-gutter-sm">
          <div class="col-12">
            <div class="text-h6 ">Edit Category</div>
          </div>
          <div class="col-12">
            <q-input outlined v-model="form.name" label="Category Name" stack-label /><br>
              <q-input
                outlined
                v-model="form.color"
                label="Color"
                stack-label
              >
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-color v-model="form.color" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-primary text-white">
        <q-btn flat label="OK" @click="edit" />
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
        color: '#FF00FF'
      }
    }
  },
  methods: {
    edit(){
      this.$axios.post('category/update', this.form).then((response)=>{
        this.$root.$emit('loadCategories');
        this.dialog = false
      })
    }
  },
  mounted(){
    this.$root.$on('editCategoryDialog',(val)=>{
      this.dialog = true
      this.form.id = val.id
      this.form.name = val.name
      this.form.color = val.color
    })
  }
}
</script>
