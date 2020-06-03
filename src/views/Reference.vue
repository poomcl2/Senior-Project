<template >
  <div class="animated fadeIn">
    <div class="parent">
      <b-row>
        <br />
      </b-row>

      <b-row>
        <b-col sm="6" lg="3">
          <b-card no-body class="bg-primary" style="max-width: 300px;">
            <b-card-body class="pb-8">
              <b-dropdown class="float-right" variant="transparent p-0" right>
                <template slot="button-content">
                  <i class="icon-settings"></i>
                </template>
                <b-dropdown-item>Action</b-dropdown-item>
                <b-dropdown-item>Another action</b-dropdown-item>
                <b-dropdown-item>Something else here...</b-dropdown-item>
                <b-dropdown-item disabled>Disabled action</b-dropdown-item>
              </b-dropdown>
              <h4 class="mb-0">9.823</h4>
              <p>Up Coming Feature</p>
            </b-card-body>
            <card-line1-chart-example
              chartId="card-chart-01"
              class="chart-wrapper px-3"
              style="height:70px;"
              :height="70"
            />
          </b-card>
        </b-col>

        <!--************************ Trend Card **************************** -->

        <b-card style="max-width: 70rem;">
          <b-row>
            <b-col sm="8" lg="4">
              <div class="brand-card">
                <div class="brand-card-header bg-green">
                  <i class="fa fa-twitter">#LALISA</i>
                  <div class="chart-wrapper">
                    <social-box-chart-example
                      chartId="box-chart-01"
                      :data="[65, 59, 84, 84, 51, 55, 40]"
                    />
                  </div>
                </div>
                <div class="brand-card-body">
                  <div>
                    <div class="text-value">98</div>
                    <div class="text-uppercase text-muted small">Sentiment score</div>
                  </div>
                  <div>
                    <div class="text-value">84</div>
                    <div class="text-uppercase text-muted small">Trending score</div>
                  </div>
                </div>
              </div>
            </b-col>

            <b-col sm="8" lg="4">
              <div class="brand-card">
                <div class="brand-card-header bg-red">
                  <i class="fa fa-twitter">#PM2.5</i>
                  <div class="chart-wrapper">
                    <social-box-chart-example
                      chartId="box-chart-02"
                      :data="[1, 13, 9, 17, 34, 41, 38]"
                    />
                  </div>
                </div>
                <div class="brand-card-body">
                  <div>
                    <div class="text-value">7</div>
                    <div class="text-uppercase text-muted small">sentiment score</div>
                  </div>
                  <div>
                    <div class="text-value">88</div>
                    <div class="text-uppercase text-muted small">trending score</div>
                  </div>
                </div>
              </div>
            </b-col>

            <b-col sm="8" lg="4">
              <div class="brand-card">
                <div class="brand-card-header bg-red">
                  <i class="fa fa-twitter">#PM2.5</i>
                  <div class="chart-wrapper">
                    <social-box-chart-example
                      chartId="box-chart-02"
                      :data="[1, 13, 9, 17, 34, 41, 38]"
                    />
                  </div>
                </div>
                <div class="brand-card-body">
                  <div>
                    <div class="text-value">7</div>
                    <div class="text-uppercase text-muted small">sentiment score</div>
                  </div>
                  <div>
                    <div class="text-value">88</div>
                    <div class="text-uppercase text-muted small">{{toptrends1}}</div>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-card>

        <!--************************ Trend Card End **************************** -->

        <!--************************ TABLE **************************** -->

        <b-col sm="1" lg="1">
          <b-table
            style="max-width: 21rem;"
            class="mb-4 mytable table-outline"
            responsive="sm"
            hover
            :items="tableItems"
            :fields="tableFields"
            head-variant="light"
          >
            <div slot="trend" slot-scope="item">
              <div>
                <p>{{item.value.name}}</p>
              </div>

              <div class="small text-muted">
                <span>
                  <template>On Chart</template>
                </span>
                | {{item.value.onchart}}
              </div>
            </div>

            <div slot="tweet" slot-scope="item">
              <div>
                <p style="text-align:right;">{{item.value.state}}{{item.value.tweetupdate}}</p>
              </div>

              <div class="small text-muted" style="text-align:right;">
                <span style="text-align:right;">
                  <template style="text-align:right;">Total Tweets</template>
                </span>
              </div>
            </div>
          </b-table>
        </b-col>

        <!--************************ TABLE END **************************** -->
      </b-row>

      <b-card style="max-width: 60rem;">
        <input v-model="message" placeholder="Search #" />

        <br />

        <b-card style="max-width: 25rem;">
          <b-row>
            <b-col sm="5">
              <h4 id="traffic" class="card-title mb-0">Tweet of {{ message }}</h4>
              <div class="small text-muted">FEB 2017</div>
            </b-col>

            <b-col sm="7" class="d-none d-md-block">
              <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
                <b-form-radio-group
                  class="mr-3"
                  id="radiosBtn"
                  buttons
                  button-variant="outline-secondary"
                  v-model="selected"
                  name="radiosBtn"
                >
                  <b-form-radio class="mx-0" value="Day">Day</b-form-radio>
                  <b-form-radio class="mx-0" value="Month">Month</b-form-radio>
                </b-form-radio-group>
              </b-button-toolbar>
            </b-col>
          </b-row>
          <main-chart-example
            chartId="main-chart-01"
            class="chart-wrapper"
            style="height:300px;margin-top:40px;"
            height="300"
          ></main-chart-example>
          <div slot="footer">
            <b-row class="text-center">
              <b-col class="mb-sm-2 mb-0">
                <div class="text-muted">This Month</div>
                <strong>98</strong>
                <b-progress
                  height="{}"
                  class="progress-xs mt-2"
                  :precision="1"
                  variant="success"
                  :value="40"
                ></b-progress>
              </b-col>

              <b-col class="mb-sm-2 mb-0">
                <div class="text-muted">Last Month</div>
                <strong>22</strong>
                <b-progress
                  height="{}"
                  class="progress-xs mt-2"
                  :precision="1"
                  variant="danger"
                  :value="80"
                ></b-progress>
              </b-col>
            </b-row>
          </div>
        </b-card>

        <!--************************ Bar **************************** -->
        <b-card style="max-width: 50rem;" height="300">
          <b-row>
            <b-col sm="5">
              <h4 id="traffic" class="card-title mb-0">Tweet</h4>
              <div class="small text-muted">FEB 2017</div>
            </b-col>

            <b-col sm="7" class="d-none d-md-block">
              <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
                <b-form-radio-group
                  class="mr-3"
                  id="radiosBtn"
                  buttons
                  button-variant="outline-secondary"
                  v-model="selected"
                  name="radiosBtn"
                >
                  <b-form-radio class="mx-0" value="Day">Day</b-form-radio>
                  <b-form-radio class="mx-0" value="Month">Month</b-form-radio>
                </b-form-radio-group>
              </b-button-toolbar>
            </b-col>

            <BarChartSample chartId="bar-chart-01" height="350" width="600"></BarChartSample>
          </b-row>
        </b-card>
      </b-card>
    </div>
  </div>
  <!--************************ Bar END **************************** -->
