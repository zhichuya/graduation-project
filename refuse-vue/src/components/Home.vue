<template>
  <div class="page-content">
    <div class="containner">
		<van-search
			v-model="keywords"
			background="#4fc08d"
			placeholder="请输入搜索关键词"
			@search="onSearch"
			@cancel="onCancel"
		/>
		<van-collapse v-model="activePanl" v-for="(item, index) in categoryInfo" :key="item.id" accordion>
			<van-collapse-item :title="item.refusename" :name="index">
				{{item.refusename}}属于<span :class="description[item.category]">{{item.category}}</span>
				{{intro[item.category].intro}}
			</van-collapse-item>
		</van-collapse>
    </div>
    <van-tabbar class="van-tabbar" v-model="active">
		<van-tabbar-item icon="search">文字搜索</van-tabbar-item>
		<van-tabbar-item icon="photo-o" @click="imageRec">图片识别</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Search, Toast, Collapse, CollapseItem } from "vant";
import API from '@/config/api.js';
import Intro from '@/config/intro.js';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Search);
Vue.use(Collapse);
Vue.use(CollapseItem);

export default {
  	name: "Home",
  	data: () => {
		return {
			active: 0,
			activePanl: ["1"],
			keywords: "",
			categoryInfo: [],
			intro:Intro,
			description: {
				"可回收物":"description-recycled",
				"有害垃圾":"description-dangerous",
				"厨余垃圾":"description-kitchen",
				"其他垃圾":"description-other",
			}
		};
	},
	methods: {
		onSearch(val) {
			if(val.length === 0){
				Toast("请输入搜索关键字");
				return;
			}
			Toast("正在搜索,请稍后");
			this.$axios.get(API.search,{
				params: {
					keywords: val
				}
			}).then((res)=>{
				this.categoryInfo = res.data;
			}).catch((err) =>{
				Toast("出了点状况抱歉😭");
			})
		},
		onCancel() {
			Toast('取消');
		},
		imageRec(){
			this.$router.push({path: '/imageRec'})
		}
	}
};
</script>
<style>
.page-content {
	width: 100%;
}
.van-tabbar {
  z-index: 10000;
  position: fixed;
  bottom: 0;
}
/* 厨余垃圾 */
.description-kitchen{
	color: #23d170;
	font-size: 1.3rem;
}
/* 有害垃圾 */
.description-dangerous{
	color: #ff5b42;
	font-size: 1.3rem;
}
/* 可回收物 */
.description-recycled{
	color: #2890ff;
	font-size: 1.3rem;
}
/* 其他垃圾 */
.description-other{
	color: #4d4e50;
	font-size: 1.3rem;
}
</style>