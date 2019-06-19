<template>
  <div
    class="offset-sm-2 col-sm-8 border border-dark"
    @click.left.prevent="nextpage"
    @click.right.prevent="previouspage"
  >
  <link rel="prefetch" :href="'/comic/'+id+'/'+list[page]">
    <img v-for="item in items" class="img-fluid" :src="'/comic/'+id+'/'+item" :key="item">
  </div>
</template>

<script>
export default {
  name: "comic",
  props: ["id"],
  data() {
    return {
      list: [],
      page: 0,
      items: [],
      item: ""
    };
  },
  created() {
    fetch("/comic/" + this.id + "/comic.json")
      .then(res => res.json())
      .then(data => {
        this.list = data;
        this.nextpage();
      });
  },
  updated() {
    setTimeout(() => {
      window.removeEventListener("scroll", this.scrollpage);
      window.addEventListener("scroll", this.scrollpage);
    }, 500);
  },
  methods: {
    nextpage() {
      if (this.page > this.list.length - 1) {
        alert("本章结束，感谢支持！");
        this.page = 0;
      }
      this.items = [this.list[this.page]];
      this.page++;
    },
    previouspage() {
      if (this.page > 1) {
        this.page--;
        this.items = [this.list[this.page - 1]];
      }
    },
    scrollpage() {
      if (
        document.body.offsetHeight <
        window.pageYOffset + document.documentElement.clientHeight + 70
      ) {
        window.removeEventListener("scroll", this.scrollpage);
        if (this.page < this.list.length) {
          this.items.push(this.list[this.page]);
          this.page++;
        }
      }
    }
  }
};
</script>
