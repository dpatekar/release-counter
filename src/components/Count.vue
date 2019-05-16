<template>
  <h1>{{days}}d {{pad(hours,2)}}:{{pad(minutes,2)}}:{{pad(seconds,2)}}</h1>
</template>

<script>
export default {
  props: { releaseTime: { type: String, required: true } },
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  },  
  created() {
    this.release = new Date(this.releaseTime).getTime();
    setInterval(this.updateTime, 1000);
  },
  methods: {
    updateTime() {
      let now = new Date().getTime();
      let diff = (this.release - now) / 1000;
      
      if (diff >= 0) {
        let calc = diff;
        this.seconds = Math.floor(calc) % 60;
        
        calc /= 60;
        this.minutes = Math.floor(calc) % 60;
        calc /= 60;
        this.hours = Math.floor(calc) % 24;
        calc /= 24;
        this.days = Math.floor(calc);

        this.$emit('left', Math.floor(diff));
      }
    },
    pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
  },
  watch: {
    releaseTime: function(newVal){      
      this.release = new Date(newVal).getTime();
      this.updateTime();
    }
  }
};
</script>