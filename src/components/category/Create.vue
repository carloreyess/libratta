<template>
  <q-dialog
    v-model="dialog"
  >
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">New Category</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col">
            <q-input outlined  v-model="form.name" label="Category Name"  stack-label />
          </div>
        </div>
        <div class="row">
          <div class="col">
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
      <q-card-actions align="right" class="bg-yellow-9 text-white">
        <q-btn flat label="OK" @click="add" />
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
        name: '',
        color: '#FF00FF'
      }
    }
  },
  methods: {
    add(){
      this.$axios.post('category/store', this.form).then((res)=>{
        this.dialog = false
        this.$root.$emit('loadCategories');
      });
    }
  },
  mounted(){
    this.$root.$on('addCategoryDialog',()=>{
      this.dialog = true
    })
  }
}
</script>
