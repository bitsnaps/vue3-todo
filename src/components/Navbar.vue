<template>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <i class="fa fa-check-square-o me-2"></i>Todo App
          </a>
          <div class="dropdown">
            

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a v-if="userLoggedIn" class="nav-link" href="#" @click="logout"><i class="fa fa-sign-out me-2"></i>Logout</a>
                  <router-link v-else class="nav-link" to="/login"><i class="fa fa-sign-in me-2"></i>Login</router-link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="toggleFullScreen"><i class="fa fa-expand me-2"></i>{{ isFullScreen ? 'Exit Full Screen' : 'Full Screen' }}</a></li>
              </ul>
          </div>
          </div>
        </div>
      </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';


const router = useRouter();

let userLoggedIn = ref(false)
const isFullScreen = ref(false);


onMounted(async () => {
  userLoggedIn.value = await puter.auth.isSignedIn();
})

async function logout() {
    console.log('Logout');
    await puter.auth.signOut();
    router.push('/login');
  }
  
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      isFullScreen.value = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        isFullScreen.value = false;
      }
    }
  }
</script>

<style>
.navbar-brand{
  font-size: 20px;
}
@media screen and (max-width: 768px) {
  .navbar .container{
    margin-top: 0.25rem !important;
  }
}
</style>
