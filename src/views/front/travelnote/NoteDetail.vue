<template>
  <div class="note-detail-view">
    <div class="title_bg">
      <el-image
          style="width: 100%; height: 100%"
          :src="noteDetail.coverImage"
          fit="none"></el-image>
    </div>
    <div class="content-wrapper">
      <div class="base-info">
        <div class="left person-avatar">
          <el-image
              style="width: 100%; height: 100%;border-radius: 50%;"
              :src="noteDetail.publisherAvatar"
              fit="cover"></el-image>
        </div>
        <div class="right info">
          <div class="title">{{noteDetail.title}}</div>
          <div class="publisher-time">
            <span class="publisher">{{noteDetail.publisherName}}</span>
            <span class="time">{{noteDetail.publishTime}}</span>
          </div>
        </div>
      </div>
      <div class="travel-dir-list">
        <div class="start-time"><i class="el-icon-time"></i> 出发时间 / {{noteDetail.startTime}}</div>
        <div class="cost"><i class="el-icon-money"></i> 人均费用 / {{noteDetail.cost}}</div>
        <div class="day"><i class="el-icon-date"></i> 出行天数 / {{noteDetail.day}}</div>
      </div>

      <div class="article-wrapper" v-html="noteDetail.content"></div>
    </div>
  </div>
</template>


<script>
	export default {
		name: "NoteDetail",
		components:{
		},
		data(){
			return{
				//游记详情及作者信息
				noteDetail: {
          id: "",
          tnId: "",
          authorId: "",
          publisherAvatar: "",
          publisherName: "",
          publishTime: "",
          startTime: "",
          day: "",
          cost: "",
          content: "",
          title: "",
          coverImage: ""
        },
			}
		},
		methods:{
			//初始化数据
			initNoteAndAuthorInfo(){
				this.$axios.get("/api/travelNote/detail?tn_id="+this.noteDetail.id,
            {
              headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }).then(res =>{
					console.log(res);
					if(res.data.code === 200){
						this.noteDetail = res.data.data;
            console.log("前端拿到的数据res.data.data:"+res.data.data);
					}
				})
			},
		},
		created() {
			console.log(this.$route);
			this.noteDetail.id = this.$route.params.id;

			this.initNoteAndAuthorInfo();
		},
	}
</script>

<style lang="less" scoped>
	.note-detail-view{
		width: 100%;
		.title_bg{
			width: 100%;
			height: 360px;
		}
		.content-wrapper{
			width: 80%;
			.base-info{
				display: flex;
				position: relative;
				margin: -80px 0 0 20%;
				.left{
					width: 160px;
					height: 160px;
				}
				.right{
					flex: 1;
					line-height: 80px;
					margin-left: 30px;
					.title{
						font-size: 32px;
						font-weight: bold;
						color: white;
					}
					.publisher-time{
						.time{
							margin-left: 50px;
						}
					}
				}
			}
			.travel-dir-list{
				display: flex;
				padding: 20px;
				border: 1px dashed #ddd;
				margin-left: 20%;
				margin-top: 20px;
				div{
					margin-left: 20px;
				}
			}
		}
	}
</style>
