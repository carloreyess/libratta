<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated >
      <q-toolbar >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
        <q-toolbar-title>
          LIBRATTA
        </q-toolbar-title>
        <div>
           <q-btn-dropdown stretch flat icon="person">
            <q-list>
              <q-item-label header>Options</q-item-label>
              <q-separator inset spaced />

              <q-item  clickable v-close-popup tabindex="0">
                <q-item-section avatar>
                  <q-avatar icon="logout" color="red" text-color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>LOGOUT</q-item-label>

                </q-item-section>
                <q-item-section side>
                  <q-icon name="info" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="250"
      bordered
      :content-style="{ background: 'linear-gradient(to right, #21c155 20%, #01a235 100%)' }"
      :breakpoint="400"
    >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
      <q-list>
        <q-item-label header class="text-white"></q-item-label>
        <q-item to="/" tag="a"  href="#">
          <q-item-section avatar>
            <!-- <q-icon name="school" /> -->
            <q-icon name="img:https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/100-1009289_big-image-pie-chart-icon-png.png" size="40px"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>DASHBOARD</q-item-label>
            <q-item-label caption>Charts</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/barrowed" tag="a"  href="#">
          <q-item-section avatar>
            <q-icon name="img:https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/barrowed.png" size="40px"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>BOOKS TRANSACTION</q-item-label>
            <q-item-label caption>Barrowed books</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/books" tag="a"  href="#">
          <q-item-section avatar>
            <q-icon name="img:https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/167756.png" size="40px"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>BOOKS</q-item-label>
            <q-item-label caption>Books Management</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/students" tag="a"  href="#">
          <q-item-section avatar>
            <q-icon name="img:https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/students.png" size="40px"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>STUDENTS</q-item-label>
            <q-item-label caption>Student Management</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/search" tag="a"  href="#">
          <q-item-section avatar>
            <q-icon name="img:https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/search.png" size="40px"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>SEARCH BOOKS</q-item-label>
            <q-item-label caption>Books Search</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/users" tag="a"  href="#">
          <q-item-section avatar>
            <q-icon name="img:https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/users.png" size="40px"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>USERS</q-item-label>
            <q-item-label caption>User Accounts</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/settings" tag="a"  href="#">
          <q-item-section avatar>
            <q-icon name="img:https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/Settings-icon.png" size="40px"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>SETTINGS</q-item-label>
            <q-item-label caption>Settings Management</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/audit-trail" tag="a"  href="#">
          <q-item-section avatar>
            <q-icon name="img:https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/logs.png" size="40px"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>AUDIT TRAIL</q-item-label>
            <q-item-label caption>Logs Management</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/reports" tag="a"  href="#">
          <q-item-section avatar>
            <q-icon name="img:https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/reports.png" size="40px"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>REPORTS</q-item-label>
            <q-item-label caption>Reports Management</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" src="https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/background2.jpg" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://kaklze-s3.s3-ap-southeast-1.amazonaws.com/logo/marymount.png">
          </q-avatar>
          <div class="text-weight-bold">Librarian</div>
          <div>@librarian</div>
        </div>
      </q-img>
    </q-drawer>

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
    title: "Libratta"
  },

  data () {
    return {
      leftDrawerOpen: true,

    }
  }
}
</script>
