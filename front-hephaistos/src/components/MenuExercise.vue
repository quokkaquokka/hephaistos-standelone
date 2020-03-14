<template>
  <v-row xs12 sm8 md2 style="max-width: 20rem">
    <v-col v-for="exercise in exercises" v-bind:key="exercise" cols="12">
      <v-card class="mt-3" header="">
        <v-card-title class="subtitle-1">
          <router-link :to="`/session/${sessionId}/do/${exercise.id}`" style="text-decoration: none">
            {{ exercise.title }}
          </router-link>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    sessionId () {
      return parseInt(this.$route.params.id)
    }
  },
  async mounted () {
    this.form.test = await this.fetchExercisesForSession({ sessionId: this.sessionId })
  },
  methods: {
    ...mapActions('exercises', ['fetchExercisesForSession'])
  }
}
</script>

<style>
  #exercise {
    padding-right: 5px;
  }
  #app {
    text-align: left;
  }
</style>
