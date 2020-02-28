<template>
  <q-card class="my-card"
      style="background: linear-gradient(to bottom, #ff6600 0%, #ff9966 100%);">
    <q-card-section horizontal>
      <q-card-section class="col-8  flex-start q-pt-xs">
        <div class="text-overline">Barrowed Books (Overdue)</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ count.total }}</div>
        <div class="text-caption text-white">
          Number of barrowed books (Overdue)
        </div>
      </q-card-section>

      <q-card-section class="col-4 flex flex-en">
        <q-img
          class="rounded-borders"
          src="https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/overdue.png"
          style="height: 90px; max-width: 90px"
        />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      count: ''
    }
  },
  mounted(){
    this.countOverdue();
  },
  methods: {
    countOverdue(){
      this.$axios.post('dashboard/count-overdue').then((response)=>{
        this.count = response.data
      });
    }
  }
}
</script>
