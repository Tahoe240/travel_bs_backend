<!--<template>-->
<!--  <div class="xjt-write-travelnote-view">-->
<!--    <div class="my-title-text-clip">写游记</div>-->

<!--    <div class="form-wrapper">-->
<!--      <el-form ref="editForm"-->
<!--               class="editForm"-->
<!--               status-icon-->
<!--               label-width="100px"-->
<!--               label-position="left"-->
<!--               :model="editForm">-->
<!--        <el-form-item label="设置游记头图">-->
<!--          <el-upload-->
<!--            class="avatar-uploader"-->
<!--            action="/api/aliyun/oss/upload"-->
<!--            :show-file-list="false"-->
<!--            :on-success="handleAvatarSuccess"-->
<!--            :before-upload="beforeAvatarUpload"-->
<!--            :headers="headers">-->
<!--            <img v-if="editForm.coverImage!=null && editForm.coverImage!='' " :src="editForm.coverImage" class="coverImg">-->
<!--            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--          </el-upload>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="标题"-->
<!--                      :rules="[-->
<!--											{ required: true, message: '请输入游记标题', trigger: 'blur' },-->
<!--										]"-->
<!--                      prop="title">-->
<!--          <el-input v-model="editForm.title"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="描述">-->
<!--          <el-input-->
<!--            type="textarea"-->
<!--            :rows="4"-->
<!--            placeholder="请输入描述内容"-->
<!--            v-model="editForm.description">-->
<!--          </el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="目的地">-->
<!--          <el-input v-model="editForm.location"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="出发时间">-->
<!--          <el-input v-model="editForm.start_time"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="天数">-->
<!--          <el-input v-model="editForm.day"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="费用">-->
<!--          <el-input v-model="editForm.cost"></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="游记内容" prop="content" class="mavon-editor">-->
<!--          <div id="wangeditor">-->
<!--            <p class="warn-content">-->
<!--              富文本基于-->
<!--              <el-link type="primary" href="https://www.kancloud.cn/wangfupeng/wangeditor3/332599" target="_blank">wangEditor</el-link>-->
<!--            </p>-->
<!--          </div>-->
<!--        </el-form-item>-->

<!--        <el-form-item style="margin: auto;">-->
<!--          <el-button type="info" @click="reset">重置</el-button>-->
<!--          <el-button type="primary" @click="submitForm">提交</el-button>-->
<!--        </el-form-item>-->

<!--        <div style="height: 30px;"></div>-->
<!--      </el-form>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import E from "wangeditor"-->

<!--  export default {-->
<!--    name: "WriteTravelNote",-->
<!--    data(){-->
<!--      return{-->
<!--        editForm: {-->
<!--          title: "",-->
<!--          description: "",-->
<!--          coverImage: null,-->
<!--          location:"",-->
<!--          start_time:"",-->
<!--          day:"",-->
<!--          cost:"",-->
<!--          content: "",-->
<!--          authorId:""-->
<!--        },-->

<!--        /*wangEditor*/-->
<!--        editor:null,-->
<!--        dialogTableVisible:false,-->
<!--        editorContent:"",-->

<!--        headers:{-->
<!--          Authorization: `Bearer ${localStorage.getItem('token')}`-->
<!--        },-->
<!--      }-->
<!--    },-->
<!--    methods:{-->
<!--      handleAvatarSuccess(res, file) {-->
<!--        console.log("res.data"+res.data);-->
<!--        console.log("res.status"+res.status);-->
<!--        console.log("res.code"+res.code);-->
<!--        if(res.code === 200){-->
<!--          this.editForm.coverImage = res.data;-->
<!--        }-->
<!--      },-->
<!--      beforeAvatarUpload(file) {-->
<!--        const isJPG = file.type.startsWith("image");-->
<!--        const isLt10M = file.size / 1024 / 1024 < 10;-->

<!--        if (!isJPG) {-->
<!--          this.$message.error('上传头像图片只能是 JPG 格式!');-->
<!--        }-->
<!--        if (!isLt10M) {-->
<!--          this.$message.error('上传头像图片大小不能超过 10MB!');-->
<!--        }-->
<!--        return isJPG && isLt10M;-->
<!--      },-->

<!--      //提交表单-->
<!--      submitForm() {-->
<!--        this.editForm.content = this.editor.txt.html();-->
<!--        this.editForm.authorId = JSON.parse(localStorage.getItem('login_user')).userId;-->
<!--        this.editForm.authorId = parseInt(this.editForm.authorId);-->
<!--        console.log("authorId"+this.editForm.authorId);-->
<!--        		this.$axios.post("/api/travelNote/add",this.editForm,{-->
<!--              headers: this.headers-->
<!--            }).then(res =>{-->
<!--        			if(res.data.code ===200){-->
<!--        				this.$notify.success(res.data.message);-->
<!--        				setTimeout(()=>{-->
<!--                  this.$router.push('/travelnote/'+res.data.data.tnId)-->
<!--                },1500)-->
<!--        			}-->
<!--        });-->
<!--      },-->
<!--      //重置（清空输入）-->
<!--      reset(){-->
<!--        this.$refs.editForm.resetFields();-->
<!--      },-->

<!--      initWangEditor(){-->
<!--        this.editor = new E("#wangeditor");-->

<!--        this.editor.config.zIndex = 10;-->

<!--        // 设置编辑区域高度为 500px-->
<!--        this.editor.config.height = 500;-->
<!--        // 注意，先配置 height ，再执行 create()-->
<!--        this.editor.create();-->

<!--        //设置内容-->
<!--        if(this.editForm.content){-->
<!--          this.editor.txt.html(this.editForm.content)-->
<!--        }-->

<!--      },-->
<!--    },-->
<!--    created() {-->

<!--    },-->
<!--    mounted() {-->
<!--      this.$nextTick(() =>{-->
<!--        this.initWangEditor();-->
<!--      });-->
<!--    }-->
<!--  }-->
<!--</script>-->


