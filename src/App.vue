<template>
  <div id="app" :style="{ backgroundImage: 'url(' + bgUrl + ')' }">
    <svg
      class="root-bg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMaxYMid slice"
    ></svg>
    <div class="app">
      <div class="header">
        <div class="menu-circle"></div>
        <!-- <div class="header-menu">
          <a class="menu-link is-active" href="#">Apps</a>
          <a class="menu-link notify" href="#">Your work</a>
          <a class="menu-link" href="#">Discover</a>
          <a class="menu-link notify" href="#">Market</a>
        </div> -->
        <!-- <div class="search-bar">
          <input type="text" placeholder="Search" />
        </div> -->
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
            <!-- <ContentWrapperAD /> -->
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
    <!-- <Footer :sitetotalnum="sitetotalnum" :updata_time="updata_time" /> -->
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
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    // LeftTreeView,
    LeftSideWrapper,
    ContentWrapperAD,
    ContentSectionList,
    ContentSectionCard,
    Footer,
  },
  data() {
    return {
      bgUrl: "",
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
    // this.getBingImg();
    // this.getsiteTypeList();
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
            total += item.list.length;
            if (item.list.length > 0) {
              item.label += `(${item.list.length})`;
              siteList.push(item);
            }
            getSites(item.children, siteList);
          });
        }

        getSites(res.data, this.siteList);

        // 总数量
        this.sitetotalnum = total;

        console.log("总共收录", this.sitetotalnum, "条宝藏网站");
      });
    },
    getBingImg() {
      var page = 1;
      var host = "https://www.bingimg.cn/";
      this.$axios.get(host + "dj_get_img_info?page=" + page).then((res) => {
        console.log(res);

        if (res) {
          //https://www.bingimg.cn/static/downimg/OHR.FanjingStairs_ZH-CN0360402048_1920x1080.jpg
          var url = host + "static/downimg/" + res["data_list"][0]["url"];
          this.bgUrl = url;
        }
      });

      //  $.ajax({
      //       type: "GET",
      //       url: "/dj_get_img_info?page=" + current_page,
      //       dataType: "json",
      //       success: function (res) {
      //           if (res.code == 0) {
      //               //console.log('get_img_info success current_page='+current_page)
      //               if (res.data_list && res.data_list.length > 0) {
      //                   img_info_list = res.data_list;
      //                   if (next_page) {
      //                       current_img_index = img_info_list.length - 1;
      //                   } else // pre page
      //                   {
      //                       current_img_index = 0;
      //                   }
      //                   bind_img_info();
      //               } else { // reset
      //                   if (next_page) {
      //                       current_img_index = 0;
      //                       current_page++;
      //                   } else {
      //                       current_img_index = img_info_list.length - 1;
      //                       current_img_index = current_img_index < 0 ? 0 : current_img_index;
      //                       current_page--;
      //                   }
      //               }
      //           } else {
      //               //console.log('error!')
      //           }
      //       }
      //   });
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

    wave(start, end, gradient) {
      const numSteps = random(4, 8, true);
      const step = 1 / numSteps;
      const randomRange = random(32, 64);

      const points = [];
      let pointPosition = 0;

      for (let i = 0; i <= numSteps; i++) {
        const step = map(i, 0, numSteps, 0, 1);

        let x = lerp(start.x, end.x, step);
        let y = lerp(start.y, end.y, step);

        if (i !== 0 && i !== numSteps) {
          x += random(-randomRange, randomRange);
          y += random(-randomRange, randomRange);
        }

        points.push({ x, y });
      }

      const pathData =
        spline(points, 1, false) +
        `L ${end.x} ${height} L ${start.x} ${height} Z`;

      const path = svg.path(pathData).attr("fill", gradient);
    },

    lerp(v0, v1, t) {
      return v0 * (1 - t) + v1 * t;
    },

    generate(svg, width, height) {
      const numWaves = 7;
      const base = this.$tinycolor(`hsl(${random(0, 360)}, 65%, 55%)`);
      const colors = base.analogous(6);

      svg
        .rect(width, height)
        .fill(random(colors).clone().darken(40).toString());

      for (let i = 0; i < numWaves; i++) {
        const randomOffset = random(-50, 50);
        const originY =
          map(i, 0, numWaves, -height / 2, height / 3) + randomOffset;
        const endY = map(i, 0, numWaves, 0, 1000) + randomOffset;

        const color = random(colors).clone();

        if (i < 3) {
          color.darken(50).desaturate(10);
        }

        const gradientOffset = map(i, 0, numWaves, 0.1, 1);

        let gradient = svg.gradient("linear", function (add) {
          add.stop(0, color.clone().lighten(30).toHexString());
          add.stop(gradientOffset, color.clone().spin(60).toHexString());
        });

        gradient.from(0.5, 0).to(0, 1);

        wave({ x: 0, y: originY }, { x: width, y: endY }, gradient);
      }
    },
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
    // const svg = this.$SVG(".root-bg");
    // const { width, height } = svg.viewbox();
    // this.generate(svg,width, height);
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.floorSrcollEventListener);
  },
};
</script>

<style scoped lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}
.root-bg {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
.app {
  width: 90vw;
  height: 90vh;
  margin: 20px auto;
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
