<template>
  <div class="input-group">
    <input id="btn-input" type="text" name="message" class="form-control input-sm"
      placeholder="Type your message here..." v-model="newMessage" @keyup.enter="sendMessage">

    <span class="input-group-btn">
      <button class="btn btn-primary btn-sm" id="btn-chat" @click="sendMessage">
        Send
      </button>
    </span>
  </div>
</template>

<script setup>
import {ref} from 'vue';
const props = defineProps(['user']);
const emit = defineEmits(['messagesent']);
const newMessage = ref('');


function sendMessage() {
emit('messagesent', {
    user: props.user,
    message: newMessage.value
  });

  newMessage.value = ''
}
</script>