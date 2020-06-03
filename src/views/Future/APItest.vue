<template>
  <div class="animated fadeIn">
    <b-card >
      {{errors}}
      {{point1}}

      <!-- {{[apidata]}} -->

      {{track1}}
      {{track2}}
      {{track3}}
  
   

      


  
    </b-card>


</div>
</template>

<script>
import ColorTheme from "./ColorTheme";
import axios from "axios";
import VueTableDynamic from 'vue-table-dynamic'


export default {
  name: "APItest",
  components: { ColorTheme },

  data() {
    const vm = this;
    return {
      posts: [],
      errors: [],

      apidata: [],

      track1: [],
      track2: [],
      track3: [],
      track4: [],
      track5: [],


      

   };
  },

    beforeCreate() {

    axios.get("https://www.mustavi.com/DailyTweetSentimentStat/?param1=lisa&param2=2020-05-23").then(res => {
      
      this.apidata = res.data
      this.track1 = res.data.data[0].Positive;
      this.track2 = res.data.data[0].Negative;
      this.track3 = res.data.data[0].Neutral;


 


    });
  },


  


};
</script>

<style scoped>


.mytable {
  background-color: #26374c;
  width: 425px;
}

</style>>