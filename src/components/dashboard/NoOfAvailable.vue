<template>
  <q-card class="my-card"
      style="background: linear-gradient(to bottom, #00cc66 -2%, #00ff99 100%)">
    <q-card-section horizontal>
      <q-card-section class="col-8  flex-start q-pt-xs">
        <div class="text-overline">Available Books</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ count.total }}</div>
        <div class="text-caption text-white">
          Number of available books
        </div>
      </q-card-section>

      <q-card-section class="col-4 flex flex-en">
        <q-img
          class="rounded-borders"
          src="https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/available.png"
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
    this.countBarrowed();
  },
  methods: {
    countBarrowed(){
      this.$axios.post('dashboard/count-available').then((response)=>{
        this.count = response.data
      });
    }
  }
}
</script>
