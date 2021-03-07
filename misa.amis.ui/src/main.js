import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import '../globalComponents';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
