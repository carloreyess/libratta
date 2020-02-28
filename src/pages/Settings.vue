<template>
  <q-page padding>
    <q-breadcrumbs class="text-white">
      <template v-slot:separator>
        <q-icon
          size="1.5em"
          name="chevron_right"
          color="primary"
        />
      </template>
      <q-breadcrumbs-el label="Home" icon="home" />
      <q-breadcrumbs-el label="Settings" icon="person" />
    </q-breadcrumbs>
    <div class="row q-gutter-sm">
      <div class="col-3"><br/>
        <q-card>
          <q-card-section>
            <div class="text-h6">Categories</div>
            <q-btn color="primary" class="float-right" label="New Category" size="11px" left icon="playlist_add" @click="addCategory()"/>
          </q-card-section>
          <q-card-section>
            <q-markup-table>
              <thead>
                <th class="text-left">#</th>
                <th class="text-left">Name</th>
                <th class="text-left">Action</th>
              </thead>
              <tbody>
                <tr v-for="(category,i) in categories" :key="`category${i}`">
                  <td>{{ i+1 }}</td>
                  <td>{{ category.name }}</td>
                  <td>
                    <q-icon name="edit" style="cursor: pointer" color="green" @click="edit(category)"></q-icon>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <edit></edit>
    <create></create>
  </q-page>
</template>
<script>
import Edit from "../components/category/Edit";
import Create from "../components/category/Create";
export default {
  data(){
    return{
      categories: [],
      form: {
        name: '',
        color: ''
      }
    }
  },
  components: {
    Edit,
    Create
  },
  mounted(){
    this.loadCategories();
    this.$root.$on('loadCategories',()=>{
      this.loadCategories();
    })
  },
  methods: {
    addCategory(){
      this.$root.$emit('addCategoryDialog');
    },
    loadCategories(){
      this.$axios.post('category/index').then((response)=>{
        this.categories = response.data
      })
    },
    add(){
      this.$axios.post('category/store', this.form).then((response)=>{
        this.loadCategories();
      })
    },
    edit(val){
      this.$root.$emit('editCategoryDialog', val);
    }
  }
}
</script>
