<template>
  <div class="animated fadeIn">
    <div class="parent">
      <br />

      <!-- <b-container fluid="md"> -->
      <div class="container-fluid">
        <!---------------------------------------------- Positive vs Negative Card ----------------------------------------->
        <b-row>
          <b-col sm="6" lg="2">
            <b-row>
              <b-card no-body class="bg-poom border-dark" style="width: 100%; text-white;">
                <div class="card-body card-body-nobot">
                  <b-dropdown class="float-right" variant="transparent p-0" right>
                    <template slot="button-content">
                      <i class="icon-settings"></i>
                    </template>
                    <b-dropdown-item>Last 24 Hours</b-dropdown-item>
                    <b-dropdown-item>Last 7 Days</b-dropdown-item>
                    <b-dropdown-item disabled>Future Function</b-dropdown-item>
                  </b-dropdown>
                  <h4 class="mb-0">Tweet Sentiment</h4>
                </div>

                <PieExample v-if="selectedTrend" :selectedTrend="selectedTrend" />

                <b-card-body class="pb-8">
                  <!-- <b>Tracking Trend</b> -->
                  <Tracking></Tracking>
                </b-card-body>

                <div style="height:215px;overflow:auto;">
                  <table
                    class="table table-hover table-inverse scrollbar"
                    responsive="sm"
                    hover
                    style="max-width: rem;"
                    id="style-2"
                  >
                    <tbody>
                      <tr :key="trend.Trend" v-for="(trend) in toptrackTrends">
                        <td colspan="4">
                          <div>
                            <b-button
                              variant="link"
                              v-on:click="LoadTrackTrend(trend.Trend, time); currentBreed=trend.Index "
                            >{{trend.Trend}}</b-button>
                          </div>

                          <div class="tablesmall text-muted">
                            <span>End At: {{trend.EndTime}}</span>
                          </div>
                        </td>
                        <td colspan="2">
                          <!-- v-on:click="DeleteTrend(trend.ID), ConfirmDelete()" -->
                          <div>
                            <b-button
                              class="whitebutton"
                              align="center"
                              v-on:click="DeleteTrend(trend.ID)"
                            >
                              <i class="fa fa-trash"></i>
                            </b-button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-card>
            </b-row>
          </b-col>

          <!------------------------------------------------ Trend Profile Card ---------------------------------------------->
          <b-col sm="6" lg="7">
            <!-- CARD STYLE -->
            <div class="card text-white bg-mycarddark mb-3" style="width: 100%;">
              <div class="card-header" style=" height:60px;">
                <h2 class="card-title">
                  <b>Hashtag Summary:</b>
                  <b style="color:cyan;">#{{breedKey}}</b>
                  
                </h2>
              </div>
              <b-card-body class="card-bodyme" style="max-height: 37rem;">
                <b-row>
                  <!-- Async Component -->

                  <async
                    :url="`https://www.mustavi.com/DailyTweetStat/?param1=${breedKey}&param2=${time}`"
                  >
                    <!-- Scoped Slot of Async Component -->
                    <template
                      v-slot:default="{ pending, error, data, data2, data3, data4, data5, SentiScore, prob, TrendScore }"
                    >
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
                      >
                        {{ error }}
                        <h3>Trend's Data Not Available</h3>
                      </div>

                      <!-- Request Success -->
                      <ul v-else>
                        <b-row>
                          <!-- Tweet Sample -->
                          <b-col sm="6" lg="6">
                            <h4 class="card-title">Top Tweet Sample: <small>{{time}}</small></h4>
                            <Sample
                              v-bind:breed-key="breedKey"
                              v-bind:time="time"
                              style="width: 100%;"
                            />
                          </b-col>

                          <!-- PROFILE CARD -->
                          <b-col sm="6" lg="6">
                            <!-- ROW1: Tweet+Sentiment -->
                            <br />
                            <div class="container">
                              <b-row>
                                <b-col sm="6" lg="6">
                                  <div class="card" style="max-width: 13rem;">
                                    <div class="card-body">
                                      <div class="text-right " style="font-size:30px">
                                        <i class="fa fa-twitter"></i>
                                      </div>
                                      <div class="text-value-lg">{{ data5 }}</div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Tweets</small>
                                    </div>
                                  </div>
                                </b-col>

                                <b-col sm="6" lg="6">
                                  <div
                                    v-if="SentiScore>=7"
                                    class="cardgreen"
                                    style="max-width: 13rem; height: 9.5rem;"
                                  >
                                    <div class="card-body">
                                      <!-- ICON If -->
                                      <div class="text-right" v-if="SentiScore>=7">
                                        <img
                                          class="text-right navbar-brand-full"
                                          src="img/Smile2.png"
                                          width="50"
                                          height="50"
                                        />
                                      </div>
                                      <div class="text-value-lg">
                                        <b>{{ SentiScore }} / 10</b>
                                      </div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Sentiment Score</small>
                                    </div>
                                  </div>

                                  <div
                                    v-else-if="SentiScore<7 && SentiScore>=5"
                                    class="cardyellow"
                                    style="max-width: 13rem; height: 9.5rem;"
                                  >
                                    <div class="card-body">
                                      <!-- ICON If -->
                                      <div class="text-right">
                                        <img
                                          class="text-right navbar-brand-full"
                                          src="img/Boring2.png"
                                          width="55"
                                          height="55"
                                          alt="CoreUI Logo"
                                        />
                                      </div>
                                      <div class="text-value-lg">
                                        <b>{{ SentiScore }} / 10</b>
                                      </div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Sentiment Score</small>
                                    </div>
                                  </div>

                                  <div
                                    v-else-if="SentiScore<5"
                                    class="cardred"
                                    style="max-width: 13rem; height: 9.5rem;"
                                  >
                                    <div class="card-body">
                                      <!-- ICON If -->
                                      <div class="text-right">
                                        <img
                                          class="text-right navbar-brand-full"
                                          src="img/Sad2.png"
                                          width="50"
                                          height="50"
                                          alt="CoreUI Logo"
                                        />
                                      </div>

                                      <div class="text-value-lg">
                                        <b>{{ SentiScore }} / 10</b>
                                      </div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Sentiment Score</small>
                                    </div>
                                  </div>
                                </b-col>
                              </b-row>

                              <!-- ROW2: LIKE+TrendScore -->
                              <b-row>
                                <b-col sm="6" lg="6">
                                  <div class="card" style="max-width: 13rem;">
                                    <div class="card-body">
                                      <div class="text-right " style="font-size:30px">
                                        <i class="fa fa-heart"></i>
                                      </div>
                                      <div class="text-value-lg">{{ data4 }}</div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Average Likes</small>
                                    </div>
                                  </div>
                                </b-col>

                                <b-col sm="6" lg="6">
                                  <div
                                    v-if="TrendScore>=7"
                                    class="cardgreen"
                                    style="max-width: 13rem; height: 9.5rem;"
                                  >
                                    <div class="card-body">
                                      <!-- ICON If -->
                                      <div class="text-right" v-if="TrendScore>=7">
                                        <img
                                          class="text-right navbar-brand-full"
                                          src="img/Smile2.png"
                                          width="50"
                                          height="50"
                                        />
                                      </div>
                                      <div class="text-value-lg">
                                        <b>{{ TrendScore }} / 10</b>
                                      </div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Trending Score</small>
                                    </div>
                                  </div>

                                  <div
                                    v-else-if="TrendScore<7 && TrendScore>=5"
                                    class="cardyellow"
                                    style="max-width: 13rem; height: 9.5rem;"
                                  >
                                    <div class="card-body">
                                      <!-- ICON If -->
                                      <div class="text-right">
                                        <img
                                          class="text-right navbar-brand-full"
                                          src="img/Boring2.png"
                                          width="55"
                                          height="55"
                                          alt="CoreUI Logo"
                                        />
                                      </div>
                                      <div class="text-value-lg">
                                        <b>{{ TrendScore }} / 10</b>
                                      </div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Trending Score</small>
                                    </div>
                                  </div>

                                  <div
                                    v-else-if="TrendScore<5"
                                    class="cardred"
                                    style="max-width: 13rem; height: 9.5rem;"
                                  >
                                    <div class="card-body">
                                      <!-- ICON If -->
                                      <div class="text-right">
                                        <img
                                          class="text-right navbar-brand-full"
                                          src="img/Sad2.png"
                                          width="50"
                                          height="50"
                                          alt="CoreUI Logo"
                                        />
                                      </div>

                                      <div class="text-value-lg">
                                        <b>{{ TrendScore }} / 10</b>
                                      </div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Trending Score</small>
                                    </div>
                                  </div>
                                </b-col>
                              </b-row>

                              <!-- ROW3: RT+TrendProp -->
                              <b-row>
                                <b-col sm="6" lg="6">
                                  <div class="card" style="max-width: 13rem;  ">
                                    <div class="card-body">
                                      <div class="text-right " style="font-size:30px">
                                        <i class="fa fa-retweet"></i>
                                      </div>
                                      <div class="text-value-lg">{{ data3 }}</div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Average Retweets</small>
                                    </div>
                                  </div>
                                </b-col>

                                <b-col sm="6" lg="6">
                                  <div
                                    v-if="prob>=70"
                                    class="cardgreen2"
                                    style="max-width: 13rem; height: 9.5rem;"
                                  >
                                    <div class="card-body">
                                      <div class="text-value-lg">
                                        <b>{{prob}}%</b>
                                      </div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Trending Probability</small>

                                      <b-progress
                                        style="height: 15px; max-width:150px;"
                                        height="{}"
                                        class="progress-xs mt-2"
                                        :precision="1"
                                        :value="prob"
                                        variant="success"
                                      ></b-progress>
                                    </div>
                                  </div>

                                  <div
                                    v-else-if="prob<70 && prob>50"
                                    class="cardyellow2"
                                    style="max-width: 13rem; height: 9.5rem;"
                                  >
                                    <div class="card-body">
                                      <div class="text-value-lg">
                                        <b>{{prob}}%</b>
                                      </div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Trending Probability</small>

                                      <b-progress
                                        style="height: 15px; max-width:150px;"
                                        height="{}"
                                        class="progress-xs mt-2"
                                        :precision="1"
                                        :value="prob"
                                        variant="yellow"
                                      ></b-progress>
                                    </div>
                                  </div>

                                  <div
                                    v-else-if="prob<=50"
                                    class="cardred"
                                    style="max-width: 13rem; height: 9.5rem;"
                                  >
                                    <div class="card-body">
                                      <div class="text-value-lg">
                                        <b>{{prob}}%</b>
                                      </div>
                                      <small
                                        class="text-muted text-uppercase font-weight-bold"
                                      >Trending Probability</small>

                                      <b-progress
                                        style="height: 15px; max-width:150px;"
                                        height="{}"
                                        class="progress-xs mt-2"
                                        :precision="1"
                                        :value="prob"
                                        variant="danger"
                                      ></b-progress>
                                    </div>
                                  </div>
                                </b-col>
                              </b-row>
                              <!-- END ROW3 -->
                            </div>
                          </b-col>
                          <!-- END Profile Card -->
                        </b-row>
                        <!-- END Big Card -->
                      </ul>
                    </template>
                  </async>
                </b-row>
              </b-card-body>
              <!-- </div> -->
            </div>
            <!-- </card body> -->
          </b-col>

          <!------------------------------------------------ Table Card ---------------------------------------------->

          <b-col sm="6" lg="3">
            <div style="overflow:auto; height: 45rem;">
              <b-card bg-variant="poom" style="width: 100%; bg-primary text-white">
                <!-- <div v-if="loading" class="loading">Loading...</div> -->
                <table
                  class="table table-hover table-inverse"
                  responsive="sm"
                  hover
                  :items="tableItems"
                  :fields="tableFields"
                  style="max-width: 23rem; "
                >
                  <thead>
                    <tr>
                      <th>
                        <b style="color:DeepSkyBlue;"><i style="color:DeepSkyBlue;" class="fa fa-twitter"></i> Daily Trend Ranking</b>
                      </th>
                      <th></th>

                      <th>
                        <b style="color:DeepSkyBlue;" class="myb">({{time}})</b>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr :key="trend.Trends" v-for="(trend) in topTrends">
                      <td colspan="1">
                        <div>
                          <b-button
                            variant="link"
                            v-on:click="LoadTrend(trend.Trends, trend.DT); currentBreed=trend.index "
                          >{{trend.Trends}}</b-button>
                        </div>

                        <div class="tablesmall text-muted">
                          <span>Trending Probability: {{trend.TrendingProb}}%</span>
                        </div>

                        <b-progress
                          v-if="trend.TrendingProb>=70"
                          style="height: 5px; width:150px;"
                          height="{}"
                          class="progress-xs mt-2"
                          :precision="1"
                          :value="trend.TrendingProb"
                          variant="success"
                        ></b-progress>

                        <b-progress
                          v-else-if="trend.TrendingProb<70 && trend.TrendingProb>=50"
                          style="height: 5px; width:150px;"
                          height="{}"
                          class="progress-xs mt-2"
                          :precision="1"
                          :value="trend.TrendingProb"
                          variant="yellow"
                        ></b-progress>
                        <b-progress
                          v-else-if="trend.TrendingProb<50"
                          style="height: 5px; width:150px;"
                          height="{}"
                          class="progress-xs mt-2"
                          :precision="1"
                          :value="trend.TrendingProb"
                          variant="danger"
                        ></b-progress>
                      </td>
                      <td colspan="6">
                        <div>
                          <p align="right" style="color:green;">
                            <b
                              v-if="trend.Operator == '+' "
                              style="color:green;"
                            >{{trend.Operator}}{{ trend.Change.toLocaleString() }}</b>
                            <b
                              v-else-if="trend.Operator == '-' "
                              style="color:red;"
                            >{{ trend.Change.toLocaleString() }}</b>
                          </p>

                          <p style="color:DeepSkyBlue;" align="right">Total: {{ trend.TweetVol.toLocaleString() }}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-card>
            </div>
          </b-col>
        </b-row>
        <!-----******************************************** END ROW 1 ***********************************************----->

        <br />

        <!-----******************************************** START ROW 2 ***********************************************----->
        <b-row>
          <b-col sm="6" lg="9">
            <!------------------------------------------------ Time Series Card ---------------------------------------------->
            <div
              class="card text-white bg-mycarddark mb-3"
              style="max-width: 90rem; "
              id="divnoleft"
            >
              <div class="card-header" style=" height:49px;">
                <div class="topnav">
                  <a class="active" href="#home">
                    <b>Hashtag Analysis:</b>
                    <b style="color:cyan;">#{{breedKey}}</b>
                  </a>
                </div>
              </div>

              <div class="card-body">
                <b-row>
                  <b-col sm="12">
                    <b-card bg-variant="primary" border-variant="dark" height="100">
                      <b-row>
                        <b-col sm="6">
                          <h3 id="traffic" class="card-title mb-0">Tweets Per Hour: {{time}}</h3>
                          <div class="small text-muted">
                            <p class="blue"></p>
                          </div>
                        </b-col>

                        <PoomChart
                          v-if="selectedTrend"
                          :selectedTrend="selectedTrend"
                          class="chart-wrapper Chartsize"
                          style="height:340px;margin-top:10px;"
                          max-width="1200px"
                        />
                      </b-row>
                    </b-card>
                  </b-col>
                </b-row>
              </div>

              <div class="card-body">
                <b-row>
                  <b-col sm="12">
                    <b-card
                      bg-variant="primary"
                      border-variant="dark"
                      height="100"
                      style="max-width: 200rem;"
                    >
                      <b-row>
                        <b-col sm="12">
                          <h3 id="traffic" class="card-title mb-0">Monthly Tweet: {{thismonth}}</h3>
                          <div class="small text-muted">
                            <!-- <p class="blue">{{time}}</p> -->
                          </div>
                        </b-col>

                        <b-col sm="12" class="d-none d-md-block"></b-col>

                        <BarChartSample
                          v-if="selectedBar"
                          :selectedBar="selectedBar"
                          class="Chartsize"
                          chartId="bar-chart-01"
                          height="400"
                          width="1200"
                        ></BarChartSample>
                      </b-row>
                    </b-card>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-col>
          <!-------------------------------------------- TIME SERIES END --------------------------------------------------------->

          <!------------------------------------------- INTERESTED TABLE -------------------------------------------------------->
          <b-col sm="6" lg="3">
            <div style=" max-height: 50rem;">
              <b-card bg-variant="poom" style="width: 100%; bg-primary text-white">
                <!-- <div v-if="loading" class="loading">Loading...</div> -->
                <table
                  class="table table-hover table-inverse"
                  responsive="sm"
                  hover
                  :items="tableItems"
                  :fields="tableFields"
                  style="max-width: 23rem; "
                >
                  <thead>
                    <tr>
                      <th>
                        <b style="color:orange;"><i style="color:orange;" class="fa fa-fire"></i> Interesting Trend</b>
                      </th>
                      <th></th>

                      <th>
                        <b style="color:orange;" class="myb">({{time}})</b>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr :key="trend.Trends" v-for="(trend) in interestTrends">
                      <td colspan="1">
                        <div>
                          <b-button
                            variant="link"
                            v-on:click="LoadTrend(trend.Trends, trend.DT); currentBreed=trend.Index "
                          >{{trend.Trends}}</b-button>
                        </div>

                        <div class="tablesmall text-muted">
                          <span>Trending Probability: {{trend.TrendingProb}}%</span>
                        </div>

                        <b-progress
                          v-if="trend.TrendingProb>=70"
                          style="height: 5px; width:150px;"
                          height="{}"
                          class="progress-xs mt-2"
                          :precision="1"
                          :value="trend.TrendingProb"
                          variant="success"
                        ></b-progress>

                        <b-progress
                          v-else-if="trend.TrendingProb<70 && trend.TrendingProb>50"
                          style="height: 5px; width:150px;"
                          height="{}"
                          class="progress-xs mt-2"
                          :precision="1"
                          :value="trend.TrendingProb"
                          variant="yellow"
                        ></b-progress>
                        <b-progress
                          v-else-if="trend.TrendingProb<=50"
                          style="height: 5px; width:150px;"
                          height="{}"
                          class="progress-xs mt-2"
                          :precision="1"
                          :value="trend.TrendingProb"
                          variant="danger"
                        ></b-progress>
                      </td>
                      <td colspan="6">
                        <div>
                          <p align="right" style="color:green;">
                            <b
                              v-if="trend.Operator == '+' "
                              style="color:green;"
                            >{{trend.Operator}}{{ trend.Change.toLocaleString() }}</b>
                            <b
                              v-else-if="trend.Operator == '-' "
                              style="color:red;"
                            >{{ trend.Change.toLocaleString() }}</b>
                          </p>

                          <p style="color:Orange;" align="right">Total: {{ trend.TweetVol.toLocaleString() }}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-card>
            </div>
          </b-col>
        </b-row>
        <!-- </b-container> -->
      </div>
    </div>
    <!--- Parent END --->
  </div>
  <!--- Anime Faide END --->
