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
      <q-breadcrumbs-el label="User Accounts" icon="person" />
    </q-breadcrumbs>
    <div class="row q-pa-sm justify-end">
      <q-btn color="primary" label="New User" left icon="person_add" @click="add()"/>
    </div>
    <div class="q-pa-sm">
      <q-markup-table>
        <thead>
          <th class="text-left">#</th>
          <th class="text-left">Image</th>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Password</th>
          <th class="text-left">Created at</th>
          <th class="text-left">...</th>
        </thead>
        <tbody>
          <tr v-for="(user,i) in results" :key="`user${i}`">
            <td>{{ i + 1 }}</td>
            <td>
              <q-icon size="40px" :name="`img:${user.image}`" />
            </td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>***********</td>
            <td>{{ user.created_at }}</td>
            <td>
              <div class="text-primary q-gutter-md" style="font-size: 1.5em">
                <q-icon name="edit" style="cursor: pointer" @click="edit(user)"/>
              </div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <create></create>
    <edit></edit>
  </q-page>
</template>

<script>
import Create from "../components/user/Create";
import Edit from "../components/user/Edit";
export default {
  data(){
    return{
      results: []
    }
  },
  mounted(){
    this.loadData();
    this.$root.$on('loadData',()=>{
      this.loadData();
    })
  },
  methods: {
    loadData(){
      this.$axios.get('accounts/index').then((response)=>{
        this.results = response.data
      });
    },
    add(){
      this.$root.$emit('addUserDialog');
    },
    edit(val){
      this.$root.$emit('editUserDialog', val);
    }
  },
  components: {
    Create,
    Edit
  }
}
</script>
