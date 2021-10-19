<template>
  <div class="content-section">
    <div class="content-section-title">{{ psTitle }}</div>
    <div class="listMain">
      <div v-for="(item, index) in psData" :key="index" class="list">
        <div class="additional">
          <div class="user-card">
            <a :href="item.url" target="_blank" rel="noopener noreferrer"
              ><img class="siteIcon center" :src="item.img" :alt="item.title"
            /></a>
          </div>
          <div class="more-info">
            <div class="site-title">{{ item.title }}</div>
            <div class="site-url">
              <a :href="item.url" target="_blank" rel="noopener noreferrer">{{
                item.url
              }}</a>
            </div>
          </div>
        </div>
        <div class="general">
          <div class="site-title">{{ item.title }}</div>
          <div class="site-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentSectionCard",
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
.listMain {
  width: 100%;
  display: grid;
  margin-left: -10px;
  grid-template-columns: repeat(auto-fill, 100%);
  grid-gap: 0 0;
  justify-items: center;
}
.listMain .center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  /* IE 9 */
  -webkit-transform: translate(-50%, -50%);
  /* Safari and Chrome */
}
.listMain .list:first-child {
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}
.listMain .list:last-child {
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
}

.listMain .list {
  display: inline-grid;
  width: 95%;
  height: 50px;
  background-color: #ffffff22;
  overflow: hidden;
  position: relative;
  margin-bottom: 1px;
}
.listMain .list .additional {
  position: absolute;
  width: 50px;
  height: 100%;
  background: linear-gradient(#de685e, #ee786e);
  transition: width 0.4s;
  overflow: hidden;
  z-index: 2;
}
.listMain .list:hover .additional {
  width: 100%;
  /* border-radius: 0 5px 5px 0; */
}
.listMain .list .additional .user-card {
  width: 50px;
  height: 100%;
  position: relative;
  float: left;
}
.listMain .list .additional .user-card::after {
  content: "";
  display: block;
  position: absolute;
  top: 10%;
  right: -2px;
  height: 80%;
  border-left: 2px solid rgba(0, 0, 0, 0.025);
}
.listMain .list .additional .user-card img.siteIcon {
  top: 50%;
  width: 30px;
}
.listMain .list .additional .more-info {
  /* width: 67%; */
  float: left;
  position: absolute;
  top: 0;
  left: 50px;
  /* height: 100%; */
  padding: 5px;
}
.listMain .list .additional .more-info,
.listMain .list .general {
  font-size: 12px;
  line-height: 18px;
  height: 18px;
}
.listMain .list .additional .more-info .site-title,
.listMain .list .general .site-title {
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  height: 15px;
  margin-bottom: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.listMain .list .additional .more-info .site-url a,
.listMain .list .additional .more-info .goSite a {
  cursor: pointer;
  color: #fff;
}
.listMain .list .additional .more-info .site-url a:hover,
.listMain .list .additional .more-info .goSite a:hover {
  color: rgb(57, 132, 245);
}
.listMain .list .general {
  width: 90%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50px;
  z-index: 1;
  box-sizing: border-box;
  padding: 5px;
}
</style>
