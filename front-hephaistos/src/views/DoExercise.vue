<template>
  <div>
    <v-row xs12 sm8 md2 style="max-width: 10rem;display: inline-block;">
      <v-col v-for="exercise in exercises" v-bind:key="exercise.id" cols="12">
        <v-card class="mt-3" header="">
          <v-card-title class="subtitle-1">
            <router-link :to="`/session/${sessionId}/do/${exercise.id}`" style="text-decoration: none">
              {{ exercise.title }}
            </router-link>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row xs12 sm8 md2 style="width: 100rem; display: inline-block; margin-left: 30px;">
      <v-col cols="12">
        <v-card class="mt-3" header="">
          <v-col cols="9" style="display:inline-block;">
            <h1> {{ exercise.title }} </h1>
            <p v-html="`${ exercise.instructions}`"></p>
            <br>
            <br>
            <h1 style="display:inline-block;">Votre solution</h1>
            <b-button @click="onSubmit" variant="primary" style="display:inline-block; margin-left: 10px;">Submit</b-button>
            <div id="sandbox" class="exercise-editor-ace-editor" style="height: 650px;"></div>
          </v-col>
          <v-col cols="2" style="display:inline-block;">
            <div>
              <h1 >Test</h1>
              <v-col v-for="test in exercise.test_names" v-bind:key="test" cols="12">
                <p> - {{ test }} </p>
              </v-col>
            </div>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'
export default {
  data () {
    return {
      exercise: {},
      form: {
        modules: [],
        test: []
      }
    }
  },
  computed: {
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercises']),
    ...mapGetters('exercises', ['getExerciseById']),
    sessionId () {
      return parseInt(this.$route.params.sid)
    },
    exerciseId () {
      return parseInt(this.$route.params.eid)
    }
  },
  async mounted () {
    this.editorSandbox = ace.edit('sandbox')
    this.editorSandbox.setTheme('ace/theme/monokai')
    this.editorSandbox.session.setMode('ace/mode/python')
    this.form.modules = await this.fetchExercisesForSession({ sessionId: this.sessionId })
    this.form.test = await this.fetchExerciseForSession({ sessionId: this.sessionId, exerciseId: this.exerciseId })
    this.exercise = this.getExerciseById(this.exerciseId)
  },
  methods: {
    ...mapActions('exercises', ['fetchExercisesForSession']),
    ...mapActions('exercises', ['fetchExerciseForSession']),
    ...mapActions('attempts', ['createAttemptForSession']),
    async onSubmit (evt) {
      evt.preventDefault()
      const solution = this.editorSandbox.getValue()
      this.createAttemptForSession({ exerciseId: this.exerciseId, sessionId: this.sessionId, solution: solution })
    }
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
