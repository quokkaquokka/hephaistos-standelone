<template>
  <div class="login">
    <b-card title="Login">
      <span>{{ form.errorLogin }}</span>
      <b-form @submit="onSubmit" v-if="true">
        <b-form-group
          id="input-group-email"
          label="Email address:"
          label-for="input-email"
          description=""
        >
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-password" label="Your Password:" label-for="input-password">
          <b-form-input
            id="input-password"
            v-model="form.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

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
        email: '',
        password: '',
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
        alert(result.data)
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
  .login{
    max-width: 1000px;
    margin: auto;
    text-align: left;
  }
  span{
    color: red;
  }
</style>
