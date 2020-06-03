// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import axios from "axios";
import Table from './views/Future/Table.vue'

// My Component



// todo
// cssVars()

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})



/**
 * Async Component
 * 
 * This is a renderless component.
 * It is an abstraction for GET requests.
 * Pass a mandatory "url" and an
 * optional "params" object.
 */

const Async = Vue.component('async', {
  props: {
    url: { type: String, default: "", required: true },
    params: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      pending: true,
      error: false,
      data: null,
      data2: null,
      data3: null,
      data4: null,
      data5: null,
      SentiScore: null,
      prob: null,
      TrendScore: null
    
    };
  },
  watch: {
    url() {
      this.requestData();
    },
    params: {
      handler() {
        this.requestData();
      },
      deep: true
    }
  },
  mounted() {
    this.requestData();

  },
  methods: {
    async requestData() {
      this.pending = true;
      try {
        const {data} = await axios.get(this.url, { params: this.params });
        this.data =  data;
        
        const info = await axios.get(this.url, { params: this.params });
        this.data2 =  info.data.data[0].Topic;
        this.data3 =  info.data.data[0].RT;
        this.data4 =  info.data.data[0].Likes;
        this.data5 =  info.data.data[0].TweetVolume;
        this.SentiScore = info.data.data[0].SentiScore;
        this.TrendScore = info.data.data[0].TrendingScore;
        this.prob = info.data.data[0].TrendingProb;

        this.data4 = this.data4/this.data5;
        this.data3 = this.data3/this.data5;

       
       
     
        
        
        this.error = false;
      } catch (e) {
        this.data = null;
        this.error = e;
      }
      this.pending = false;
    }
  },
  render() {
    return this.$scopedSlots.default({
      pending: this.pending,
      error: this.error,
      data: this.data,
      data2: this.data2,
      data3: this.data3.toLocaleString({ maximumFractionDigits: 0 }),
      data4: this.data4.toLocaleString({ maximumFractionDigits: 0 }),
      data5: this.data5.toLocaleString(),
      SentiScore: this.SentiScore,
      prob: this.prob,
      TrendScore: this.TrendScore
    });
  }
});