</template>


<script>
import CardLine1ChartExample from "./dashboard/CardLine1ChartExample";
import CardLine2ChartExample from "./dashboard/CardLine2ChartExample";
import CardLine3ChartExample from "./dashboard/CardLine3ChartExample";
import CardBarChartExample from "./dashboard/CardBarChartExample";
import MainChartExample from "./dashboard/MainChartExample";

import PoomChart from "./dashboard/PoomChart";
import Tracking from "./dashboard/Tracking";
import Sample from "./dashboard/Sample";

import SocialBoxChartExample from "./dashboard/SocialBoxChartExample";
import CalloutChartExample from "./dashboard/CalloutChartExample";
import { Callout } from "@coreui/vue";
import BarChartSample from "./charts/BarExample";
import PieExample from "./charts/PieExample";
import axios from "axios";

import Vue from "vue";
import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity
  }
});

export default {
  name: "Large",
  components: {
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    PoomChart,
    Tracking,
    SocialBoxChartExample,
    CalloutChartExample,
    BarChartSample,
    PieExample,
    Sample
  },

  data() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const d = new Date();

    return {
      tracktableKey: 0,

      thismonth: monthNames[d.getMonth()],

      currentBreed: 0,
      selectedTrend: [],
      selectedBar: [],
      selectedPie: [],
      topTrends: [],
      toptrackTrends: [],
      time: [],
      interestTrends: [],

      breeds: [
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values

        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values

        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" }, // Initially empty values
        { name: "", key: "" } // Initially empty values
      ],
      loading: true
    };
  },

  methods: {
    refreshtable() {
      this.tracktableKey += 1;
    },

    LoadTrend(trend, dt) {
      this.selectedTrend = { Trends: trend, DT: dt };
      this.selectedBar = { Trends: trend, DT: dt };
      this.selectedPie = { Trends: trend, DT: dt };
    },
    LoadTrackTrend(trend, dt) {
      this.selectedTrend = { Trends: trend, DT: dt };
      this.selectedBar = { Trends: trend, DT: dt };
      this.selectedPie = { Trends: trend, DT: dt };
      // this.selectedTrackTrend = { Trend: tracktrend, EndTime: trackdt };
    },
    async DeleteTrend(deleteid) {
      var url = new URL(
        "https://www.mustavi.com/TrendTrackerRemove/?param1=000"
      );
      var search_params = url.searchParams;

      // new value of param set to my topic
      search_params.set("param1", deleteid);

      url.search = search_params.toString();
      var new_url = url.toString();
      console.log(new_url);

      this.$confirm("Do you wany to remove this trend?").then(() => {
        axios.delete(new_url);
      });

      this.toptrackTrends = this.toptrackTrends.filter(x => x.ID !== deleteid);
    }
  },

  beforeCreate() {
    axios.get("https://www.mustavi.com/Trends/").then(res => {
      this.topTrends = res.data.data.slice(0, 6);

      this.topic0 = res.data.data[0].Trends;
      this.topic1 = res.data.data[1].Trends;
      this.topic2 = res.data.data[2].Trends;
      this.topic3 = res.data.data[3].Trends;
      this.topic4 = res.data.data[4].Trends;
      this.topic5 = res.data.data[5].Trends;

      this.breeds[0].name = this.breeds[0].key = this.topic0;
      this.breeds[1].name = this.breeds[1].key = this.topic1;
      this.breeds[2].name = this.breeds[2].key = this.topic2;
      this.breeds[3].name = this.breeds[3].key = this.topic3;
      this.breeds[4].name = this.breeds[4].key = this.topic4;
      this.breeds[5].name = this.breeds[5].key = this.topic5;

      this.time = res.data.data[0].DT;
    });

    axios.get("https://www.mustavi.com/interestingTrends/").then(res => {
      this.interestTrends = res.data.data.slice(0, 5);

      this.topic6 = res.data.data[0].Trends;
      this.topic7 = res.data.data[1].Trends;
      this.topic8 = res.data.data[2].Trends;
      this.topic9 = res.data.data[3].Trends;
      this.topic10 = res.data.data[4].Trends;

      this.breeds[6].name = this.breeds[6].key = this.topic6;
      this.breeds[7].name = this.breeds[7].key = this.topic7;
      this.breeds[8].name = this.breeds[8].key = this.topic8;
      this.breeds[9].name = this.breeds[9].key = this.topic9;
      this.breeds[10].name = this.breeds[10].key = this.topic10;
    });

    axios.get("https://www.mustavi.com/ActiveTracking/").then(res => {
      this.toptrackTrends = res.data.data.slice(0, 9);

      this.breeds[11].name = this.breeds[11].key = res.data.data[0].Trend;
      this.breeds[12].name = this.breeds[12].key = res.data.data[1].Trend;
      this.breeds[13].name = this.breeds[13].key = res.data.data[2].Trend;
      this.breeds[14].name = this.breeds[14].key = res.data.data[3].Trend;
      this.breeds[15].name = this.breeds[15].key = res.data.data[4].Trend;

      this.breeds[16].name = this.breeds[16].key = res.data.data[5].Trend;
      this.breeds[17].name = this.breeds[17].key = res.data.data[6].Trend;
      this.breeds[18].name = this.breeds[18].key = res.data.data[7].Trend;
      this.breeds[19].name = this.breeds[19].key = res.data.data[8].Trend;
      this.breeds[20].name = this.breeds[20].key = res.data.data[9].Trend;
    });
  },

  computed: {
    breedKey() {
      return this.breeds[this.currentBreed].key;
    }
  }
};
</script>

