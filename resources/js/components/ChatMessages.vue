<template>
  <ul class="chat">
      <li class="left clearfix" v-for="message in messages">
          <div class="chat-body clearfix" :class="{text_right:message.user_id == user.id}">
              <div class="header">
                  <strong class="primary-font">
                  {{message}}
                      {{ message.user.name }}
                  </strong>
              </div>
              <p>
                  {{ message.message }}
              </p>
          </div>
      </li>
  </ul>
</template>

<script setup>
const props = defineProps(['messages','user']);
</script>

<style scoped>
.text-right{
    float:right;
}
.text-left{
    float:left;
}
</style>