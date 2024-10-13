<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="row w-100">
      <div class="col-md-6 d-none d-md-flex justify-content-center align-items-center">
        <img src="/img/todo.svg" alt="Todo" class="img-fluid w-75">
      </div>
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body p-5">
            <h2 class="card-title text-center mb-4">Login</h2>
            <form @submit.prevent="login">
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fa fa-user"></i>
                  </span>
                  <input type="email" class="form-control" placeholder="Email address" v-model="email" required>
                </div>
              </div>
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="fa fa-lock"></i>
                  </span>
                  <input type="password" class="form-control" placeholder="Password" v-model="password" required>
                </div>
              </div>
              <button type="submit" class="btn btn-primary w-100 mb-3">Login</button>
            </form>
            <div class="text-center">
              <p class="mb-3">OR</p>
              <button @click="puterLogin" class="btn btn-outline-secondary w-100 mb-3">
                <i class="fa fa-cloud me-2"></i> Login with Puter
              </button>
              <router-link to="/register" class="text-decoration-none">New Registration?</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const email = ref('');
const password = ref('');

onMounted(async () => {
  try {
    const user = await puter.auth.getUser();
    if (user) {
      router.push('/');
    }
  } catch (error) {
    console.error('Error checking user authentication:', error);
  }
});

const login = async () => {
  // Implement your login logic here
  console.log('Login with:', email.value, password.value);
};

const puterLogin = async () => {
  try {
    await puter.auth.signIn();
    const user = await puter.auth.getUser();
    if (user) {
      store.dispatch('saveUserData', {
        uid: user.id,
        name: user.name,
        profileImage: user.avatar,
        email: user.email
      });
      router.push('/');
    }
  } catch (error) {
    console.error('Error during Puter login:', error);
  }
};
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa;
}
</style>