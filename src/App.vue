<template>
  <div id="app" class="app">
    <header class="app__header app-header"></header>
    <main class="app__main app-main">
      <router-view class="app-main__router-view" />
    </main>
    <footer class="app__footer app-footer"></footer>
  </div>
</template>

<style lang="scss" src="@/assets/scss/app.scss"></style>

<style lang="scss">
.app {
  background-color: $gray-300;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;

  &__header {
    height: $header-height;
    position: fixed;
    top: 0;
    width: 100%;
  }

  &__main {
    padding-top: $header-height;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__footer {
    height: $footer-height;
  }
}

.app-header {
  background-color: $gray-400;
}

.app-footer {
  background-color: $gray-400;
}

.app-main {
  &__router-view {
    flex-grow: 1;
  }
}
</style>
