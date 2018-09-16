<template>
  <div class="news-view">
    <div class="temp-news-list" :key="displayedPage" v-if="displayedPage > 0">
      <ul>
        <template v-for="item in displayedItems">
          <li>
            <h6><strong><a v-bind:href="item.url">{{ item.title }}</a></strong></h6>
            <div class="non-header-list-content">
            <p >{{ item.text }}</p>
            <span> {{item.kids.length}} Comments </span>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="news-list-nav">
      <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; prev</router-link>
      <a v-else class="disabled">&lt; prev</a>
      <span>{{ page }}/{{ maxPage }}</span>
      <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>
      <a v-else class="disabled">more &gt;</a>
    </div>
    <!-- <transition :name="transition">
      <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">
        <transition-group tag="ul" name="item">
          <div v-for="item in displayedItems" :key="item.id" :item="item">
          </div>
        </transition-group>
      </div>
    </transition> -->
  </div>
</template>

<script>
import ItemView from './ItemView.vue'
//import { fetchTopStories, fetchItems, fetchItem, makeAjaxRequest } from '../api'

export default {
  name: 'ItemList',
  components: {
    ItemView
  },
  props: {
    type: String
  },
  data () {
    return {
      transition: 'slide-right',
      displayedPage: Number(this.$route.params.page) || 1,
      displayedItems: []
    }
  },
  created: function(){
    this.fetchTopStories();
  },
  computed: {
    page () {
      return Number(this.$route.params.page) || 1
    },
    maxPage () {
      return 1
      const { itemsPerPage, lists } = this.$store.state
      return Math.ceil(lists[this.type].length / itemsPerPage)
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },
  methods: {

    makeAjaxRequest: function (api, methodType, data, callback){
      var baseURL = "https://hacker-news.firebaseio.com/v0/";
      var url = baseURL + api;
      var xhr = new XMLHttpRequest();
      xhr.open(methodType, url, true);
      xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
          if (xhr.status === 200){
             var resp = xhr.responseText;
             var respJson = JSON.parse(resp);
             callback(respJson, null);
          } else {
            console.log("xhr failed");
            callback(null, xhr.responseText);
          }
        } else {
          //console.log("xhr processing going on");
        }
      }
      xhr.send();
    },

    fetchTopStories: function (){
      var url = "topstories.json";
      let _this = this;
      this.makeAjaxRequest(url, "GET", {}, function(res, err){
        _this.fetchItems(res);
      });
    },

    fetchItem: function (id){
      var url = "/item/" + id + ".json";
      let _this = this;
      this.makeAjaxRequest(url, "GET", {}, function(res, err){
        _this.displayedItems.push(res);
      });
    },

    fetchItems: function (ids){
      for(var i=0; i<=10; i++){
        this.fetchItem(ids[i]);
      }
    },
  }
}
</script>

<style lang="stylus">
.news-view
  padding-top 45px
.news-list-nav, .news-list
  background-color #fff
  border-radius 2px
.news-list-nav
  padding 15px 30px
  position fixed
  text-align center
  top 55px
  left 0
  right 0
  z-index 998
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    margin 0 1em
  .disabled
    color #ccc
.news-list
  position absolute
  margin 30px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0
.temp-news-list
  position absolute
  margin 1rem
  height: 100%
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    li
      margin 1rem
      position: relative;
      font-size: 2rem;
      background: #fff;
      h4
        margin: 0.5rem

.non-header-list-content
  margin: 0.4rem
  color #d34410
  font-size: 1rem;

.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)
.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)
.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)
.item-enter
  opacity 0
  transform translate(30px, 0)
.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)
@media (max-width 600px)
  .news-list
    margin 10px 0
</style>
