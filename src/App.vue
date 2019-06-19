<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-sm fixed-top navbar-light nav-bg">
        <a
          class="navbar-brand offset-sm-1 mr-5 text-white font-weight-bold"
          href="https://www.say-huahuo.com"
        >花火学园</a>
        <button
          class="navbar-toggler"
          data-target="#navbarToggler"
          data-toggle="collapse"
          type="button"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarToggler">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                class="nav-link text-white"
                to="/index/zhvn"
                active-class="font-weight-bold"
              >汉化硬盘版</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link text-white"
                to="/index/olvn"
                active-class="font-weight-bold"
              >在线试玩</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link text-white"
                to="/index/comic"
                active-class="font-weight-bold"
              >漫画</router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link text-white mr-5"
                to="/index/video"
                active-class="font-weight-bold"
              >表番</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link text-white" @click.prevent="showlive2d">召唤nep</a>
            </li>
          </ul>
          <div class="form-inline form-row">
            <input class="form-control col mr-1" placeholder="请输入关键词" v-model="keyword">
            <button
              class="btn btn-outline-primary col-auto mr-sm-5 text-white"
              type="search"
              @click="search"
            >搜索</button>
          </div>
        </div>
      </nav>
    </header>
    <div class="container">
      <!--占位-->
      <div class="row invisible">
        <nav class="navbar navbar-expand-sm">
          <span class="navbar-brand">汉化硬盘版 galgame 资源 下载 论坛</span>
        </nav>
      </div>
      <hr>
      <router-view></router-view>
      <hr>
      <!--页脚-->
      <div class="row justify-content-center">
        <footer class="text-black-50">
          <span>© 2019 花火学园.Powered by WordPress. |</span>
          <span data-toggle="tooltip" title="请联系:3451432292@qq.com unmayx@qq.com">意见与建议</span> |
          <span data-toggle="tooltip" title="花火的微博（ID 姬野永远）">关注我们</span>
          <!--空行,避免一滑到底-->
          <div class="invisible">
            <hr>
            <hr>
            <hr>
            <hr>
            <hr>
          </div>
        </footer>
      </div>
    </div>
    <Live-td v-if="live2d" :class="{'invisible':live2dvisible}"></Live-td>
  </div>
</template>

<script>
import LiveTd from "./components/live-td.vue";
export default {
  name: "app",
  components: {
    LiveTd
  },
  data() {
    return {
      keyword: "",
      live2d: false,
      live2dvisible: true
    };
  },
  methods: {
    search() {
      this.$router.push(
        "/index/" + this.$route.params.type + "/" + this.keyword
      );
    },
    showlive2d() {
      this.live2d = true;
      this.live2dvisible = !this.live2dvisible;
      if (this.live2dvisible) event.target.innerText = "召唤nep";
      else event.target.innerText = "隐藏nep";
    }
  }
};
</script>
