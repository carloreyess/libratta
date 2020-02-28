<template>
 <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  meta: {
    title: "Libratta Login"
  },
  data () {
    return {
      leftDrawerOpen: true,

    }
  }
}
</script>
