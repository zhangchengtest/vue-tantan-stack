<template>
  <div>
  
   
      <stack ref="stack" :key="hi" :pages="someList" :stackinit="stackinit" :title="title"></stack>
    
    <div class="controls" style="margin-top:90px;">
      <button @click="prev" class="button"><i class="prev"></i><span class="text-hidden">prev</span></button>

      <button @click="next" class="button"><i class="next"></i><span class="text-hidden">next</span></button>

     
    </div>

     <div class="controls" style="margin-top:5px;">
      
      <input
          type="range"
          v-model="progressModel"
          min="1"
          :max="totalSize"
          @mouseup.stop.capture.prevent="touchend"
        />
    </div>

  </div>
</template>
<script>
import Vue from 'vue'
import VueProgress from 'vue-progress-path'
Vue.use(VueProgress)
import stack from '../components/stack'
export default {
  el: '#stack',
  data () {
    return {
      title:"hello world",
      total: 50,
      hi: "0",
      currentNo: 1,
      progress: 0,
      totalSize: 50,
      currentPage: 1,
      someList: [],
      stackinit: {
        visible: 3
      }
    }
  },
  mounted () {
    
    
     this.handleSubmit()
  },
  components: {
    stack
  },
  computed: {
    progressModel: {
      get () {
        
        return this.progress * 100
      },
      set (value) {
        this.progress = value / 100
      },
    },

    
    
  },
  methods: {
  touchend(){
      this.currentPage = Math.round(this.progress * 100);
       this.handleSubmit();
      console.log(`${Math.round(this.progress * 100)}`);
  },
    handleSubmit(){
     
     let formCustom = {
        hehe: 'heh'
      }
      this.$http.post( 'http://api.zhangdeshui.cn/chapter/search/1038/' + this.currentPage, this.formCustom, {
                          'content-type': 'application/json'
                        }).then((res) => {
        
          console.log(res.body);
          let that = this
          that.someList = res.body.data
          that.total = res.body.size
          this.totalSize = res.body.totalSize
          that.title = this.currentPage + ' - '+ res.body.title
         this.$refs.stack.currentNo = 1;
      }, (response) => {
           
      });
  
    },
    prev () {
      //this.$refs.stack.$emit('prev')
      console.log(this.currentPage +"-" + (parseInt(this.totalSize)-2));

      if(this.currentPage < parseInt(this.totalSize)){
          this.currentPage = this.currentPage + 1;
      }
      this.handleSubmit();
    },
    next () {
      this.$refs.stack.$emit('next')
      console.log(this.$refs.stack.currentNo)
      this.currentNo = this.$refs.stack.currentNo;
    }
  }
}
</script>
<style>
  .stack-wrapper{
    margin: 0 auto;
    position: relative;
    z-index: 1000;
    width: 320px;
    height: 320px;
    padding: 0;
    list-style: none;
    pointer-events: none;
  }
  .controls{
    position: relative;
    width: 200px;
    text-align: center;
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    justify-content:space-around;
    margin: 0 auto;
    margin-top: 50px
  }
  .controls .button {
    border: none;
    background: none;
    position: relative;
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    width: 50px;
    height: 50px;
    z-index: 100;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    border-radius: 50%;
    background: #fff;
  }
  .button .next{
     display: inline-block;
     width: 0; 
    height: 0; 
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    
    border-left: 10px solid black;
  }
  
  .button .prev{
   display: inline-block;
   width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  
  border-top: 10px solid black;

  }
  
  .controls .text-hidden {
    position: absolute;
    overflow: hidden;
    width: 0;
    height: 0;
    color: transparent;
    display: block;
}
</style>
