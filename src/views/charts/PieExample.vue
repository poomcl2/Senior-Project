<script>
import { Pie } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Pie,
  props: {
    selectedTrend: Object
  },

  data() {
    return {
      trend: []
    };
  },

  watch: {
    selectedTrend: {
      immediate: true,
      async handler(to) {
        this.trend = to.Trends;
        this.drawChart(await this.GetAPIData(to.Trends, to.DT));
      }
    }
  },

  methods: {
    async GetAPIData(trend, dt) {
      this.apiData = [];
      var url = new URL(
        "https://www.mustavi.com/DailyTweetSentimentStat/?param1=lisa&param2=2020-05-23"
      );
      var search_params = url.searchParams;

      // new value of param set to my topic
      search_params.set("param1", trend);
      search_params.set("param2", dt);

      url.search = search_params.toString();
      var new_url = url.toString();
      console.log(new_url);

      let responseData = (await axios.get(new_url)).data.data;
      return [
        responseData[0].Positive,
        responseData[0].Negative,
        responseData[0].Neutral,
      ];
    },

    drawChart(responseData) {
      this.renderChart(
        {
          labels: ["Good", "Neutral", "Bad"],
          datasets: [
            {
              backgroundColor: [
                "#14613e",
                "#f7972f",
                "#b31212"
              ],
              data: responseData
            }
          ]
        },
        { responsive: true, maintainAspectRatio: true }
      );
    }
  }
 
};
</script>
