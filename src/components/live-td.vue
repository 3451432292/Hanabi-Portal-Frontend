<template>
  <div class="fixed-bottom d-flex justify-content-end">
    <canvas id="live2d" width="300" height="300"></canvas>
  </div>
</template>

<script>
export default {
  name: "LiveTd",
  created(){
    let head=document.getElementsByTagName("head")[0];
      let s=document.createElement("script");
      s.src="/js/live2d.js";
      head.appendChild(s);
  }
};
</script>
