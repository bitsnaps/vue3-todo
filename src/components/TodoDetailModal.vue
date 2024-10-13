<template>
  <div class="modal fade show" tabindex="-1" style="display: block;">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Todo Details</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveTodo">
            <div class="mb-3">
              <label for="todoTitle" class="form-label">Title</label>
              <input type="text" class="form-control" id="todoTitle" v-model="editedTodo.title" required>
            </div>
            <div class="mb-3">
              <label for="todoDescription" class="form-label">Description</label>
              <textarea class="form-control" id="todoDescription" v-model="editedTodo.description" rows="3"></textarea>
            </div>
            <div class="mb-3">
              <label for="todoDueDate" class="form-label">Due Date</label>
              <input type="date" class="form-control" id="todoDueDate" v-model="editedTodo.dueDate">
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="todoCompleted" v-model="editedTodo.completed">
              <label class="form-check-label" for="todoCompleted">
                Completed
              </label>
            </div>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'update']);

const editedTodo = ref({ ...props.todo });

function saveTodo() {
  emit('update', editedTodo.value);
}

onMounted(() => {
  document.body.classList.add('modal-open');
});

onUnmounted(() => {
  document.body.classList.remove('modal-open');
});
</script>

<style scoped>
.modal-backdrop {
  opacity: 0.5;
}
</style>