<style scoped>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}

.mytable {
  background-color: #303030;
  width: 425px;
}

.text-value-lg{
  font-size: 30px;
}

p {
  color: rgb(224, 224, 224);
}

h4 {
  color: rgb(232, 238, 243);
}

h2 {
  color: rgb(232, 238, 243);
}

h1 {
  text-align: center;
}

p.blue {
  color: rgb(184, 186, 199);
  font-size: 13px;
}

.topnav input[type="text"] {
  padding: 1px;
  border: whitesmoke;
  margin-top: 0px;
  margin-left: 15px;
  font-size: 13px;
}
span {
  font-size: 13px;
}

.topnav a {
  font-size: 22px;
}

td {
  color: rgb(255, 255, 255);
}

.tablesmall {
  margin-top: -10px;
}

b.myb {
  font-size: 12px;
  color: rgb(175, 175, 175);
}

p.tag {
  color: rgb(166, 223, 241);
}

.card {
  background-color: rgb(16, 146, 185);
  border-color: rgba(20, 30, 168, 0.212);
}
.cardgreen {
  background-color: rgba(10, 143, 32, 0.938);
  border-color: rgba(20, 30, 168, 0.212);
}
.cardgreen2 {
  background-color: rgba(20, 155, 72, 0.596);
  border-color: rgba(20, 30, 168, 0.212);
}
.cardyellow {
  background-color: rgba(206, 154, 13, 0.938);
  border-color: rgba(20, 30, 168, 0.212);
}
.cardyellow2 {
  background-color: rgba(151, 137, 5, 0.932);
  border-color: rgba(20, 30, 168, 0.212);
}
.cardred {
  background-color: rgba(182, 53, 53, 0.747);
  border-color: rgb(214, 215, 226);
}

