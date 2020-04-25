<template>
  <div class="hello">
    <h1>Messages</h1>

    <form @submit.prevent="sendMessage">
      <input type="text" v-model="newMessage" placeholder="Message" />
      <button type="submit">Send</button>
    </form>

    <ul>
      <li v-for="message in messages" :key="message.id">
        {{ message.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "ChatMessages",
  data: () => ({
    $db: null,
    messages: [],
    newMessage: "",
    unsubscribe: null,
  }),
  methods: {
    sendMessage() {
      if (!this.newMessage) {
        return;
      }

      this.$db
        .collection("messages")
        .add({
          text: this.newMessage,
          date: new Date(),
        })
        .then(() => {
          this.newMessage = "";
          console.log("message sent");
        });
    },
  },
  created() {
    this.$db = firebase.firestore();

    this.unsubscribe = this.$db
      .collection("messages")
      .orderBy('date', 'desc')
      .onSnapshot(
        (snapshot) =>
          (this.messages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })))
      );
  },
  destroyed() {
    this.unsubscribe();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
