<template>
  <div id="app" class="bg-gray-800">
    <!-- Content -->
    <div class="px-3 py-10 md:px-10">
      <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">

        <TodoSpinner v-if="loading" />
        <div v-else>
          <TodoFormAdd />

          <TodoItems 
          v-if="$store.state.todos.length"/>

          <TodoEmpty v-else />
        </div>
      </div>
    </div>
    <!--/ Content -->
  </div>

</template>

<script>
import { useStore } from 'vuex';
import TodoEmpty from './components/TodoEmpty.vue';
import TodoFormAdd from './components/TodoFormAdd.vue';
import TodoItems from './components/TodoItems.vue';
import TodoSpinner from './components/TodoSpinner.vue';
import { ref } from 'vue'


export default {
  name: 'App',
  components: {
    TodoSpinner,
    TodoFormAdd,
    TodoItems,
    TodoEmpty,
  },
  
  setup() { 
    const loading = ref(false);
    const store = useStore()
    loading.value = true
    store.dispatch('getTodos').finally(() => {
      loading.value = false
   })  
    return {
       loading, 
      }
    
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
