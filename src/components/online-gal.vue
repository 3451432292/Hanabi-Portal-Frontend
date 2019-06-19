<template>
  <div class="embed-responsive embed-responsive-4by3 offset-sm-2 col-sm-8 border border-dark" @click.prevent="nextpage">
    <audio :src="bgm" loop ref="bgm" type="audio/ogg"></audio>
    <audio :src="sound" ref="sound" type="audio/ogg"></audio>
    <div
      class="embed-responsive-item"
      style="background-size: 100%"
      :style="{backgroundImage: back}"
    ></div>
    <!-- 0:左1:中央2:右3:全体 -->
    <img class="embed-responsive-item" style="left:-25%" :src="left" :class="{invisible:!(left)}">
    <img class="embed-responsive-item" :src="center" :class="{invisible:!(center)}">
    <img class="embed-responsive-item" style="left: 25%" :src="right" :class="{invisible:!(right)}">

    <div
      class="embed-responsive-item card"
      style="top: 70%;height: 30%;background-color:rgba(230, 238, 232, 0.7)"
    >
      <div class="card-body">
        <p :class="{invisible:!(name)}">[{{name}}]</p>
        <p>{{p}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OnlineGal",
  props:['id'],
  data() {
    return {
      gal: [],
      bgm:"",
      sound:"",
      back:"",
      left:"",
      center:"",
      right:"",
      name:"",
      p:"",
      i:0
    };
  },
  created() {
    fetch("/gal/"+this.id+"/gal.json")
      .then(res => res.json())
      .then(data => {
        this.gal = data;
        this.nextpage();
      });
  },
  methods:{
      nextpage(){
        if(this.i>this.gal.length-1){
          alert("试玩结束，感谢支持！");
          this.i=0;
        }
          this.p=this.gal[this.i].p;
          if(this.gal[this.i].name)this.name=this.gal[this.i].name;else this.name=null;
          if(this.gal[this.i].bgm==""){
              this.bgm=null
          }else if(this.gal[this.i].bgm)this.bgm="/gal/"+this.id+"/bgm/"+this.gal[this.i].bgm+".ogg";
          if(this.gal[Number(this.i)+1].sound){
            this.sound="/gal/"+this.id+"/sound/"+this.gal[Number(this.i)+1].sound+".ogg";
          }
          if(this.gal[this.i].back)this.back="url(/gal/"+this.id+"/image/"+this.gal[this.i].back+".webp)";
          if(this.gal[this.i].out){
            if(this.gal[this.i].out=="3")[this.left,this.center,this.right]=[null,null,null]
            else [this.left,this.center,this.right][this.gal[this.i].out]=null
          }
          if(this.gal[this.i].char){
            if(this.gal[this.i].char[0]!="")this.left="/gal/"+this.id+"/image/"+this.gal[this.i].char[0]+".webp";
            if(this.gal[this.i].char[1]!="")this.center="/gal/"+this.id+"/image/"+this.gal[this.i].char[1]+".webp";
            if(this.gal[this.i].char[2]!="")this.right="/gal/"+this.id+"/image/"+this.gal[this.i].char[2]+".webp";
          }

          if(this.gal[this.i].sound){
            this.$refs.sound.play();
          }

          this.$refs.bgm.play();
          this.i++;
      }
  }
};
</script>