</template>

<script>
import CardLine1ChartExample from "./dashboard/CardLine1ChartExample";
import CardLine2ChartExample from "./dashboard/CardLine2ChartExample";
import CardLine3ChartExample from "./dashboard/CardLine3ChartExample";
import CardBarChartExample from "./dashboard/CardBarChartExample";
import MainChartExample from "./dashboard/MainChartExample";
import SocialBoxChartExample from "./dashboard/SocialBoxChartExample";
import CalloutChartExample from "./dashboard/CalloutChartExample";
import { Callout } from "@coreui/vue";
import BarChartSample from "./charts/BarExample";
import axios from "axios";

export default {
  name: "Reference",
  components: {
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample,
    CalloutChartExample,
    BarChartSample
  },
  data: function() {
    return {
      selected: "Month",

      tableItems: [
        {
          trend: { name: "#PM2.5", new: true, onchart: "Jan 1, 2015" },

          tweet: { tweetupdate: +450, state: "+" }
        },
        {
          trend: { name: "#Virus", new: false, onchart: "Jan 1, 2015" },

          tweet: { tweetupdate: +190, state: "-" }
        },
        {
          trend: { name: "#Lalisa", new: true, onchart: "Jan 1, 2015" },

          tweet: { tweetupdate: +50, state: "-" }
        },
        {
          trend: { name: "#Poom", new: true, onchart: "Jan 1, 2015" },

          tweet: { tweetupdate: +350, state: "+" }
        },
        {
          trend: { name: "#Gameofthrone", new: true, onchart: "Jan 1, 2015" },

          tweet: { tweetupdate: +240, state: "+" }
        },
        {
          trend: { name: "#SaveThailand", new: true, onchart: "Jan 1, 2015" },

          tweet: { tweetupdate: +150, state: "-" }
        }
      ],
      tableFields: {
        trend: {
          label: "Trend Ranking"
        },
        tweet: {
          label: "21 Feb 2020"
        }
      }
    };
  },

  methods: {
    variant(value) {
      let $variant;
      if (value <= 25) {
        $variant = "info";
      } else if (value > 25 && value <= 50) {
        $variant = "success";
      } else if (value > 50 && value <= 75) {
        $variant = "warning";
      } else if (value > 75 && value <= 100) {
        $variant = "danger";
      }
      return $variant;
    },
    flag(value) {
      return "flag-icon flag-icon-" + value;
    }
  }
};
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}

.mytable {
  background-color: #24243d;
  width: 425px;
}

.topcard {
  width: 425px;
}

p {
  color: black;
}
/* .parent {
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-template-rows: repeat(2, 1fr);
grid-column-gap: 5px;
grid-row-gap: 5px;
}

.div1 { grid-area: 1 / 1 / 2 / 2; border: 1px solid red;}
.div2 { grid-area: 1 / 2 / 2 / 5; border: 1px solid blue;}
.div3 { grid-area: 2 / 1 / 3 / 5; border: 1px solid green;}
.div4 { grid-area: 1 / 5 / 3 / 6; border: 1px solid yellow;} */
</style>
