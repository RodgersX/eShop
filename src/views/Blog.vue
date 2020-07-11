<template>
  <div class="about">
    <v-content class="my-2 mx-4">
      <h1>This is the Blog page</h1>
      <v-layout row wrap justify-center align-center>
        <div v-for="teaser in teasers" :key="teaser.id">
          <app-teaser v-bind="teaser" />
        </div>
      </v-layout>
    </v-content>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { GET_LANDING_PAGE } from '../store/action-types'
// import { HOME } from '../utils/contenful/contentful.blog'

import AppTeaser from './Blog/AppTeaser'
// eslint-disable-next-line quotes
const STORE_NAMESPACE = `article/home`

export default {
  name: 'Home',
  components: {
    AppTeaser
  },
  computed: {
    ...mapState(STORE_NAMESPACE, [
      'contentBlocks',
      'intro',
      'teasers',
      'title'
    ])
  },
  created () {
    // this.$store.registerModule(STORE_NAMESPACE, landingPage)
    // Do not fetch data again if it has been fetched already.
    // if (this.$store.state[STORE_NAMESPACE].id) return
    // this.getLandingPage(HOME)
  },
  methods: {
    ...mapActions(STORE_NAMESPACE, {
      getLandingPage: GET_LANDING_PAGE
    })
  }
}

</script>
