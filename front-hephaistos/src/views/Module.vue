<template>
  <v-layout
    column justify-center align-center
  >
    <h1> {{ module.name }}</h1>
    <v-row xs12 sm8 md12 style="max-width: 88rem">
      <v-col v-for="session in sessions" :key="session.id" cols="12">
        <h2>
          <router-link :to="`/session/${session.id}`" style="text-decoration: none">
            {{ session.name }}
          </router-link>
        </h2>
        <v-row justify="start">
          <v-card class="ma-2" height="8em" width="16em" v-for="exercise in getExercisesBySessionId(session.id)" :key="exercise.id">
            <v-card-title class="subtitle-1">
              {{ exercise.title }}
            </v-card-title>
            <v-card-text>
              Ne rien mettre ici
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapState, mapGetters, mapActions /* , mapMutations */ } from 'vuex'

export default {
  name: 'Module',
  data: () => ({
  }),
  computed: {
    ...mapGetters('modules', ['getModuleById']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    ...mapState('modules', ['modules']),
    module () {
      return this.getModuleById(this.moduleId) ||
        { name: 'Loading..' }
    },
    moduleId () {
      return parseInt(this.$route.params.id)
    },
    sessions () {
      return this.getSessionsByModuleId(this.moduleId)
    }
  },
  async mounted () {
    await this.fetchModule({ id: this.moduleId })
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    )
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
    )
  },
  methods: {
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('exercises', ['fetchExercisesForSession'])
  }
}
</script>
