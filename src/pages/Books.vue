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
        <q-breadcrumbs-el label="Book Management" icon="book" />
      </q-breadcrumbs>
      <div class="row q-pa-sm justify-end">
        <q-btn color="primary" label="New Book" left icon="playlist_add" @click="add()"/>
      </div>
      <div class="q-pa-sm">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Image</th>
              <th class="text-left">Serial Number</th>
              <th class="text-left">Name</th>
              <th class="text-left">Author</th>
              <th class="text-left">Publication</th>
              <th class="text-left">Published Date</th>
              <th class="text-left">Tags</th>
              <!-- <th class="text-left">Status</th> -->
              <th class="text-left">Action(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result,i) in books_lists" :key="`result${i}`">
              <td class="text-left">{{ i + 1 }}</td>
              <td>
                 <q-img
                    :src="result.image"
                    spinner-color="white"
                    style="height: 70px; max-width: 130px"
                  />
              </td>
              <td class="text-left">{{ result.serial }}</td>
              <td class="text-left">{{ result.name }}</td>
              <td class="text-left">{{ result.author }}</td>
              <td class="text-left">{{ result.publication }}</td>
              <td class="text-left">{{ result.published_date }}</td>
              <td class="text-left wrap-cells">
                <div class="q-gutter-xs">
                  <q-badge
                    color="blue"
                    v-for="(tag,i) in result.tags" :key="`tag${i}`">
                    {{ tag }}
                  </q-badge>
                </div>
              </td>
              <!-- <td class="text-left">
                <q-badge outline :color="(status(result.status) === 'Not Available' ? 'red' : 'green')" :label="status(result.status)" />
              </td> -->
              <td class="text-left">
                <div class="text-primary q-gutter-md" style="font-size: 1.5em">
                  <q-icon name="edit" style="cursor: pointer" @click="edit(result)"/>
                  <q-icon name="remove_red_eye" color="warning" style="cursor: pointer" @click="viewBook(result)"/>
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="current"
            color="primary"
            :max="totalPages"
            :max-pages="6"
            :boundary-numbers="false"
          />
        </div>
      </div>
       <view-book></view-book>
      <create></create>
      <edit></edit>

  </q-page>
</template>
<script>
import Create from '../components/books/Create'
import Edit from '../components/books/Edit'
import ViewBook from '../components/books/View'
export default {
  data () {
    return{
      current: 1,
      results: [],
      books: [],
      status_color: 'blue'
    }
  },
  mounted(){
    this.loadData();
    this.$root.$on('loadData',()=>{
      this.loadData();
    });
  },
  methods: {
    add(){
      this.$root.$emit('addBookDialog');
    },
    edit(items){
      this.$root.$emit('editBookDialog', items);
    },
    loadData(){
      this.$axios.post('books/index').then((response)=>{
        this.results = response.data
      });
    },
    status(i){
      if(i==1){
        return 'Not Available';
      }else{
        return 'Available';
      }
    },
    viewBook(val){
      this.$root.$emit('viewBookDialog', val)
    }
  },
  computed: {
      books_lists(){
				return this.results.slice((this.current * 5) - 5, this.current * 5);
			},
			totalPages() {
				return Math.ceil( this.results.length / 5);
			}
  },
  components: {
    Create,
    Edit,
    ViewBook
  }
}
</script>
