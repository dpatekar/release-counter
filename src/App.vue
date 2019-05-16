<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Countdown till</span> Next Marena's release
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout row wrap>
          <v-flex xs12 text-xs-center>
            <Count :releaseTime="releaseTime" @left="handleWarning"/>
            <h3>{{subheading}}</h3>            
          </v-flex>
          <v-flex id="imgFlex" xs12 text-xs-center v-bind:style="{ 'background-image': 'url(' + img + ')' }">            
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Count from "./components/Count";
import mqtt from "./services/mqtt";

export default {
  name: "App",
  components: {
    Count
  },
  data() {
    return {
      subheading: "",
      releaseTime: "",
      img: ""
      //2019-01-01T00:00:00.000+02:00
      //data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7
    };
  },
  mounted() {
    let self = this;
    mqtt.client.subscribe("subheading");
    mqtt.client.subscribe("releaseTime");
    mqtt.client.subscribe("image");
    mqtt.client.on("message", function(topic, payload) {
      switch (topic) {
        case "subheading":
          self.subheading = payload;
          break;
        case "releaseTime":
          self.releaseTime = payload;
          break;
        case "image":
          self.img = payload;
          break;
      }
    });
  },
  methods: {
    handleWarning(secondsLeft) {

    }
  }
};
</script>

<style>
h1 {
  font-size: 8rem;
}
h3 {
  font-size: 3rem;
  font-weight: 400;
}
#imgFlex{
  height: 65%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
 html{
      overflow-y: hidden;
    }
</style>