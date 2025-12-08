<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header>
    <Navbar/>
  </header>

  <main>
    <Transition name="fade" mode="out-in">
      <RouterView />
    </Transition>

  </main>

</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
