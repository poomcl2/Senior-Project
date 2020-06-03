
<template>
  <div id="Tracking">
    <!-- <form id="app" @submit="addtrend" method="post" novalidate="true"> -->

    <form id="app" @submit.prevent="addtrend(newTrend,endTime)" novalidate="true">
      <p v-if="errors.length">
        <b style="color:red" v-for="error in errors" :key="error">*{{ error }}</b>
      </p>

      <div class="input-group mb-3">
        <input
          type="text"
          v-model="newTrend"
          class="form-control"
          placeholder="Trend to track"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            value="Submit"
            type="Submit"
            v-on:click="refreshtable(), checkForm()"
          >Register</button>
        </div>
      </div>

      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="inlineRadio1" value="7" v-model="endTime" />
        <label style="color:gray;" class="form-check-label" for="inlineRadio1">1 Week</label>
      </div>

      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="inlineRadio2" value="14" v-model="endTime" />
        <label style="color:gray;" class="form-check-label" for="inlineRadio2">2 Weeks</label>
      </div>
      <!-- 
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="inlineRadio2" value="21" v-model="endTime" />
        <label style="color:gray;" class="form-check-label" for="inlineRadio2">3 Week</label>
      </div>-->

      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" id="inlineRadio2" value="30" v-model="endTime" />
        <label style="color:gray;" class="form-check-label" for="inlineRadio2">1 Month</label>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";
import Vue from "vue";
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

export default {
  el: "#Tracking",
  name: "Tracking",
  data() {
    return {
      errors: [],
      name: null,
      newTrend: "",
      endTime: ""
    };
  },

  methods: {
    refreshtable() {
      this.$parent.refreshtable();
    },

    async addtrend(newtrend, date) {
      var url = new URL(
        "https://www.mustavi.com/TrendTracker/?param1=LAO&param2=2020-04-30"
      );
      var search_params = url.searchParams;

      // new value of param set to my topic
      search_params.set("param1", newtrend);
      search_params.set("param2", date);

      url.search = search_params.toString();
      var new_url = url.toString();
      console.log(new_url);

      axios.post(new_url);
    },





    checkForm: function(e) {
      this.errors = [];
      if (!this.newTrend) {
        this.errors.push("Trend required.");
      } else if (!this.endTime) {
        this.errors.push("Plese select duration");
      } else {
        this.$confirm("Do you want to register for this trend?").then(() => {
          this.$alert(
      "Please refresh the page to see the new tracked trend.",
      "Success",
      "success"
    ).then(() => console.log("Closed"));
        });
      }

      if (!this.errors.length) return true;
      e.preventDefault();
    }
  }
};
</script>

<style>
</style>
