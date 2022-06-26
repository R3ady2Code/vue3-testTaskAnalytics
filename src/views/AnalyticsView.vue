<template>
  <div class="analytics">
    <Loader v-if='loading' />
    <div v-else>
      <h1>Аналитика</h1>
      <h5>Аналитика по визитам</h5>
      <Chart v-bind:data="this.getData" />
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Chart'
import Loader from '@/components/Loader'
import { mapGetters, mapActions } from 'vuex'


export default {
  components: {
    Chart,
    Loader
  },
  data: () => ({ loading: true }),
  computed: {
    ...mapGetters(["getData"]),
  },
  methods: {
    ...mapActions(["fetchData"]),
  },
  async mounted() {
    if (!localStorage.getItem('leadhit-site-id')) {
      return this.$router.push('/auth')
    }

    //fetch visits
    await this.fetchData();
    this.loading = false
  }
}
</script>
