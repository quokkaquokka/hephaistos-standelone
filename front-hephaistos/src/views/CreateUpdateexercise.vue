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
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-col>
          <b-col>3 of 3</b-col>
          <br>
        </b-row>
        <b-row>
          <b-col>
            <h1>Consignes</h1>
            <textarea v-model="message" placeholder="ajoutez plusieurs lignes"></textarea>
            <h1>Template de résolution</h1>

          </b-col>
          <b-col>
            <h1>Consignes</h1>
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

export default {
  data () {
    return {
      form: {
        languages: [
          { value: null, text: 'Select your language' },
          { value: 'python', text: 'python' },
          { value: 'Javascript', text: 'Javascript' }
        ],
        instruction: '',
        password: '',
        lang: null,
        title: '',
        tests: '',
        solution: '',
        template_regions: [],
        template_regions_rw: [],
        difficulty: 0,
        score: 0,
        errorLogin: ''
      },
      show: true
    }
  },
  methods: {
    async onSubmit (evt) {
      evt.preventDefault()
      const { email, password } = this.form
      const params = new URLSearchParams()
      params.append('username', email)
      params.append('password', password)
      const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
      try {
        const result = await this.axios.post(config.host + '/api/v1/login', params, { headers })
        this.user = result.data
        this.loggedIn = true
      } catch (err) {
        this.form.errorLogin = 'Error your email or password are incorrect'
        this.form.errorLogin = 'tt ' + err
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

</style>