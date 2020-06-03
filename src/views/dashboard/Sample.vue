
<template>
  <div style="max-height:500px;overflow:auto;">
    <table class="rwd-table table scrollbar" hover>
      <!-- <tr>
        <th></th>
        <th>Tweet Sample</th>
      </tr> -->

      <tr>
        <td v-if="happy0 =='Positive'" style="text-align:center">
          <img class="center" src="img/HappyUser.png" width="70" height="70" />
          @{{user0}}
 
        </td>
        <td v-else-if="happy0 =='Neutral'" style="text-align:center">
          <img class="center" src="img/SadUser.png" width="70" height="70" />
          @{{user0}}
   
        </td>
        <td v-else-if="happy0 =='Negative'" style="text-align:center">
          <img class="center" src="img/AngryUser.png" width="70" height="70" />
          @{{user0}}
   
        </td>
        <td data-th="Tweet">
          <b style="color:CornflowerBlue;">{{happy0}} Comment: </b>{{body0}}
          <div class="text-muted">
            <span>
              <i class="fa fa-heart">Like: {{like0}} &nbsp;</i>
              <i class="fa fa-retweet">Like: {{rt0}} &nbsp;</i>
            </span>
          </div>
        </td>
      </tr>

      <tr>
        <td v-if="happy1 =='Positive'" style="text-align:center">
          <img class="center" src="img/HappyUser.png" width="70" height="70" />
          @{{user1}}
        </td>
        <td v-else-if="happy1 =='Neutral'" style="text-align:center">
          <img class="center" src="img/SadUser.png" width="70" height="70" />
          @{{user1}}
        </td>
        <td v-else-if="happy1 =='Negative'" style="text-align:center">
          <img class="center" src="img/AngryUser.png" width="70" height="70" />
          @{{user1}}
        </td>
        <td data-th="Tweet">
          <b style="color:CornflowerBlue;">{{happy1}} Comment: </b>{{body1}}
          <div class="tablesmall text-muted">
            <span>
              <i class="fa fa-heart">Like: {{like1}} &nbsp;</i>
              <i class="fa fa-retweet">Like: {{rt1}}</i>
            </span>
          </div>
        </td>
      </tr>

      <tr>
        <td v-if="happy2 =='Positive'" style="text-align:center">
          <img class="center" src="img/HappyUser.png" width="70" height="70" />
          @{{user2}}
        </td>
        <td v-else-if="happy2 =='Neutral'" style="text-align:center">
          <img class="center" src="img/SadUser.png" width="70" height="70" />
          @{{user2}}
        </td>
        <td v-else-if="happy2 =='Negative'" style="text-align:center">
          <img class="center" src="img/AngryUser.png" width="70" height="70" />
          @{{user2}}
        </td>
        <td data-th="Tweet">
          <b style="color:CornflowerBlue;">{{happy2}} Comment: </b>{{body2}}
          <div class="tablesmall text-muted">
            <span>
              <i class="fa fa-heart">Like: {{like2}} &nbsp;</i>
              <i class="fa fa-retweet">Like: {{rt2}}</i>
            </span>
          </div>
        </td>
      </tr>

      <tr>
        <td v-if="happy3 =='Positive'" style="text-align:center">
          <img class="center" src="img/HappyUser.png" width="70" height="70" />
          @{{user3}}
        </td>
        <td v-else-if="happy3 =='Neutral'" style="text-align:center">
          <img class="center" src="img/SadUser.png" width="70" height="70" />
          @{{user3}}
        </td>
        <td v-else-if="happy3 =='Negative'" style="text-align:center">
          <img class="center" src="img/AngryUser.png" width="70" height="70" />
          @{{user3}}
        </td>
        <td data-th="Tweet">
          <b style="color:CornflowerBlue;">{{happy3}} Comment: </b>{{body3}}
          <div class="tablesmall text-muted">
            <span>
              <i class="fa fa-heart">Like: {{like3}} &nbsp;</i>
              <i class="fa fa-retweet">Like: {{rt3}}</i>
            </span>
          </div>
        </td>
      </tr>

      <tr>
        <td v-if="happy4 =='Positive'" style="text-align:center">
          <img class="center" src="img/HappyUser.png" width="70" height="70" />
          @{{user4}}
        </td>
        <td v-else-if="happy4 =='Neutral'" style="text-align:center">
          <img class="center" src="img/SadUser.png" width="70" height="70" />
          @{{user4}}
        </td>
        <td v-else-if="happy4 =='Negative'" style="text-align:center">
          <img class="center" src="img/AngryUser.png" width="70" height="70" />
          @{{user4}}
        </td>
        <td data-th="Tweet">
          <b style="color:CornflowerBlue;">{{happy4}} Comment: </b>{{body4}}
          <div class="tablesmall text-muted">
            <span>
              <i class="fa fa-heart">Like: {{like4}} &nbsp;</i>
              <i class="fa fa-retweet">Like: {{rt4}}</i>
            </span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Sample",
  props: ["breedKey", "time"],

  computed: {
    trend() {
      return this.breedKey;
    }
  },

  data() {
    return {
      time: [],
      breedKey: [],

      user0: [],
      user1: [],
      user2: [],
      user3: [],
      user4: [],

      body0: [],
      body1: [],
      body2: [],
      body3: [],
      body4: [],

      like0: [],
      like1: [],
      like2: [],
      like3: [],
      like4: [],

      rt0: [],
      rt1: [],
      rt2: [],
      rt3: [],
      rt4: [],

      happy0: [],
      happy1: [],
      happy2: [],
      happy3: [],
      happy4: []
    };
  },

  async created(breedKey, time) {
    try {
      var url = new URL(
        "https://www.mustavi.com/TweetSample/?param1=China&param2=00"
      );
      var search_params = url.searchParams;

      // new value of param set to my topic
      search_params.set("param1", this.breedKey);
      search_params.set("param2", this.time);

      // change the search property of the main url
      url.search = search_params.toString();
      // the new url string
      var new_url = url.toString();
      // output : 'https://www.mustavi.com/TimeSeries/?param1=China&param2=2020-04-12'
      console.log(new_url);

      this.promise = axios.get(new_url);

      const res = await this.promise;

      this.user0 = res.data.data[0].Username;
      this.user1 = res.data.data[1].Username;
      this.user2 = res.data.data[2].Username;
      this.user3 = res.data.data[3].Username;
      this.user4 = res.data.data[4].Username;

      this.body0 = res.data.data[0].Body;
      this.body1 = res.data.data[1].Body;
      this.body2 = res.data.data[2].Body;
      this.body3 = res.data.data[3].Body;
      this.body4 = res.data.data[4].Body;

      this.like0 = res.data.data[0].Likes;
      this.like1 = res.data.data[1].Likes;
      this.like2 = res.data.data[2].Likes;
      this.like3 = res.data.data[3].Likes;
      this.like4 = res.data.data[4].Likes;

      this.rt0 = res.data.data[0].RT;
      this.rt1 = res.data.data[1].RT;
      this.rt2 = res.data.data[2].RT;
      this.rt3 = res.data.data[3].RT;
      this.rt4 = res.data.data[4].RT;

      this.happy0 = res.data.data[0].Sentiment;
      this.happy1 = res.data.data[1].Sentiment;
      this.happy2 = res.data.data[2].Sentiment;
      this.happy3 = res.data.data[3].Sentiment;
      this.happy4 = res.data.data[4].Sentiment;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style>
/* @import "https://fonts.googleapis.com/css?family=Montserrat:300,400,700"; */

.rwd-table tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.rwd-table th {
  display: none;
}
.rwd-table td {
  display: block;
}

@media (min-width: 480px) {
  .rwd-table td:before {
    display: none;
  }
}

@media (min-width: 480px) {
  .rwd-table th,
  .rwd-table td {
    display: table-cell;
    padding: 0.25em 0.5em;
  }
  .rwd-table th:first-child,
  .rwd-table td:first-child {
    padding-left: 0;
  }
  .rwd-table th:last-child,
  .rwd-table td:last-child {
    padding-right: 0;
  }
}

.rwd-table {
  background: #4d7181c2;
  color: #fff;
  border-radius: 0.4em;
  overflow: auto;
}
.rwd-table tr {
  border-color: #0e5394;
}
.rwd-table th,
.rwd-table td {
  margin: 0.5em 1em;
}
@media (min-width: 480px) {
  .rwd-table th,
  .rwd-table td {
    padding: 1em !important;
  }
}
.rwd-table th,
.rwd-table td:before {
  color: #dd5;
}
</style>
