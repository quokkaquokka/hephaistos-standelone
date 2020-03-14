<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div id="app">
        <div id="nav">
          <router-link to="/">Login</router-link> |
          <router-link to="/exercise">Create Exercise</router-link> |
          <router-link to="/listmodules">Listes des modules</router-link> |
          <router-link to="/listexercises">Listes des exercices</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/home">Home</router-link>
        </div>
      </div>
    </v-app-bar>
    <div id="router">
      <router-view/>
    </div>
  </v-app>
</template>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#router {
  padding-top: 100px;
  padding-left: 10px;
}
</style>
