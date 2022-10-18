/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import "./bootstrap";
import { ref, createApp, onMounted  } from "vue";
import axios from "axios";

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */
import ExampleComponent from "./components/ExampleComponent.vue";
import ChatForm from "./components/ChatForm.vue";
import ChatMessages from "./components/ChatMessages.vue";

createApp({
    components: {
        ExampleComponent,
        ChatForm,
        ChatMessages,
    },
    setup() {
        const messages = ref([]);
        onMounted (()=>{
            fetchMessages();
            window.Echo.private('chat')
            .listen('MessageSent', (e) => {
               messages.value.push({
                    message: e.message.message,
                    user: e.user
                });
            });
        })
        function fetchMessages() {
            axios.get("/messages").then((response) => {
                messages.value = response.data;
            });
        }
        function addMessage(message) {
            messages.value.push(message);
            axios.post("/messages", message).then((response) => {});
        }
        return {
            messages,
            addMessage
        };
    },
}).mount("#app");

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */