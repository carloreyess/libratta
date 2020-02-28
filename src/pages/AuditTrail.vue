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
      <q-breadcrumbs-el label="Audit Trail" icon="book" />
    </q-breadcrumbs>
      <q-markup-table class="q-mt-md">
        <thead>
          <th class="text-left">#</th>
          <th class="text-left">User</th>
          <th class="text-left">Activity</th>
          <th class="text-left">Date</th>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Carlo Reyes</td>
            <td>Added a new category named: Science</td>
            <td>2020-02-12</td>
          </tr>
        </tbody>
      </q-markup-table>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
