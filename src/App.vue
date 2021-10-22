<template>
  <div id="app">
    <div class="app">
      <div class="header">
        <div class="menu-circle"></div>
        <!-- <div class="header-menu">
          <a class="menu-link is-active" href="#">Apps</a>
          <a class="menu-link notify" href="#">Your work</a>
          <a class="menu-link" href="#">Discover</a>
          <a class="menu-link notify" href="#">Market</a>
        </div> -->
        <div class="search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div class="header-profile">
          <img class="profile-img" src="@/assets/img/Sogrey.png" alt="" />
        </div>
      </div>
      <div class="wrapper">
        <div class="left-side">
          <LeftSideWrapper :psTitle="siteTitleTypes" :psData="siteTitleList" />
          <!-- <LeftTreeView /> -->
        </div>
        <div class="main-container">
          <div class="main-header">
            <a class="menu-link-main" href="#">All</a>
            <!-- <div class="header-menu">
              <a class="main-header-link is-active" href="#">Desktop</a>
              <a class="main-header-link" href="#">Mobile</a>
              <a class="main-header-link" href="#">Web</a>
            </div> -->
            <div class="btn-group-listOrGrid">
              <button
                v-on:click="isGridShow = true"
                :class="{ active: isGridShow }"
                class="btn lf"
              >
                <i class="fa fa-lg fa-th"></i>
              </button>
              <button
                v-on:click="isGridShow = false"
                :class="{ active: !isGridShow }"
                class="btn lf"
              >
                <i class="fa fa-lg fa-th-list"></i>
              </button>
            </div>
          </div>
          <div class="content-wrapper">
            <ContentWrapperAD />
            <div v-if="isGridShow">
              <ContentSectionCard
                v-for="(item, index) in siteList"
                :key="index"
                :psTitle="item.label"
                :psData="item.list"
              />
            </div>
            <div v-else>
              <ContentSectionList
                v-for="(item, index) in siteList"
                :key="index"
                :psTitle="item.label"
                :psData="item.list"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="overlay-app"></div>
    </div>

    <div class="dark-light">
      <svg
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </div>
  </div>
</template>

<script>
// import LeftTreeView from "@/components/LeftTreeView.vue";
import LeftSideWrapper from "@/components/LeftSideWrapper.vue";
import ContentWrapperAD from "@/components/ContentWrapperAD.vue";
import ContentSectionList from "@/components/ContentSectionList.vue";
import ContentSectionCard from "@/components/ContentSectionCard.vue";
export default {
  name: "App",
  components: {
    // LeftTreeView,
    LeftSideWrapper,
    ContentWrapperAD,
    ContentSectionList,
    ContentSectionCard,
  },
  data() {
    return {
      keyword: "",
      siteList: [],
      siteTitleTypes: "网站分类",
      siteTitleList: [],
      isGridShow: true,
      sitetotalnum: 0, // 收录网站总数
      updata_time: { year: "2021", month: "10", day: "01" }, //当前时间
    };
  },
  created() {
    //   this.loading = this.$loading({ fullscreen: true });
    this.getNow();
    this.getsiteList();
    this.getsiteTypeList();
    //   this.gettoolList();
    //   this.getGanHuo();
    //   // this.loading.close();
  },
  methods: {
    getsiteTypeList() {
      this.$axios.get("./datas/categories.json").then((res) => {
        if (res.status == 200) {
          // 请求成功
          // console.log(res);
        }
      });
    },
    getsiteList() {
      this.$axios.get("./datas/db.json").then((res) => {
        if (res.status == 200) {
          // 请求成功
          // console.log(res);
          this.siteTitleList = res.data;
        }

        // 获取站点总数量
        let total = 0;

        function getSites(array, siteList) {
          array.forEach((item, index) => {
            // if (item.list.length > 0) {
            total += item.list.length;
            if (item.list.length > 0) siteList.push(item);
            getSites(item.children, siteList);
            // }
          });
        }

        getSites(res.data, this.siteList);

        // 总数量
        this.sitetotalnum = total;

        console.log("总共收录", this.sitetotalnum, "条宝藏网站");
      });
    },
    // 获取当前时间
    getNow() {
      const date = new Date();
      this.updata_time.year = date.getFullYear().toString();
      this.updata_time.month = (date.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      this.updata_time.day = (date.getDate() - 1).toString().padStart(2, "0");
    },
    // search(keyword) {
    //   window.open(
    //     "https://www.baidu.com/s?wd=" + keyword + "&submit=",
    //     "_blank"
    //   );
    // },
    // getSimilarList() {
    //   // 搜索防抖
    //   clearTimeout(this.searchTimer);
    //   this.searchTimer = setTimeout(async () => {
    //     const { data: res } = await this.$axios.get(
    //       "https://bird.ioliu.cn/v2?url=https://www.baidu.com/sugrec",
    //       {
    //         params: {
    //           prod: "pc",
    //           wd: this.keyword
    //         }
    //       }
    //     );
    //     this.similarList = res.g;
    //   }, 200);
    // },
    // goToQQ() {
    //   window.open(
    //     "http://wpa.qq.com/msgrd?v=3&uin=" + this.qq + "&site=qq&menu=yes",
    //     "_blank"
    //   );
    // },
    // // 收藏网站
    // addFavorite() {
    //   this.$message({
    //     message: "请使用Ctrl+D添加至浏览器收藏夹",
    //     center: true
    //   });
    // },
    // // 显示返回顶部按钮
    // handleScroll() {
    //   let scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   if (scrollTop >= 120) {
    //     this.show_top = true;
    //   } else if (scrollTop < 120) {
    //     this.show_top = false;
    //   }
    // },
    // // 返回顶部
    // toTop() {
    //   let top = document.documentElement.scrollTop || document.body.scrollTop;
    //   // 实现滚动效果
    //   const timeTop = setInterval(() => {
    //     document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
    //     if (top <= 0) {
    //       clearInterval(timeTop);
    //     }
    //   }, 10);
    // }
  },
  mounted() {
    // // 获取楼层及导航元素
    // setTimeout(() => {
    //   this.element = {
    //     nav_item: document.getElementsByClassName("nav"),
    //     floor_item: document.getElementsByClassName("floor-item")
    //   };
    //   this.element.nav_item[0].classList.add("active");
    //   window.addEventListener("scroll", this.floorSrcollEventListener);
    // }, 200);
    // // 添加监听屏幕滚动事件
    // window.addEventListener("scroll", this.handleScroll);
    // // 添加百度统计
    // let _hmt = _hmt || [];
    // (function() {
    //   let hm = document.createElement("script");
    //   hm.src = "https://hm.baidu.com/hm.js?2c7e795a8d8c2015f0fb588d80cb73c4";
    //   let s = document.getElementsByTagName("script")[0];
    //   s.parentNode.insertBefore(hm, s);
    // })();
    // this.loading.close();
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.floorSrcollEventListener);
  },
};
</script>

<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.lf {
  float: left;
}
.btn {
  width: 60px;
  height: 40px;
  color: #ffffff;
  border-radius: 40px;
  cursor: pointer;
  border: none;
}
.btn-group-listOrGrid {
  position: absolute;
  right: 50px;
}
.btn-group-listOrGrid > button {
  color: #333333;
  border-color: #cccccc;
}
.btn-group-listOrGrid > button:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.btn-group-listOrGrid > button:first-child:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 1px solid #ddd;
}
.btn-group-listOrGrid > button:last-child:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 1px solid #ddd;
}
.btn-group-listOrGrid > button.active {
  color: #fff;
  background: #87cf7b;
}
</style>
