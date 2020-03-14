<template>
  <div class="modules">
      <div v-for="module in modules" v-bind:key="module" >
        <h3> {{ module.name }} </h3>
        <div v-for="session in sessions" v-bind:key="session">
          <h4> {{ session.name }} </h4>
          <div v-for="exercise in exercises" v-bind:key="exercise" id="exercise" >
            <b-card class="mt-3" header="">
              <pre class="m-0">{{ exercise.title }}</pre>
            </b-card>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// import modules from '../store/modules/modules.js'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises'])
  },
  async mounted () {
    await this.fetchModules()
    await Promise.all(this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id })))
    await Promise.all(this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id })))
  },
  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession'])
  }
}
</script>

<style>
  #exercise {
    display: inline-block;
    padding-right: 5px;
  }
  #app {
    text-align: left;
  }
</style>
