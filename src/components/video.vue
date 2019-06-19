<template>
<div class="embed-responsive embed-responsive-16by9 offset-sm-2 col-sm-8 border border-dark">
<video
    id="my-player"
    class="video-js embed-responsive-item"
    controls
    preload="auto"
    :poster="'/video/'+id+'.jpg'"
    data-setup='{}'>
  <source :src="'/video/'+id+'.mp4'" type="video/mp4" />
  <p class="vjs-no-js">
    抱歉，该视频无法在您的浏览器中播放。可能是因为禁用了JavaScript。
  </p>
</video>
</div>
</template>

<script>
export default {
    name: "Video",
    props:['id'],
    created(){
    let head=document.getElementsByTagName("head")[0];
      let s=document.createElement("script");
      s.src="https://unpkg.com/video.js/dist/video.min.js";
      head.appendChild(s);
      s=document.createElement("link");
      s.href="https://unpkg.com/video.js/dist/video-js.min.css";
      s.rel="stylesheet";
      head.appendChild(s);
  }    
}
</script>
