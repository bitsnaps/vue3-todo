<template>
    <div class="container-fluid vh-100 bg-light">
      <Navbar />
  
      <div class="container mt-4">
        <h1 class="mb-4">{{ title }}</h1>
        <p class="lead">Welcome, {{ userData.name }}</p>
  
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <h5 class="card-title">Total</h5>
                <p class="card-text display-4">{{ todos.length }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-success text-white">
              <div class="card-body">
                <h5 class="card-title">Completed</h5>
                <p class="card-text display-4">{{ completedTodos.length }}</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card bg-warning text-dark">
              <div class="card-body">
                <h5 class="card-title">Pending</h5>
                <p class="card-text display-4">{{ pendingTodos.length }}</p>
              </div>
            </div>
          </div>
        </div>
  
        <div class="mb-4">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Enter New To-Do"
              v-model.trim="newTodoText"
              @keyup.enter="addNewTodo"
            />
            <button class="btn btn-primary" @click="addNewTodo">
              <i class="fa fa-plus"></i> Add
            </button>
          </div>
        </div>
  
        <ul class="list-group">
          <li
            v-for="(todo, index) in todos"
            :key="index"
            class="list-group-item d-flex justify-content-between align-items-center"
            :class="{ 'bg-light': todo.completed }"
          >
            <div class="d-flex align-items-center">
              <input
                class="form-check-input me-2"
                type="checkbox"
                v-model="todo.completed"
                @change="updateTodo(todo)"
              />
              <span :class="{ 'text-decoration-line-through': todo.completed }">{{ todo.title }}</span>
            </div>
            <div>
              <button class="btn btn-sm btn-info me-2" @click="openTodoDetail(todo)">
                <i class="fa fa-eye"></i>
              </button>
              <button class="btn btn-sm btn-danger" @click="removeTodo(index)">
                <i class="fa fa-trash"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
  
      <TodoDetailModal
        v-if="selectedTodo"
        :todo="selectedTodo"
        @close="closeTodoDetail"
        @update="updateTodoDetail"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const title = ref('My Todo List');
  const userData = ref({ name: 'User', profileImage: null });
  const todos = ref([]);
  const newTodoText = ref('');

  const selectedTodo = ref(null);
  
  const completedTodos = computed(() => todos.value.filter(todo => todo.completed));
  const pendingTodos = computed(() => todos.value.filter(todo => !todo.completed));


  const router = useRouter();

  onMounted(async () => {
    await loadTodos();
  });
  
  async function loadTodos() {
    try {
      const todosData = await puter.kv.get('todos');
      if (todosData) {
        todos.value = JSON.parse(todosData);
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  }
  
  async function saveTodos() {
    try {
      await puter.kv.set('todos', JSON.stringify(todos.value));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  }
  
  async function addNewTodo() {
    if (newTodoText.value.trim()) {
      todos.value.push({ 
        id: Date.now(),
        title: newTodoText.value, 
        completed: false,
        description: '',
        dueDate: null,
      });
      newTodoText.value = '';
      await saveTodos();
    }
  }
  
  async function updateTodo(todo) {
    await saveTodos();
  }
  
  async function removeTodo(index) {
    todos.value.splice(index, 1);
    await saveTodos();
  }
  
  
  function openTodoDetail(todo) {
    selectedTodo.value = { ...todo };
  }
  
  function closeTodoDetail() {
    selectedTodo.value = null;
  }
  
  async function updateTodoDetail(updatedTodo) {
    const index = todos.value.findIndex(t => t.id === updatedTodo.id);
    if (index !== -1) {
      todos.value[index] = updatedTodo;
      await saveTodos();
    }
    closeTodoDetail();
  }
  </script>
  
  <style scoped>
  .container-fluid {
    padding-left: 0;
    padding-right: 0;
  }
  
  .navbar-brand {
    font-size: 1.5rem;
  }
  
  .list-group-item {
    transition: background-color 0.3s;
  }
  
  .list-group-item:hover {
    background-color: #f8f9fa;
  }
  
  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }
  
  .card {
    transition: transform 0.3s;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
  </style>