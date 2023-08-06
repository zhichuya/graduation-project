<template>
  <div class="page-content">
    <div class="containner">	
		
		<van-button 
			type="primary" 
			size="large"
			icon="plus" 
			@click="uploadImage"
		>
		上传图片
		</van-button>
		<van-image
			width="100vw"
			fit="cover"
			:src="imgSrc"
			v-if="imgSrc"
		/>
		<van-card
			class="card"
			v-if="maxScoreLabel"
			:desc="intro[maxScoreLabel].intro"
			:title="maxScoreLabel"
			:thumb="intro[maxScoreLabel].icon"
		/>
		<div class="progress" v-for="item in result" :key="item.label">
			<div class="label">{{item.label}}</div>
			<van-slider :value="item.score" bar-height="8px" active-color="#ee0a24">
				<template button>
					<div class="custom-button">{{item.score}}</div>
				</template>
			</van-slider>
			<div class="score">{{item.score}}</div>
		</div>
    </div>
    <van-tabbar class="van-tabbar" v-model="active">
		<van-tabbar-item icon="home-o" @click="home">文字搜索</van-tabbar-item>
		<van-tabbar-item icon="search">图片识别</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import * as tf from "@tensorflow/tfjs"
import api from '@/config/api.js'
import { Button, Slider,Image as VanImage, Card, Uploader } from 'vant';
import { file2img, img2x } from '@/utils/index.js'
import Intro from '@/config/intro.js'

Vue.use(Slider);
Vue.use(Button);
Vue.use(VanImage);
Vue.use(Card);
Vue.use(Uploader);
export default {
  	name: "ImageRec",
  	data(){
		return {
			active: 1,
			model: null,
			classes: null,
			imgSrc: '',
			result: [],
			maxScoreLabel: null,
			intro: Intro
		};
	},
	async created(){
		this.model = await tf.loadLayersModel(api.modelPath)
		this.classes = await fetch(api.classesPath).then(res => res.json());
	},
	mounted(){

	},
	methods: {
		home(){
			this.$router.push({path: '/'})
		},
		uploadImage(){
			let inputObj = document.createElement('input')
			inputObj.setAttribute('id','uploadFile');
			inputObj.setAttribute('type','file');
			inputObj.setAttribute("style",'visibility:hidden');
			document.body.appendChild(inputObj);
			let file = null
			let that = this;
			inputObj.oninput = function(e){
				file = e.target.files[0];
				//直接调用predict方法进行预测
				that.predict(e);
			}
			inputObj.click();
		},
		setScore(){
			this.maxScoreLabel = this.result[0].label;
		},
		async predict(e){
			const file = e.target.files[0]
			const img = await file2img(file);
			// 把图片转成tensor并且喂给模型进行预测
			this.imgSrc = img.src;
			const pred = await tf.tidy(() => {
				const x = img2x(img);
				return this.model.predict(x);
			});
			// 把预测结果与类别结合并排序得到每个类别的降序得分
			let result = await pred.arraySync()[0]
							.map((score, i) => ({ score: Math.round(score * 100), label: this.classes[i] }))
							.sort((a, b) => b.score - a.score);
			this.result = result;
			this.setScore();
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
.card{
	overflow: hidden;
}
.progress{
	margin-top: 3vh;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.label{
	margin-left: 5vw;
	width: 20vw;
}
.score{
	margin-left: 5vw;
	width: 8vw;
}
.van-slider{
	width: 60vw;
}
.van-slider__button {
    width: 10px;
    height: 10px;
}
.custom-button {
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 100px;
}
.van-ellipsis {
    text-overflow: ellipsis !important;
}
</style>