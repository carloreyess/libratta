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
        <q-breadcrumbs-el label="Search Books" icon="search" />
      </q-breadcrumbs><br/>
      <q-input bottom-slots v-model="form.name" label="Search" placeholder="Search books" outlined style="width: 20%" v-on:keyup.enter="search()" >
        <template v-slot:append>
          <q-btn round dense flat icon="search" @click="search"  />
        </template>
      </q-input>
    <div class="row " v-if="results.length">
      <div class="col-12" v-for="(result,i) in results" :key="`result${i}`"><br/>
         <q-card class="my-card q-mt-5" flat >
            <q-card-section horizontal>
              <q-card-section  class="col-10">
                <div class="text-overline">{{ result.serial }}</div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ result.name }}</div>
                <div class="text-caption text-grey"> {{ result.author }} </div>
                <div class="text-caption text-grey">Published date:  {{ result.published_date }} </div>
                <div class="text-caption text-grey">Publication:  {{ result.publication }} </div>
                <div class="text-overline">
                  <div class="q-gutter-xs">
                    <q-badge
                      color="blue"
                      v-for="(tag,i) in result.tags" :key="`tag${i}`">
                      {{ tag }}
                    </q-badge>
                  </div>
                </div>
                <div class="text-overline">
                  <q-badge outline :color="(status(result.status) === 'Not Available' ? 'red' : 'green')" :label="status(result.status)" />
                </div>

              </q-card-section>

              <q-card-section class="col-2 flex flex-end">
                <q-img
                  :src="result.image"
                  style="width: 100%; height: 100%"
                />
              </q-card-section>
            </q-card-section>
          </q-card>
      </div>
    </div>

  </q-page>
</template>

<script>
export default {
  data(){
    return{
      results: [],
      form: {
        name: ''
      }
    }
  },
  methods: {
    search(){
      this.$q.loading.show({
        message: 'Book search is in progress.<br/><span class="text-primary">Please wait...</span>'
      });
      this.$axios.get(`search/search-books/${this.form.name}`).then((response)=>{
        setTimeout(() => {
           this.$q.loading.hide()
          this.results = response.data
      }, 3000)
      })
    },
    status(i){
      if(i==1){
        return 'Not Available';
      }else{
        return 'Available';

      }
    }
  }
}
</script>
