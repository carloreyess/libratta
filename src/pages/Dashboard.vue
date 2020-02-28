<template>
  <q-page padding>
    <div class="row  q-gutter-sm q-mt-xs">
      <div class="col">
        <no-of-books></no-of-books>
      </div>
      <div class="col">
        <no-of-barrowed></no-of-barrowed>
      </div>
      <div class="col">
        <no-of-available></no-of-available>
      </div>
      <div class="col">
        <no-of-overdue></no-of-overdue>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <category-chart></category-chart>
      </div>
      <div class="col"></div>
    </div>
  </q-page>
</template>

<script>
import NoOfBooks from '../components/dashboard/NoOfBooks';
import NoOfBarrowed from '../components/dashboard/NoOfBarrowed';
import NoOfAvailable from '../components/dashboard/NoOfAvailable';
import NoOfOverdue from '../components/dashboard/NoOfOverdue';
import CategoryChart from '../components/dashboard/CategoryChart';
export default {
  data () {
    return{

    }
  },
  components: {
    NoOfBooks,
    NoOfBarrowed,
    NoOfAvailable,
    NoOfOverdue,
    CategoryChart
  },
  mounted(){

  },
  methods: {

  }
}
</script>
