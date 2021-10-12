<template>
  <div id="app" class="app">
    <div class="header">
      <div class="menu-circle"></div>
      <div class="header-menu">
        <a class="menu-link is-active" href="#">Apps</a>
        <a class="menu-link notify" href="#">Your work</a>
        <a class="menu-link" href="#">Discover</a>
        <a class="menu-link notify" href="#">Market</a>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div class="header-profile">
        <img
          class="profile-img"
          src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt=""
        />
      </div>
    </div>
    <div class="wrapper">
      <div class="left-side">
        <LeftSideWrapper />
        <LeftSideWrapper />
        <LeftSideWrapper />
      </div>
      <div class="main-container">
        <div class="main-header">
          <a class="menu-link-main" href="#">All Apps</a>
          <div class="header-menu">
            <a class="main-header-link is-active" href="#">Desktop</a>
            <a class="main-header-link" href="#">Mobile</a>
            <a class="main-header-link" href="#">Web</a>
          </div>
        </div>
        <div class="content-wrapper">
          <ContentWrapperAD />
          <ContentSectionList />
          <ContentSectionCard />
        </div>
      </div>
    </div>
    <div class="overlay-app"></div>
  </div>
</template>

<script>
// import siteList from "@/components/siteList.vue";
// import Cute from "@/components/Cute.vue";
import Hello from "@/components/Hello.vue";
import LeftSideWrapper from "@/components/LeftSideWrapper.vue";
import ContentWrapperAD from "@/components/ContentWrapperAD.vue";
import ContentSectionList from "@/components/ContentSectionList.vue";
import ContentSectionCard from "@/components/ContentSectionCard.vue";
export default {
  name: "app",
  components: {
    // siteList,
    // Cute
    Hello,
    LeftSideWrapper,
    ContentWrapperAD,
    ContentSectionList,
    ContentSectionCard,
  },
  data() {
    return {
      keyword: "",
      siteList: [],
      toolList: [],
      ganhuoList: [],
      similarList: [],
      sitetotalnum: "",
      element: {
        nav_item: null,
        floor_item: null,
      },
      show_top: false,
      show_weixin: false,
      dialogFormVisible: false,
      ruleForm: {
        feedback_content: "",
      },
      rules: {
        feedback_content: [
          { required: true, message: "请填写反馈内容", trigger: "blur" },
        ],
      },
      rate: 5,
      formloading: false,
      timer: null,
      icon: {
        qq: "#icon-qq",
        weixin: "#icon-weixin",
      },
      updata_time: {
        year: "",
        month: "",
        day: "",
      },
      loading: null,
      searchTimer: null,
      qq: "1843544121",
    };
  },
  // created() {
  //   this.loading = this.$loading({ fullscreen: true });
  //   this.getsiteList();
  //   this.gettoolList();
  //   this.getGanHuo();
  //   this.getNow();
  //   // this.loading.close();
  // },
  methods: {
    // getsiteList() {
    //   this.$axios.get("./api/site.json").then(res => {
    //     this.siteList = res.data;
    //     // 获取站点总数量
    //     let total = 0;
    //     res.data.forEach((item, index) => {
    //       total += item.list.length;
    //     });
    //     // 总数量再加21
    //     this.sitetotalnum = total + 21;
    //   });
    // },
    // gettoolList() {
    //   this.$axios.get("./api/tools.json").then(res => {
    //     // console.log(res.data);
    //     this.toolList = res.data;
    //   });
    // },
    // // 获取干货资源
    // getGanHuo() {
    //   this.$axios.get("./api/zixun.json").then(res => {
    //     // 获取的列表为43条数据 ，这里随机取十条
    //     const oldlist = res.data.results.前端;
    //     let newlist = [];
    //     while (newlist.length < 10) {
    //       let x = Math.floor(Math.random() * 43);
    //       if (newlist.indexOf(oldlist[x]) == -1) {
    //         newlist.push(oldlist[x]);
    //       }
    //     }
    //     // console.log(newlist);
    //     this.ganhuoList = newlist;
    //   });
    // },
    // // 获取当前时间
    // getNow() {
    //   const date = new Date();
    //   this.updata_time.year = date.getFullYear().toString();
    //   this.updata_time.month = (date.getMonth() + 1)
    //     .toString()
    //     .padStart(2, "0");
    //   this.updata_time.day = (date.getDate() - 1).toString().padStart(2, "0");
    // },
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
    // feedback() {
    //   this.$refs.feedbackFormRef.validate(valid => {
    //     if (valid) {
    //       // 发送邮件请求
    //       this.formloading = true;
    //       this.$axios
    //         .get("https://mail.zhichi921.com/index.php/email", {
    //           params: {
    //             content: this.ruleForm.feedback_content,
    //             rata: this.rate
    //           }
    //         }) // 接收回调
    //         .then(res => {
    //           console.log(res);
    //           if (res.data.code == 1) {
    //             this.$message({
    //               message: res.data.msg,
    //               type: "success"
    //             });
    //             this.ruleForm.feedback_content = "";
    //             this.formloading = false;
    //             this.dialogFormVisible = false;
    //           } else {
    //             this.formloading = false;
    //             this.$message.error(res.data.msg);
    //           }
    //         });
    //     } else {
    //       return false;
    //     }
    //   });
    // },
    // // 收藏网站
    // addFavorite() {
    //   this.$message({
    //     message: "请使用Ctrl+D添加至浏览器收藏夹",
    //     center: true
    //   });
    // },
    // /**
    //  * 监听窗口滚动楼层导航动态定位
    //  */
    // floorSrcollEventListener() {
    //   const { nav_item, floor_item } = this.element;
    //   const window_scrollTop =
    //     document.documentElement.scrollTop || document.body.scrollTop;
    //   for (let i = 0, len = floor_item.length; i < len; i++) {
    //     let floor_offsetTop = floor_item[i].offsetTop - floor_item[0].offsetTop;
    //     if (window_scrollTop >= floor_offsetTop) {
    //       for (let n = 0, len = nav_item.length; n < len; n++) {
    //         const current_classList = nav_item[n].classList;
    //         i === n
    //           ? current_classList.add("active")
    //           : current_classList.remove("active");
    //       }
    //     }
    //   }
    // },
    // /**
    //  * 设置楼层导航事件驱动方法
    //  * @param {Number} index  楼层下标
    //  */
    // setFloorNavMountClick(index) {
    //   const { floor_item } = this.element;
    //   const floor_offsetTop =
    //       floor_item[index].offsetTop - floor_item[0].offsetTop + 96,
    //     window_scrollTop =
    //       document.documentElement.scrollTop || document.body.scrollTop,
    //     timer = {
    //       step: 60,
    //       times: 16,
    //       FLOOR_OFFSETTOP: floor_offsetTop
    //     };
    //   if (window_scrollTop > floor_offsetTop) {
    //     this.setFloorScrollArrowUp(timer);
    //   } else if (window_scrollTop == floor_offsetTop) {
    //     return false;
    //   } else {
    //     this.setFloorScrollArrowDown(timer);
    //   }
    // },
    // /**
    //  * 设置楼层向上滚动
    //  * @param {Object} timer 定时器配置
    //  */
    // setFloorScrollArrowUp(timer) {
    //   clearInterval(this.timer);
    //   this.timer = setInterval(() => {
    //     let window_scrollTop =
    //       document.documentElement.scrollTop || document.body.scrollTop;
    //     if (window_scrollTop <= timer.FLOOR_OFFSETTOP) {
    //       document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP;
    //       document.body.scrollTop = timer.FLOOR_OFFSETTOP;
    //       clearInterval(this.timer);
    //     } else {
    //       document.documentElement.scrollTop = window_scrollTop - timer.step;
    //       document.body.scrollTop = window_scrollTop - timer.step;
    //     }
    //   }, timer.times);
    // },
    // /**
    //  * 设置楼层向下滚动
    //  * @param {Object} timer 定时器配置
    //  */
    // setFloorScrollArrowDown(timer) {
    //   clearInterval(this.timer);
    //   this.timer = setInterval(() => {
    //     let window_scrollTop =
    //       document.documentElement.scrollTop || document.body.scrollTop;
    //     if (window_scrollTop >= timer.FLOOR_OFFSETTOP) {
    //       document.documentElement.scrollTop = timer.FLOOR_OFFSETTOP;
    //       document.body.scrollTop = timer.FLOOR_OFFSETTOP;
    //       clearInterval(this.timer);
    //     } else {
    //       document.documentElement.scrollTop = window_scrollTop + timer.step;
    //       document.body.scrollTop = window_scrollTop - timer.step;
    //     }
    //   }, timer.times);
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
// .top {
//   height: 96px;
//   background: #3295d9;
//   padding: 25px 0;
//   .search_box {
//     position: relative;
//     height: 42px;
//     input {
//       box-sizing: border-box;
//       width: 100%;
//       border: none;
//       font-size: 15px;
//       line-height: 20px;
//       height: 42px;
//       padding: 11px 100px 11px 26px;
//       border-radius: 3px;
//       color: #9f9f9f;
//       outline: none;
//     }
//     .search_btn {
//       height: 42px;
//       box-sizing: border-box;
//       width: 100px;
//       margin-left: -5px;
//       cursor: pointer;
//       text-align: center;
//       background-color: #69bdfb;
//       color: #fff;
//       font-size: 15px;
//       line-height: 42px;
//       border-top-right-radius: 3px;
//       border-bottom-right-radius: 3px;
//       position: absolute;
//       right: 0;
//       top: 0;
//       &:hover {
//         background-color: #51b1f5;
//       }
//     }
//     .search_list {
//       position: absolute;
//       width: 100%;
//       font-size: 14px;
//       background-color: #fff;
//       z-index: 1;
//       border-radius: 4px;
//       box-shadow: 0px -1px #f3f3f3;
//       & > div {
//         padding-left: 26px;
//         height: 36px;
//         line-height: 36px;
//         color: #666;
//         &:hover {
//           cursor: pointer;
//           background-color: #f3f3f3;
//           border-radius: 4px;
//         }
//       }
//     }
//   }
// }
// .top_tool {
//   margin-left: 10px;
//   a {
//     color: #dff2ff;
//     text-decoration: none;
//     font-size: 13px;
//     line-height: 42px;
//     margin: 0 6px;
//     &:hover {
//       color: #ffffff;
//     }
//   }
// }
// .sidebar {
//   position: sticky;
//   top: 32px;
//   left: 1.5%;
//   margin-top: 32px;
//   height: 480px;
//   border-radius: 10px;
//   background-color: #ffffff;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   text-align: center;
//   padding: 10px 0;
//   color: #444;
//   .nav {
//     cursor: pointer;
//     font-size: 15px;
//   }
// }
// .active {
//   color: #ff5a00;
// }
// .contact {
//   position: sticky;
//   top: 680px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 192px;
//   .item {
//     width: 46px;
//     height: 40px;
//     background-color: #e1e9ee;
//     margin-top: 8px;
//     line-height: 40px;
//     text-align: center;
//     color: #ffffff;
//     font-size: 13px;
//     border-radius: 4px;
//     transition: 0.3s;
//     cursor: pointer;
//     &:hover {
//       color: #ffa617;
//     }
//     .icon {
//       font-size: 20px;
//     }
//   }
//   .contact_item {
//     position: absolute;
//     bottom: 0;
//   }
//   #fankui {
//     background-color: #99aebc;
//     &:hover {
//       color: #222222;
//     }
//   }
//   #to_top {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     .icon {
//       width: 24px;
//       height: 24px;
//     }
//   }
// }
// .weixin_btn {
//   position: relative;
//   & > div {
//     position: absolute;
//     left: -190px;
//     top: -150px;
//     img {
//       width: 160px;
//       height: 284px;
//       border-radius: 10px;
//     }
//   }
// }
// .rate {
//   margin: 30px 0 10px;
// }
// .form-footer {
//   display: flex;
//   flex-direction: row-reverse;
//   margin-top: 20px;
// }
// .complex {
//   // padding:0 6.4% 0 10%;
//   margin-top: 50px;
//   padding-bottom: 40px;
//   background-color: #ffffff;
//   h2 {
//     text-align: center;
//     color: #1c95dc;
//     font-size: 20px;
//     margin: 56px auto 38px;
//   }
//   .tools {
//     display: flex;
//     justify-content: space-around;
//     flex-wrap: wrap;
//     a {
//       display: block;
//       width: 30%;
//       // width: 100px;
//       height: 100px;
//       line-height: 100px;
//       margin-top: 10px;
//       text-align: center;
//       font-size: 36px;
//       border-radius: 4px;
//       background-color: #f3f8fb;
//       color: #1c95dc;
//       &:hover {
//         background-color: #529cdb;
//         color: #fff;
//       }
//       span {
//         display: none;
//       }
//     }

//     & > a:nth-child(-n + 3) {
//       margin-top: 0;
//     }
//   }
//   .ganhuolist {
//     padding: 0 6%;
//     div {
//       display: flex;
//       align-items: center;
//       margin-bottom: 12px;
//       &:hover {
//         a {
//           color: #1c95dc;
//         }
//         span {
//           background-color: #1c95dc;
//         }
//       }
//     }
//     a {
//       color: #a0a0a0;
//       font-size: 14px;
//       display: inline-block;
//       width: 100%;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//     }
//     span {
//       display: inline-block;
//       height: 16px;
//       width: 16px;
//       text-align: center;
//       line-height: 16px;
//       border-radius: 16px;
//       font-size: 12px;
//       color: #ffffff;
//       background-color: #a0a0a0;
//       margin-right: 4px;
//       cursor: pointer;
//     }
//     div:nth-child(-n + 3) {
//       span {
//         background-color: #1c95dc;
//       }
//     }
//   }
//   .wechat {
//     text-align: center;
//     img {
//       width: 192px;
//       border-radius: 6px;
//       box-shadow: 0 0 18px rgba(50, 149, 217, 0.2);
//       border: 1px solid #e2eef7;
//       margin-bottom: 36px;
//     }
//     p {
//       color: #a1a1a1;
//       font-size: 13px;
//       span {
//         color: #1c95dc;
//       }
//     }
//   }
//   .count {
//     color: #1c95dc;
//     margin-top: 10px;
//     text-align: center;
//     strong {
//       font-size: 66px;
//       font-family: "BebasNeue";
//       letter-spacing: 4px;
//       // font-weight: 900;
//       span {
//         font-size: 14px;
//       }
//     }
//     .updata_time {
//       i {
//         margin-right: 2px;
//       }
//       color: #a1a1a1;
//       font-size: 14px;
//       margin-bottom: 70px;
//     }
//     .recommend {
//       color: #1c95dc;
//       font-size: 14px;
//       margin-bottom: 32px;
//       button {
//         padding: 10px 12px;
//         margin-left: 6px;
//       }
//     }
//     .auther {
//       padding-left: 16%;
//       text-align: left;
//       font-size: 14px;
//       p {
//         margin-bottom: 4px;
//         a {
//           color: #c7c7c7;
//           &:hover {
//             color: #1c95dc;
//           }
//         }
//       }
//     }
//   }
// }
// .footer {
//   background-color: #3295d9;
//   text-align: center;
//   padding: 28px 0 20px;
//   font-size: 12px;
//   line-height: 18px;
//   color: #dff2ff;
//   width: 100%;
//   .copyright {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     a {
//       margin: 0 4px;
//       color: #dff2ff;
//       // line-height: 24px;
//     }
//   }
//   p {
//     margin-bottom: 8px;
//     span {
//       margin: 0 6px;
//       cursor: pointer;
//     }
//   }
// }
</style>
