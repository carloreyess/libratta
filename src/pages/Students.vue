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
        <q-breadcrumbs-el label="Student Management" icon="book" />
      </q-breadcrumbs>
      <div class="row q-pa-sm justify-end">
        <q-btn color="primary" label="New Student" left icon="person_add" @click="add()"/>
      </div>
      <div class="q-pa-sm">

        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Image</th>
              <th class="text-left">Student ID</th>
              <th class="text-left">Name</th>
              <th class="text-left">Address</th>
              <th class="text-left">Grade Level</th>
              <th class="text-left">Action(s)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result,i) in student_lists" :key="`result${i}`">
              <td class="text-left">{{ i + 1 }}</td>
              <td class="text-left">
                <q-icon size="40px" :name="`img:${result.image}`" />
              </td>
              <td class="text-left">{{ result.student_id }}</td>
              <td class="text-left">{{ result.name }}</td>
              <td class="text-left">{{ result.address }}</td>
              <td class="text-left">{{ result.grade_level }}</td>
              <td class="text-left">
                <div class="text-primary q-gutter-md" style="font-size: 1.5em">
                  <q-icon name="edit" style="cursor: pointer" @click="edit(result)"/>
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="current"
          color="primary"
          :max="totalPages"
          :max-pages="6"
          :boundary-numbers="false"
        />
      </div>
      <create></create>
      <edit></edit>
  </q-page>
</template>
<script>
import Create from '../components/students/Create';
import Edit from '../components/students/Edit';
export default {
  data: (()=>{
    return{
      results: [],
      current: 1,
    }
  }),
  mounted(){
    this.loadData();
    this.$root.$on('loadData',()=>{
      this.loadData();
    });
  },
  methods: {
    loadData(){
      this.$axios.post('students/index').then((response)=>{
        this.results = response.data;
      });
    },
    add(){
      this.$root.$emit('addStudentDialog');
    },
    edit(result){
      this.$root.$emit('editStudentDialog', result);
    }
  },
  computed: {
      student_lists(){
				return this.results.slice((this.current * 10) - 10, this.current * 10);
			},
			totalPages() {
				return Math.ceil( this.results.length / 10);
			}
  },
  components: {
    Create,
    Edit
  }
}
</script>
