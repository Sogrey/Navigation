<template>
  <div class="content-section">
    <div class="content-section-title">
      <a :name="psTitle">{{ psTitle }}</a>
    </div>
    <div class="cardMain">
      <div v-for="(item, index) in psData" :key="index" class="card">
        <div class="additional">
          <div class="user-card">
            <a :href="item.url" target="_blank" rel="noopener noreferrer"
              ><img class="siteIcon center" :src="item.img" :alt="item.title"
            /></a>
          </div>
          <div class="more-info">
            <div class="site-title text-flow-ellipsis-single">
              {{ item.title }}
            </div>
            <div class="site-url">
              <a :href="item.url" target="_blank" rel="noopener noreferrer">{{
                item.url
              }}</a>
            </div>
            <div class="goSite">
              <a :href="item.url" target="_blank" rel="noopener noreferrer"
                >点击预览</a
              >
            </div>
          </div>
        </div>
        <div class="general">
          <div class="site-title text-flow-ellipsis-single">
            {{ item.title }}
          </div>
          <div class="site-desc text-flow-ellipsis-multiple">
            {{ item.desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentSectionCard",
  components: {},
  data() {
    return {};
  },
  props: {
    psTitle: String,
    psData: Array,
  }, //接手psData值
  methods: {},
};
</script>


<style>
.cardMain {
  width: 100%;
  display: grid;
  margin-left: -10px;
  grid-template-columns: repeat(auto-fill, 33%);
  grid-gap: 16px 0.5%;
  justify-items: center;
}
@media screen and (max-width: 860px) {
  .cardMain {
    grid-template-columns: repeat(auto-fill, 49%);
  }
}
@media screen and (max-width: 700px) {
  .cardMain {
    grid-template-columns: repeat(auto-fill, 100%);
  }
}
.cardMain .center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  /* IE 9 */
  -webkit-transform: translate(-50%, -50%);
  /* Safari and Chrome */
}
.cardMain .card {
  display: inline-grid;
  width: 95%;
  height: 100px;
  background-color: #ffffff22;
  /* background: linear-gradient(#f8f8f8, #fff); */
  box-shadow: 0 8px 16px -8px rgba(0, 0, 0, 0.4);
  border-radius: 14px;
  overflow: hidden;
  position: relative;
}
.cardMain .card .additional {
  position: absolute;
  width: 70px;
  height: 100%;
  background: linear-gradient(#f08d84, #f7938a);
  transition: width 0.4s;
  overflow: hidden;
  z-index: 2;
}
.cardMain .card:hover .additional {
  width: 100%;
  border-radius: 0 5px 5px 0;
}
.cardMain .card .additional .user-card {
  width: 70px;
  height: 100%;
  position: relative;
  float: left;
}
.cardMain .card .additional .user-card::after {
  content: "";
  display: block;
  position: absolute;
  top: 10%;
  right: -2px;
  height: 80%;
  border-left: 2px solid rgba(0, 0, 0, 0.025);
}
.cardMain .card .additional .user-card img.siteIcon {
  top: 50%;
  width: 50px;
}
.cardMain .card .additional .more-info {
  width: 67%;
  float: left;
  position: absolute;
  top: 0;
  left: 70px;
  height: 100%;
  padding: 5px;
}
.cardMain .card .additional .more-info,
.cardMain .card .general {
  font-size: 12px;
  line-height: 18px;
  height: 18px;
}
.cardMain .card .additional .more-info .site-title,
.cardMain .card .general .site-title {
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  line-height: 25px;
  height: 25px;
  margin-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.cardMain .card .additional .more-info .site-url a,
.cardMain .card .additional .more-info .goSite a {
  cursor: pointer;
  color: #fff;
}
.cardMain .card .additional .more-info .site-url a:hover,
.cardMain .card .additional .more-info .goSite a:hover {
  color: rgb(57, 132, 245);
}
.cardMain .card .additional .more-info .goSite {
  color: rgb(80, 79, 79);
  font-weight: bold;
}
.cardMain .card .general {
  width: 67%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 70px;
  z-index: 1;
  box-sizing: border-box;
  padding: 5px;
}
</style>
