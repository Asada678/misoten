<script>
import { Line } from "vue-chartjs";
// import zoom from "chartjs-plugin-zoom";
export default {
  components: {},
  extends: Line,
  props: ["chartdata", "options", "plugins"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {
    // console.log("zoom:", zoom);
    // this.addPlugin(zoom);
    this.renderChart(this.chartdata, this.options);
  },
  watch: {
    chartdata() {
      console.log('this.chartdata:', this.chartdata);
      this.$data._chart.update();
    this.renderChart(this.chartdata, this.options);
    }
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1200px) {
}
</style>