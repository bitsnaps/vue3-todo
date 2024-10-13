<template>
  <div class="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="col-md-8 col-lg-6">
      <div class="card shadow">
        <div class="card-body p-5">
          <h2 class="card-title text-center mb-4">Register</h2>
          <form @submit.prevent="registerForm">
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text"><i class="fa fa-user"></i></span>
                <input type="text" class="form-control" placeholder="First Name" v-model="userInfo.fname" required>
              </div>
            </div>
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text"><i class="fa fa-user"></i></span>
                <input type="text" class="form-control" placeholder="Last Name" v-model="userInfo.lname" required>
              </div>
            </div>
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text"><i class="fa fa-phone"></i></span>
                <input type="tel" class="form-control" placeholder="Contact Number" v-model="userInfo.contact" required>
              </div>
            </div>
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text"><i class="fa fa-envelope"></i></span>
                <input type="email" class="form-control" placeholder="Email address" v-model="userInfo.email" required>
              </div>
            </div>
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text"><i class="fa fa-lock"></i></span>
                <input type="password" class="form-control" placeholder="Password" v-model="userInfo.password" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-100 mb-3">Sign up</button>
            <div class="text-center">
              <router-link to="/login" class="text-decoration-none">Already Registered?</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const userInfo = ref({
  fname: "",
  lname: "",
  contact: "",
  email: "",
  password: ""
});

const registerForm = async () => {
  try {
    // Use Puter API for registration
    const user = await puter.auth.signUp({
      email: userInfo.value.email,
      password: userInfo.value.password,
      name: `${userInfo.value.fname} ${userInfo.value.lname}`,
    });

    // If registration is successful, save additional user info
    if (user) {
      // You might want to save additional user info to your own backend
      await axios.post('/api/user-info', {
        userId: user.id,
        contact: userInfo.value.contact,
      });

      // Redirect to login page or directly to the app
      router.push('/login');
    }
  } catch (error) {
    console.error('Registration error:', error);
    // Handle registration error (e.g., show error message to user)
  }
};
</script>

<style scoped>
.bg-light {
  background-color: #f8f9fa;
}
</style>