.card-body-nobot {
  margin-bottom: -20px;
}

.card-header {
  background-color: rgba(20, 42, 114, 0.938);
}

.card-header {
  background-color: #26292e;
  border-color: #26292e;
}

.bg-mycarddark {
  background-color: #30353b;
  border-color: #30353b;
}

div.cardme {
  margin-left: auto;
  margin-right: auto;
}

i {
  color: aliceblue;
}

input {
  background-color: rgb(48, 44, 44);
  color: aliceblue;
}

.form-check-label {
  color: aliceblue;
}

button {
  background-color: Transparent;
  border: none;
  margin-bottom: 5px;
  margin-left: -12px;
}

.whitebutton {
  background-color: rgb(180, 134, 134);
  width: 35px;
  margin-top: 5px;
  margin-left: 90px;
}

.fa {
  size: 80px;
}



@media screen and (min-width: 1400px) {
  .container-fluid {
    width: 1450px;
  }
  .Chartsize {
    width: 980px;
  }
}
@media screen and (min-width: 1600px) {
  .container-fluid {
    width: 1600px;
  }
}
@media screen and (min-width: 1900px) {
  .container-fluid {
    width: 1820px;
  }
  .Chartsize {
    width: 1200px;
  }
}
/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 10px rgb(255, 255, 255);
  background: #aca4a4;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(112, 108, 108);
  border-radius: 10px;
}
</style>



