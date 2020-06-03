<template>
  <div id="app2">
    <div class="animated fadeIn">
      <b-card>
        <table>
          <tr>
            <th>Daily Trend Ranking</th>
            <th>29/03/2020</th>
          </tr>
          <tr>
            <td>
              <b-button variant="link" v-on:click="currentBreed = 0">  {{ breeds[0].name }}  </b-button>
            </td>
            <td>Total Tweet: {{ total0 }}</td>
          </tr>
          <tr>
            <td>
              <button  @click="currentBreed = 1">  {{ breeds[1].name }}  </button>
            </td>
            <td>Total Tweet: {{ total1 }}</td>
          </tr>
          <tr>
            <td>
              <button @click="currentBreed = 2">poom</button>
            </td>
            <td>Total Tweet: total0</td>
          </tr>
          <tr>
            <td>
              <button @click="currentBreed = 3">poom</button>
            </td>
            <td>Total Tweet: total0</td>
          </tr>
          <tr>
            <td>
              <button @click="currentBreed = 4">poom</button>
            </td>
            <td>Total Tweet: total0</td>
          </tr>
          <tr>
            <td>
              <button @click="currentBreed = 5">poom</button>
            </td>
            <td>Total Tweet: total0</td>
          </tr>
        </table>
      </b-card>

      <!-- Async Component -->
      <async
        :url="`https://03m2iw9kai.execute-api.ap-southeast-1.amazonaws.com/ProductionRun/tweets/?query=${breedKey}`"
      >
        <!-- Scoped Slot of Async Component -->
        <template v-slot:default="{ pending, error, data, data2, data3, data4 }">
          <!-- Request Pending -->
          <div v-if="pending" class="text-center">
            <img
              src="https://files.codethink.de/public/Preloader_2.gif"
              alt="loading"
              class="mx-auto"
            />
            <span class="text-gray-400 font-medium">Loading ...</span>
          </div>

          <!-- Request Error -->
          <div
            v-else-if="error"
            class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
            role="alert"
          >{{ error }}</div>

          <!-- Request Success -->
          <ul v-else class="flex flex-wrap justify-between">
            <div class="card bg-primary text-white">
              <div class="card-body">
                <b>Tag:</b>
                {{ data2 }}
              </div>
            </div>
            <div class="card bg-primary text-white">
              <div class="card-body">Like: {{ data4 }}</div>
            </div>
            <div class="card bg-primary text-white">
              <div class="card-body">Retweets: {{ data3 }}</div>
            </div>
            <div class="card bg-primary text-white">
              <div class="card-body">Total Tweet: {{ total0 }}</div>
            </div>
          </ul>
        </template>
      </async>

    </div>
  </div>
</template>

<script>
import ColorTheme from "./ColorTheme";
import axios from "axios";
import VueTableDynamic from "vue-table-dynamic";


/**
 * Async Component
 *
 * This is a renderless component.
 * It is an abstraction for GET requests.
 * Pass a mandatory "url" and an
 * optional "params" object.
 */

export default {
  name: "Table",

  data() {
    const vm = this;
    return {
      currentBreed: 0,
      topic0: null,
      topic1: null,
      topic2: null,
      topic3: null,
      topic4: null,
      topic5: null,
      
      total0: null,
      total1: null,
      total2: null,
      total3: null,
      total4: null,
      total5: null,
      
      test: null,
      breeds: [

        { name: "" , key: "", total: "" }, // Initially empty values
        { name: "" , key: "" }, // Initially empty values
        { name: "" , key: "" }, // Initially empty values
        { name: "" , key: "" }, // Initially empty values
        { name: "" , key: "" }, // Initially empty values
        { name: "" , key: "" }, // Initially empty values
   
      ]
    }
  },
  async created() {
    try {
      this.promise = axios.get(
        "https://czvhix8279.execute-api.ap-southeast-1.amazonaws.com/tr"
      );
      const res = await this.promise;
      this.topic0 = res.data[0].TrendsClean;
      this.topic1 = res.data[1].TrendsClean;
      this.topic2 = res.data[2].TrendsClean;  
      this.topic3 = res.data[3].TrendsClean;  
      this.topic4 = res.data[4].TrendsClean;  
      this.topic5 = res.data[5].TrendsClean;  
      
      this.total0 = res.data[0].TweetVolume;
      this.total1 = res.data[1].TweetVolume;
      this.total2 = res.data[2].TweetVolume; 
      this.total3 = res.data[3].TweetVolume;
      this.total4 = res.data[4].TweetVolume; 
      this.total5 = res.data[5].TweetVolume;
      
      this.breeds[0].name = this.breeds[0].key = this.topic0;
      this.breeds[1].name = this.breeds[1].key = this.topic1;
      this.breeds[2].name = this.breeds[2].key = this.topic2;
      this.breeds[3].name = this.breeds[3].key = this.topic3;
      this.breeds[4].name = this.breeds[4].key = this.topic4;
      this.breeds[5].name = this.breeds[5].key = this.topic5;
      
      this.breeds[0].total = this.total0;
      
    } catch (e) {
      console.error(e);
    }  
  },
  computed: {
    breedKey() {
      return this.breeds[this.currentBreed].key;
    }
  }





};
</script>

<style scoped>
.mytable {
  background-color: #26374c;
  width: 425px;
}
p {
  color: aliceblue;
}
</style>>