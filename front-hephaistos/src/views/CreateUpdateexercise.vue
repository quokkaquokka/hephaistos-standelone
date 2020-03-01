<template>
  <div class="exercise">
    <b-card title="Create/Update Exercise">
      <span>{{ form.errorLogin }}</span>
      <b-form @submit="onSubmit" v-if="true">
        <b-row>
          <b-col>
            <b-form-group
              id="input-group-title"
              label=""
              label-for="input-title"
            >
            <b-form-input
              id="input-title"
              v-model="form.title"
              type="text"
              required
              placeholder="Enter the title of exercise"
            ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-select v-model="form.lang" :options="form.languages" id="languages">
            </b-form-select>
            <b-button type="submit" variant="primary">Save</b-button>
          </b-col>
          <br>
        </b-row>
        <b-row>
          <b-col>
            <h1>Consignes</h1>
            <textarea v-model="form.instructions" placeholder="ajoutez plusieurs lignes"></textarea>
            <h1>Template de résolution</h1>
          </b-col>
          <b-col>
            <h1>Tests</h1>
            <div id="tests" class="exercise-editor-ace-editor"></div>
            <b-form @submit="onSandbox" v-if="true">
            <h1 style="display:inline-block; width: 200px">Sandbox</h1>
            <b-button type="submit" variant="primary" style="display:inline-block">Submit</b-button>
            <div id="sandbox" class="exercise-editor-ace-editor"></div>
            <h1>Résultats des tests</h1>
            <ul id="listResult">
              <li v-for="item in form.resultTest" v-bind:key="item">
                {{ item.file }} - {{ item.name }} : {{ item.time }}
              </li>
            </ul>
            </b-form>
          </b-col>
        </b-row>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import config from '../config'
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'

export default {
  mounted () {
    this.editorTests = ace.edit('tests')
    this.editorTests.setTheme('ace/theme/monokai')
    this.editorTests.session.setMode(`ace/mode/${this.lang}`)

    this.editorSandbox = ace.edit('sandbox')
    this.editorSandbox.setTheme('ace/theme/monokai')
    this.editorSandbox.session.setMode(`ace/mode/${this.lang}`)
  },
  data () {
    return {
      form: {
        languages: [
          { value: null, text: 'Select your language' },
          { value: 'python', text: 'python' },
          { value: 'Javascript', text: 'Javascript' }
        ],
        instructions: '',
        lang: null,
        title: '',
        tests: '',
        solution: '',
        template_regions: ['France'],
        template_regions_rw: [0],
        difficulty: 0,
        score: 0,
        debug: '',
        resultTest: []
      },
      editorTests: null,
      editorSandbox: null,
      show: true
    }
  },
  methods: {
    async onSandbox (evt) {
      evt.preventDefault()
      const headers = { 'Content-Type': 'application/json' }
      const params = {
        lang: 'python',
        tests: 'tests.py',
        solution: this.form.solution
      }
      try {
        const result = await this.axios.post(config.host + '/api/v1/exercise/sandbox', params, { headers })
        this.form.resultTest = result.data.result.tests
      } catch (err) {
      }
    },
    async onSubmit (evt) {
      evt.preventDefault()
      const headers = { 'Content-Type': 'application/json' }
      const data = {
        instructions: this.form.instructions,
        lang: this.form.lang,
        title: this.form.title,
        tests: this.form.tests,
        solution: this.form.solution,
        template_regions: ['France'],
        template_regions_rw: [0],
        difficulty: 0,
        score: 0,
        creation_date: new Date()
      }

      // const data = {
      //   instructions: 'write a simple loop in python',
      //   lang: 'python',
      //   title: 'loop python',
      //   tests: '#def',
      //   solution: '#def solution',
      //   template_regions: ['France'],
      //   template_regions_rw: [0],
      //   difficulty: 0,
      //   score: 0,
      //   creation_date: new Date()
      // }
      try {
        const result = await this.axios.post(config.host + '/api/v1/exercise', data, { headers })
        this.debug = result.data
        alert(result)
      } catch (err) {
        const error = 'Votre exercice n\'a pas pu être enregistré'
        alert(error)
      }
    }
  }
}
</script>

<style>
  .exercise{
    max-width: 10000px;
    margin: auto;
    text-align: left;
  }
  span{
    color: red;
  }
  #languages {
    width: 200px;
    margin-right: 5px;
  }
  .exercise-editor-ace-editor {
    position: relative;
    height: 20rem;
  }

</style>
