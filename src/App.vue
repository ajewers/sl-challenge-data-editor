<template>
  <div id="app">
    <div id="nav">
      <router-link to="/about">About</router-link> |
      <router-link to="/upload">Upload</router-link> |
      <router-link to="/editor">Editor</router-link> |
      <router-link to="/json">JSON</router-link>
    </div>
    <router-view/>
    <div id="footer"><span>&copy; 2019 Alistair Jewers</span></div>
  </div>
</template>

<style>
body {
  /* padding: 0px; */
  margin: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
  background: rgb(240, 240, 240);
}

#nav a {
  font-weight: bold;
  color: rgb(44, 62, 80);
}

#nav a.router-link-exact-active {
  color: rgb(49, 173, 211);
}

#footer {
  display: block;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 25px;
  line-height: 25px;
  background: rgb(240, 240, 240);
  color: rgb(180, 180, 180);
  text-align: right;
}
#footer > span {
  margin-right: 20px;
}

.clicky {
  cursor: pointer;
  pointer-events: all;
}
.clicky:hover {
  color: rgb(49, 173, 211);
}
</style>
