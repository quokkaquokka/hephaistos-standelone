<template>
  <div class="modules">
    <MenuExercise/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MenuExercise from '@/components/MenuExercise.vue'
export default {
  components: {
    MenuExercise
  },
  data () {
    return {
      form: {
        myModules: [],
        test: []
      }
    }
  },
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    sessionId () {
      return parseInt(this.$route.params.id)
    }
  },
  async mounted () {
    await this.fetchModules()
    this.form.myModules = this.modules
    await Promise.all(this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id })))
    this.form.test = await this.fetchExercisesForSession({ sessionId: this.sessionId })
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
    padding-right: 5px;
  }
  #app {
    text-align: left;
  }
</style>
