<template>
  <form @submit.prevent="login">
    <div>
      <input type="email" v-model="email" placeholder="Email" />
    </div>
    <div>
      <input type="password" v-model="password" placeholder="Password" />
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("authenticated");
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          window.alert(error.message);
        });
    },
  },
};
</script>

<style></style>
