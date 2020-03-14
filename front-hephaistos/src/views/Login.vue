<template>
  <div class="login">
    <v-card>
      <v-card-title>Login</v-card-title>
      <span>{{ form.errorLogin }}</span>
      <v-form
        ref="onSubmit"
        v-model="valid"
      >
        <v-text-field
          v-model="form.email"
          label="Email address"
          required
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          label="Password"
          :type="'password'"
          required
        ></v-text-field>
        <b-button @click="onSubmit" variant="primary">Submit</b-button>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import store from '../store/index'
import { mapState, mapActions } from 'vuex'
// mapGetters
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
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['login']),
    async onSubmit (evt) {
      evt.preventDefault()
      const { email, password } = this.form
      await this.login({ email, password })
        .then(res => {
          if (!store.getters['user/isAuthenticated']) {
            this.form.errorLogin = 'Votre email et/ou mot de passe est incorrect'
          }
        })
        .catch(error => {
          console.log(error)
          this.form.errorLogin = 'Votre email et/ou mot de passe est incorrect'
        })
    }
  }
}
</script>

<style>
  .login{
    width: 1000px;
    margin: auto;
    text-align: left;
  }
  span {
    color: red;
  }
  v-form {
    margin: 10px;
  }
</style>
