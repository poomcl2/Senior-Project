 <!--   
<template>
  <div class="hello">
    <div>{{trend}} {{dt}}</div>
  </div>
</template>
-->


<script>
import { Bar } from "vue-chartjs";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import axios from "axios";

export default {
  extends: Bar,
  props: {
    selectedBar: Object
  },

  data() {
    return {
      trend: [],
  
    
    };
  },

  watch: {
    selectedBar: {
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
        "https://www.mustavi.com/BarChart/?param1=China&param2=2020-04"
      );
      var search_params = url.searchParams;

      // new value of param set to my topic
      var newDT = dt.substring(0, 7);
      search_params.set("param1", trend);
      search_params.set("param2", newDT);
      url.search = search_params.toString();
      var new_url = url.toString();
      console.log(new_url);

      let responseData = (await axios.get(new_url)).data.data;
      return [
        responseData[0].Freq,
        responseData[1].Freq,
        responseData[2].Freq,
        responseData[3].Freq,
        responseData[4].Freq,
        responseData[5].Freq,
        responseData[6].Freq,
        responseData[7].Freq,
        responseData[8].Freq,
        responseData[9].Freq,
        responseData[10].Freq,
        responseData[11].Freq,
        responseData[12].Freq,
        responseData[13].Freq,
        responseData[14].Freq,
        responseData[15].Freq,
        responseData[16].Freq,
        responseData[17].Freq,
        responseData[18].Freq,
        responseData[19].Freq,
        responseData[20].Freq,
        responseData[21].Freq,
        responseData[22].Freq,
        responseData[23].Freq,
        responseData[24].Freq,
        responseData[25].Freq,
        responseData[26].Freq,
        responseData[27].Freq,
        responseData[28].Freq,
        responseData[29].Freq,
       
      
      ];
    },

    drawChart(responseData) {
      const name = this.trend
      this.renderChart(
        {
          labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17",
            "18","19","20","21","22","23","24","25","26","27","28","29","30","31"
          ],
          datasets: [
            {
              label: "#" + name,
              labelColor: "#C0B0FF",
              backgroundColor: "#C0B0FF",
              data: responseData
            }
          ]
        },
        {
          responsive: true,
          maintainAspectRatio: true,
          tooltips: {
            enabled: false,
            custom: CustomTooltips,
            intersect: true,
            mode: "index",
            position: "nearest",
            callbacks: {
              labelColor: function(tooltipItem, chart) {
                return {
                  backgroundColor:
                    chart.data.datasets[tooltipItem.datasetIndex]
                      .backgroundColor
                };
              }
            }
          }
        }
      );
    }
  },
  async mounted() {
    let mydata = await this.GetAPIData();
    this.drawChart(mydata);
  }
};
</script>
