 
 <!-- 
<template>
<div>

{{this.point0}}
{{this.point1}}
{{this.point2}}
{{this.point10}}
{{this.point20}}

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
  props: ["breedKey", "time"],

  computed: {
    topic() {
      return this.breedKey;
    },
    dataPresnet() {
      return [500, 400, 800];
    }
  },


  data() {
    return {
      point0: [],
      point1: [],
      point2: [],
      point3: [],
      point4: [],
      point5: [],
      point6: [],
      point7: [],
      point8: [],
      point9: [],
      point10: [],
      point11: [],
      point12: [],
      point13: [],
      point14: [],
      point15: [],
      point15: [],
      point16: [],
      point17: [],
      point18: [],
      point19: [],
      point20: [],
      point21: [],
      point22: [],
      point23: [],
      point24: [],
      promise:[],
      
      


      api:[],
    };
  },

  watch: {
  immediate: true,
   async breedKey (newVal, oldVal)  {
     
	   try {
       
      var url = new URL('https://www.mustavi.com/TimeSeries/?param1=China&param2=00');
      var search_params = url.searchParams;

      // new value of param set to my topic
      search_params.set('param1', 'China');
      search_params.set('param2', '2020-04-13');

      // change the search property of the main url
      url.search = search_params.toString();
      // the new url string
      var new_url = url.toString();
      // output : 'https://www.mustavi.com/TimeSeries/?param1=China&param2=2020-04-12'
      console.log(new_url);

      this.promise = axios.get(new_url);
      
      const res = await this.promise;

      this.point0 = res.data.data[0].Freq;
      this.point1 = res.data.data[1].Freq;
      this.point2 = res.data.data[2].Freq;
      this.point3 = res.data.data[3].Freq;
      this.point4 = res.data.data[4].Freq;
      this.point5 = res.data.data[5].Freq;
      this.point6 = res.data.data[6].Freq;
      this.point7 = res.data.data[7].Freq;
      this.point8 = res.data.data[8].Freq;
      this.point9 = res.data.data[9].Freq;
      this.point10 = res.data.data[10].Freq;
      this.point11 = res.data.data[11].Freq;
      this.point12 = res.data.data[12].Freq;
      this.point13 = res.data.data[13].Freq;
      this.point14 = res.data.data[14].Freq;
      this.point15 = res.data.data[15].Freq;
      this.point16 = res.data.data[16].Freq;
      this.point17 = res.data.data[17].Freq;
      this.point18 = res.data.data[18].Freq;
      this.point19 = res.data.data[19].Freq;
      this.point20 = res.data.data[20].Freq;
      this.point21 = res.data.data[21].Freq;
      this.point22 = res.data.data[22].Freq;
      this.point23 = res.data.data[23].Freq;
 
    } catch (e) {
      console.error(e);
    }
   },
   immediate: true,
  },

   async created() {
    try {

      var url = new URL('https://www.mustavi.com/TimeSeries/?param1=China&param2=00');
      var search_params = url.searchParams;

      // new value of param set to my topic
      search_params.set('param1', 'China');
      search_params.set('param2', '2020-04-13');

      // change the search property of the main url
      url.search = search_params.toString();
      // the new url string
      var new_url = url.toString();
      // output : 'https://www.mustavi.com/TimeSeries/?param1=China&param2=2020-04-12'
      console.log(new_url);

      this.promise = axios.get(new_url);

      const res = await this.promise;

      this.point0 = res.data.data[0].Freq;
      this.point1 = res.data.data[1].Freq;
      this.point2 = res.data.data[2].Freq;
      this.point3 = res.data.data[3].Freq;
      this.point4 = res.data.data[4].Freq;
      this.point5 = res.data.data[5].Freq;
      this.point6 = res.data.data[6].Freq;
      this.point7 = res.data.data[7].Freq;
      this.point8 = res.data.data[8].Freq;
      this.point9 = res.data.data[9].Freq;
      this.point10 = res.data.data[10].Freq;
      this.point11 = res.data.data[11].Freq;
      this.point12 = res.data.data[12].Freq;
      this.point13 = res.data.data[13].Freq;
      this.point14 = res.data.data[14].Freq;
      this.point15 = res.data.data[15].Freq;
      this.point16 = res.data.data[16].Freq;
      this.point17 = res.data.data[17].Freq;
      this.point18 = res.data.data[18].Freq;
      this.point19 = res.data.data[19].Freq;
      this.point20 = res.data.data[20].Freq;
      this.point21 = res.data.data[21].Freq;
      this.point22 = res.data.data[22].Freq;
      this.point23 = res.data.data[23].Freq;
 
    } catch (e) {
      console.error(e);
    }
  },


  async mounted() {
    await this.promise;
    

    const present = getStyle("--info") || "#20a8d8";
    const past = getStyle("--danger") || "#f86c6b";

    let elements = 90;

    const datapresent = [];
    const datapast = [];

    let p0 = this.point0;
    let p1 = this.point1;
    let p2 = this.point2;
    let p3 = this.point3;
    let p4 = this.point4;
    let p5 = this.point5;
    let p6 = this.point6;
    let p7 = this.point7;
    let p8 = this.point8;
    let p9 = this.point9;
    let p10 = this.point10;
    let p11 = this.point11;
    let p12 = this.point12;
    let p13 = this.point13;
    let p14 = this.point14;
    let p15 = this.point15;
    let p16 = this.point16;
    let p17 = this.point17;
    let p18 = this.point18;
    let p19 = this.point19;
    let p20 = this.point20;
    let p21 = this.point21;
    let p22 = this.point22;
    let p23 = this.point23;

    // datapresent.push(this.point0, p1, 500, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21, p21, p22, p23);
   

    for (let i = 0; i <= elements; i++) {
      datapresent.push(p0, p1, p2, p3, p4, p5);
      datapast.push(random(5000, 500));
    }

    this.renderChart(
      {
        labels: ['0:00','1:00', "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00",
         "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        datasets: [
          {
            label: "28 FEB",
            backgroundColor: hexToRgba(present, 10),
            borderColor: present,
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            data:  datapresent
          },

          {
            label: "27 FEB",
            backgroundColor: "transparent",
            borderColor: past,
            pointHoverBackgroundColor: "#fff",
            borderWidth: 1,
            borderDash: [8, 5],
            data: datapast
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
                max: 30000
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
};
</script>
