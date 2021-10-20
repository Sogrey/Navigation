<template>
  <div class="side-wrapper">
    <div class="side-title">{{ psTitle }}</div>
    <div class="side-menu">
      <ul>
        <li v-for="(item, index) in psData" :key="index">
          <a :href="'#' + item">
            <i class="fa fa-folder fa-lg" aria-hidden="true"></i>
            &nbsp; {{ item }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftSideWrapper",
  data() {
    return {};
  },
  props: {
    psTitle: String,
    psData: Array,
  }, //接手psData值
  methods: {
    // generateIconCode(symbol) {
    //   return `<svg-icon icon-class="${symbol}" />`
    // },
    // generateElementIconCode(symbol) {
    //   return `<i class="el-icon-${symbol}" />`
    // }
    initData() {
      this.axios.get("./static/datas/search.json").then((response) => {
        console.log(response);

        this.LeftSideWrapperList = [];

        for (var index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          this.LeftSideWrapperList.push(element.name);
        }
      });
      // this.$http.get('static/datas/search.json').then((response) => {
      //   console.log(response);
      // });
    },
  },
};
</script>