<template>
  <div class="xjt-write-travelnote-view">
    <div class="my-title-text-clip">写游记</div>

    <div class="form-wrapper">
      <el-form ref="editForm"
               class="editForm"
               status-icon
               label-width="100px"
               label-position="left"
               :model="editForm">
        <el-form-item label="设置游记头图">
          <el-upload
              class="avatar-uploader"
              action="/api/aliyun/oss/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="headers">
            <img v-if="editForm.coverImage!=null && editForm.coverImage!='' " :src="editForm.coverImage" class="coverImg">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="标题"
                      :rules="[
											{ required: true, message: '请输入游记标题', trigger: 'blur' },
										]"
                      prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入描述内容"
              v-model="editForm.description">
          </el-input>
        </el-form-item>

        <el-form-item label="目的地">
          <el-input v-model="editForm.location"></el-input>
        </el-form-item>

        <el-form-item label="出发时间">
          <el-input v-model="editForm.start_time"></el-input>
        </el-form-item>

        <el-form-item label="天数">
          <el-input v-model="editForm.day"></el-input>
        </el-form-item>

        <el-form-item label="费用">
          <el-input v-model="editForm.cost"></el-input>
        </el-form-item>

        <el-form-item label="游记内容" prop="content" class="mavon-editor">
          <WangEditor v-model="editForm.content" ref="wangEditor"></WangEditor>
        </el-form-item>

        <el-form-item style="margin: auto;">
          <el-button type="info" @click="reset">重置</el-button>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>

        <div style="height: 30px;"></div>
      </el-form>
    </div>
  </div>
</template>

<script>
import WangEditor from "./WangEditor.vue";

export default {
  name: "WriteTravelNote",
  components: {
    WangEditor,
  },
  data(){
    return{
      editForm: {
        title: "",
        description: "",
        coverImage: null,
        location:"",
        start_time:"",
        day:"",
        cost:"",
        content: "",
        authorId:""
      },

      /*wangEditor*/
      editor:null,
      dialogTableVisible:false,
      editorContent:"",

      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }
  },
  methods:{
    handleAvatarSuccess(res, file) {
      console.log("res.data"+res.data);
      console.log("res.status"+res.status);
      console.log("res.code"+res.code);
      if(res.code === 200){
        this.editForm.coverImage = res.data;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type.startsWith("image");
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      return isJPG && isLt10M;
    },

    //提交表单
    submitForm() {
      this.editForm.authorId = JSON.parse(localStorage.getItem('login_user')).userId;
      this.editForm.authorId = parseInt(this.editForm.authorId);
      console.log("authorId"+this.editForm.authorId);
      this.$axios.post("/api/travelNote/add",this.editForm,{
        headers: this.headers
      }).then(res =>{
        if(res.data.code ===200){
          this.$notify.success(res.data.message);
          setTimeout(()=>{
            this.$router.push('/travelnote/'+res.data.data)
          },1500)
        }
      });
    },
    //重置（清空输入）
    reset(){
      this.$refs.editForm.resetFields();
    },

    initWangEditor(){
    },
  },
  created() {
  },
  mounted() {
    this.$nextTick(() =>{
    });
  }
}
</script>


<style lang="less" scoped>
.xjt-write-travelnote-view {
  width: 80%;
  margin: auto;
}

/*文字特效*/
.my-title-text-clip {
  color: transparent;
  font-size: 30px;
  line-height: 60px;
  font-weight: bold;
  background: linear-gradient(45deg, rgba(0, 173, 181, 1) 0%, rgba(0, 173, 181, .4) 100%);
  -webkit-background-clip: text;
}

.avatar-uploader {
  height: 178px;
  width: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.coverImg {
  width: 178px;
  height: 178px;
  display: block;
}


</style>
