<template>
  <div>
    <q-dialog
      v-model="dialog"
      persistent transition-show="scale" transition-hide="scale"
    >
      <q-card style="width: 900px; max-width: 120vw;">
        <q-card-section>
          <div class="text-h6">Edit Book</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-8">
              <div class="row q-gutter-sm q-mt-xs">
                <div class="col-4">
                  <q-input outlined  v-model="form.published_date" label="Date Published" mask="date" stack-label :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="form.published_date" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row q-gutter-sm ">
                <div class="col">
                  <q-input v-model="form.serial"  outlined type="text" label="Serial No"  stack-label/>
                </div>
              </div>
              <div class="row q-gutter-sm q-mt-xs">
                <div class="col">
                  <q-input outlined  v-model="form.name" label="Name of the book"   stack-label/>
                </div>
              </div>
              <div class="row q-gutter-sm q-mt-xs">
                <div class="col">
                   <q-select outlined  bottom-slots v-model="selected_category" :options="categories" label="Categories"  stack-label >

                    <template v-slot:append>
                      <q-btn round dense flat icon="add" @click.stop @click="addCategory()"  />
                    </template>
                  </q-select>
                </div>
              </div>
              <div class="row q-gutter-sm ">
                <div class="col">
                  <q-input outlined  v-model="form.author" label="Author Name"  stack-label />
                </div>
                <div class="col">
                  <q-input outlined  v-model="form.publication" label="Publication"  stack-label />
                </div>
              </div>
              <div class="row q-gutter-sm q-mt-xs">
                <div class="col">
                  <q-file accept="image/*" outlined v-model="form.photo" label="Upload Photo"  stack-label/>
                </div>

              </div>
            </div>
            <div class="col-4 q-gutter-sm">
                <div class="col-12 q-gutter-sm">
                  <q-card class="my-card ">
                    <q-card-section>
                      <q-select
                        label="Tags"
                        v-model="form.tags"
                        use-input
                        use-chips
                        multiple
                        hide-dropdown-icon
                        input-debounce="0"
                        new-value-mode="add"
                      />
                    </q-card-section>
                  </q-card>
                </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-light-blue-6 text-white">
           <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="OK" @click="add()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <create></create>
  </div>
</template>

<script>
import Create from '../category/Create';
export default {
  // name: 'ComponentName',
  data () {
    return {
      selected_category: [],
      selected_tags: [],
      dialog: false,
      categories: [],
      form: {
        id: '',
        name: '',
        serial: '',
        author: '',
        publication: '',
        tags:[],
        published_date: '2020/02/06',
        photo: null,
        category: '',
      }
    }
  },
  mounted(){
    this.$root.$on('editBookDialog',(val)=>{
      this.dialog = true
      this.form.id = val.id
      this.form.name = val.name
      this.form.serial = val.serial
      this.form.author = val.author
      this.form.publication = val.publication
      this.form.tags = val.tags
      this.form.published_date = val.published_date
      // this.form.category = ''
      // this.form.photo = val.image
      this.loadCategories();
    });
    this.$root.$on('loadCategories',()=>{
      this.loadCategories();
    })
  },
  methods: {
    addCategory(){
      this.$root.$emit('addCategoryDialog');
    },
    add(){
      this.$q.loading.show({
        message: 'Updating of book details is in progress.<br/><span class="text-primary">Please wait...</span>'
      });
      let formData = new FormData();
      formData.append("id", this.form.id);
      formData.append("name", this.form.name);
      formData.append("serial", this.form.serial);
      formData.append("author", this.form.author);
      formData.append("publication", this.form.publication);
      formData.append("published_date", this.form.published_date);
      formData.append("photo", this.form.photo);
      formData.append("category", this.form.category);
      formData.append("tags[]", this.form.tags);
      this.$axios.post('books/update',  formData, {
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
    },
    loadCategories(){
      this.$axios.post('category/select-categories').then((response)=>{
        this.categories = response.data
      });
    }
  },
  components: {
    Create
  },
  watch: {
    'selected_category': function(val){
      this.form.category = val.value
    }
  }
}
</script>
