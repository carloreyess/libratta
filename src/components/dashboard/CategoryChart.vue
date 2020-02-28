<template>
  <q-card class="my-card q-mt-3" style="margin-top:10px">
    <q-card-section>
      <div class="text-h6">Category Chart</div>
    </q-card-section>
    <q-card-section>
      <div class="flex flex-center">
        <line-chart class="small" :chart-data="datacollection"></line-chart>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import LineChart from '../../js/CategoryChart'
  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: {},
        results: []
      }
    },
    mounted () {
      this.$axios.post('dashboard/category-chart').then((response)=>{
        this.results = response.data
        const labels = [];
        const data = [];
        const colors = [];
        this.results.forEach((val)=>{
            colors.push(
                val.color
            )
        });
        this.results.forEach((val)=>{
            labels.push(
                val.label
            )
        });
        this.results.forEach((val)=>{
            data.push(
                val.count
            )
        });
        this.datacollection = {
          labels: labels,
          datasets: [
            {
              backgroundColor: colors,
              data: data
            }
          ]
        }
      });
    }
  }
</script>
<style>
  .small {
    width: 70%;
    height: 70%;

  }
</style>
