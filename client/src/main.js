import Vue from 'vue'
import App from './App.vue'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';

Vue.use(VueToast);

Vue.config.productionTip = false
Vue.mixin({
  methods: {
    displayUser: user => "[" + user.id + "] " + user.firstName + " " + user.lastName,
    displayBook: book => "[" + book.id + "] " + book.title + " by " + book.author + " (" + book.year + ")",
  },
  data () {
    return {
      SERVER_PATH: "http://localhost:3000/",
    }
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
