 <!--    
<template>
  <div class="hello">
    <div>Selected Trend: {{trend}}</div>
     <div>Selected Track: {{tracktrend}}</div>
  </div>
</template>
-->


<script>
import { Line } from "vue-chartjs";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { random } from "@/shared/utils";
import axios from "axios";

export default {
  extends: Line,
  props: {
    selectedTrend: Object,
  },


  data() {
    return {
      trend: [],
    };
  },

  watch: {
    selectedTrend: {
      immediate: true,
      async handler(to) {
        this.trend = to.Trends;
        this.drawChart(await this.GetAPIData(to.Trends, to.DT));
      }
    },
    
  },

  methods: {
    async GetAPIData(trend, dt) {
      var url = new URL(
        "https://www.mustavi.com/TimeSeries/?param1=China&param2=00"
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

        responseData[0].Predict_Frequency, //24
        responseData[1].Predict_Frequency,
        responseData[2].Predict_Frequency,
        responseData[3].Predict_Frequency,
        responseData[4].Predict_Frequency,
        responseData[5].Predict_Frequency,
        responseData[6].Predict_Frequency, //30
        responseData[7].Predict_Frequency,
        responseData[8].Predict_Frequency,
        responseData[9].Predict_Frequency,
        responseData[10].Predict_Frequency,
        responseData[11].Predict_Frequency,
        responseData[12].Predict_Frequency,
        responseData[13].Predict_Frequency,
        responseData[14].Predict_Frequency,
        responseData[15].Predict_Frequency,
        responseData[16].Predict_Frequency, //40
        responseData[17].Predict_Frequency,
        responseData[18].Predict_Frequency,
        responseData[19].Predict_Frequency,
        responseData[20].Predict_Frequency,
        responseData[21].Predict_Frequency,
        responseData[22].Predict_Frequency,
        responseData[23].Predict_Frequency, //47
      ];



    },
    
    drawChart(responseData) {

      const present = getStyle("--info") || "#20a8d8";
      const past = getStyle("--danger") || "#f86c6b";
     
      this.renderChart(
        {
          labels: ['Midnight','1:00', "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00",
                  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
          datasets: [
            {
            label: "Original Volume",
            backgroundColor: hexToRgba(present, 10),
            borderColor: present,
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data:  responseData
            },

            {
            label: "Smoother",
            backgroundColor: "transparent",
            borderColor: past,
            pointHoverBackgroundColor: "#fff",
            borderWidth: 1,
            borderDash: [8, 5],
            data: [ responseData[24], responseData[25], responseData[26], responseData[27], responseData[28], responseData[29], responseData[30], responseData[31],
            responseData[32], responseData[33], responseData[34], responseData[35], responseData[36], responseData[37], responseData[38], responseData[39], 
            responseData[40], responseData[41], responseData[42], responseData[43], responseData[44], responseData[45], responseData[46], responseData[47], ]
            }
          ]
        },

              {
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
                  chart.data.datasets[tooltipItem.datasetIndex].borderColor
              };
            }
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 6,
                stepSize: Math.ceil(10 / 4),
               
              },
              gridLines: {
                display: true
              }
            }
          ]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }


        
      );
    }
  },

  // async mounted() {
  //   let mydata = await this.GetAPIData();
  //   this.drawChart(mydata);
  // }
};
</script>