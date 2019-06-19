<template>
  <article>
    <div class="row">
      <div class="col-sm-6 col-xl-4 mb-3" v-for="item in pagelist" :key="item.title">
        <!--大设备卡片-->
        <div class="card rounded shadow position-relative d-none d-sm-block">
          <div class="card-header p-1">
            <div class="row justify-content-center">
              <h1
                class="p-1 rounded m-1 font-weight-bold"
                :class="getclass(item)"
                data-toggle="tooltip"
                :title="item.date"
              >{{item.title}}</h1>
            </div>
          </div>
          <div class="shadow border rounded-sm border-dark m-2">
            <div class="embed-responsive embed-responsive-1by1">
              <a :href="item.url">
                <img class="embed-responsive-item" :src="item.img">
              </a>
            </div>
          </div>
        </div>
        <!--小设备卡片-->
        <div class="card rounded position-relative d-block d-sm-none">
          <div class="card-header p-1">
            <div class="row justify-content-center">
              <h1 class="p-1 rounded m-1" :class="getclass(item)">{{item.title}}</h1>
            </div>
            <div class="row justify-content-center">
              <p class="mb-0" style="font-size: 0.5rem">{{item.date}}</p>
            </div>
          </div>
          <div class="border rounded-sm border-dark m-2">
            <div class="embed-responsive embed-responsive-1by1">
              <a :href="item.url">
                <img class="embed-responsive-item" :src="item.img">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--页码-->
    <div class="row justify-content-end">
      <ul class="pagination">
        <li v-if="page>4" class="page-item" :class="{'active':act(item)}">
          <a class="page-link" @click="changePage">1</a>
        </li>
        <span v-if="page>5" class="page-item">
          <a class="page-link" href="#">...</a>
        </span>
        <li v-for="item in index" class="page-item" :class="{'active':act(item)}" :key="item.title">
          <a class="page-link" @click="changePage">{{item}}</a>
        </li>
        <span class="page-item">
          <a class="page-link" href="#">...</a>
        </span>
        <li class="page-item" :class="{'active':act(item)}">
          <a class="page-link" @click="changePage">{{totalpage}}</a>
        </li>
      </ul>
    </div>
  </article>
</template>
<script>
export default {
  name: "index",
  props: ["type", "search"],
  data() {
    return {
      pagesize: 6,
      totalpage: 1,
      page: 1,
      vnlist: [],
      items: [],
      startpage: 1,
      item: "",
      showtype: "zhvn",
      typelist: {
        zhvn: "vn.json",
        olvn: "olgal.json",
        video: "video.json",
        comic: "comic.json"
      },
      textbg: [
        "bg-primary",
        "bg-secondary",
        "bg-success",
        "bg-danger",
        "bg-warning",
        "bg-info"
      ]
    };
  },
  beforeRouteEnter(from, to, next) {
    next(vm => {
      vm.fixtype(vm, vm.type);
      vm.getlist(vm.showtype);
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.fixtype(this, to.params.type);
    this.searchvn(to.params.search);
  },
  watch: {
    showtype() {
      this.getlist(this.showtype);
    }
  },
  computed: {
    pagelist() {
      return this.items.slice(
        this.pagesize * (this.startpage - 1),
        this.pagesize * this.page
      );
    },
    index() {
      let a = [];
      for (
        let i = Math.max(this.page - 3, 1);
        i < Math.min(Number(this.page) + Number(5), this.totalpage);
        i++
      )
        a.push(i);
      return a;
    }
  },
  updated() {
    // eslint-disable-next-line
    $('[data-toggle="tooltip"]').tooltip();
    setTimeout(() => {
      window.removeEventListener("scroll", this.scrollpage);
      window.addEventListener("scroll", this.scrollpage);
    }, 500);
  },
  methods: {
    changePage(event) {
      this.page = event.target.innerText;
      this.startpage = this.page;
    },
    act(i) {
      return this.page == i;
    },
    scrollpage() {
      if (
        document.body.offsetHeight <
        window.pageYOffset + document.documentElement.clientHeight + 70
      ) {
        window.removeEventListener("scroll", this.scrollpage);
        this.page = Math.min(Number(this.page) + 1, this.totalpage);
      }
    },
    getlist(type) {
      fetch(this.typelist[type])
        .then(res => res.json())
        .then(data => {
          this.vnlist = data;
          this.items = this.vnlist.sort(function(a, b) {
            return Number(b.date) - Number(a.date);
          });
          this.totalpage = Math.ceil(this.vnlist.length / this.pagesize);
          this.searchvn(this.search);
        });
    },
    searchvn(search) {
      if (search) {
        this.items = this.vnlist.filter(x => {
          return x.title.indexOf(search) != -1;
        });
        this.page = 1;
      }
    },
    fixtype(vm, type) {
      if ((type == undefined) & (vm.showtype != "scvn")) vm.showtype = "zhvn";

      if (
        (type != undefined) &
        (vm.typelist[type] != undefined) &
        (type != vm.showtype)
      )
        vm.showtype = type;
    },
    getclass(item) {
      return this.textbg[this.pagelist.indexOf(item) % 6];
    }
  }
};
</script>