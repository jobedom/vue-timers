import Vue from 'vue';
import App from '~/App';
import VueTimers from '~/plugins/vue-timers';

Vue.use(VueTimers, { debug: false });

Vue.config.productionTip = false;

new Vue({
   el: '#app',
   render: h => h(App),
});
