<template>
  <div class="modules">
    <v-layout column justify-center align-center>
      <v-row xs12 sm8 md12 syle="max-width: 88rem">
        <v-col v-for="module in modules" v-bind:key="module.id" cols="12">
          <h3>
            <router-link :to=" `/module/${module.id}`"> {{ module.name }}</router-link>
          </h3>
          <v-row justify="start">
          <v-card
            class="ma-2"
            height="8em"
            width="16em"
            v-for="session in sessions" v-bind:key="session.id" id="session"
          >
            <v-card-title class="subitle-1">
              {{ session.name }}
            </v-card-title>
            <v-btn class="ma-1" dark>
              <v-icon dark right>mdi-pencil</v-icon>
            </v-btn>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions'])
  },
  async mounted () {
    await this.fetchModules()
    await Promise.all(this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id })))
  },
  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule'])
  }
}
</script>

<style>
  session {
    display: inline-block;
    padding-right: 5px;
  }
  app {
    text-align: left;
  }
  button{
    padding: 50px;
  }
</style>
