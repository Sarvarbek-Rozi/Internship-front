<template>
    <!-- Header Start -->
    <div class="container-fluid header  p-0 position-relative mt-2" style="background-color: #f2f6fc!important; height: 800px">
      <div class="row g-0 align-items-center flex-column-reverse flex-lg-row">
        <div class="col-lg-6 p-5 wow fadeIn" data-wow-delay="0.1s">
            <el-row v-if="!is_auth">
                  <el-card class="box-card classic-style">
                    <template  v-if="!loaded">
                      <el-row class="mb-2 text-center">
                        <div class="m-1 router-link" style="font-size:18px"> <b>{{ $t('Шахсий мобил рақамингизни киритинг') }}</b></div> <br>
                      </el-row>
                      <el-input class="el-input"
                                v-mask="'#########'"
                                placeholder="Шахсий мобил рақамингизни киритинг"
                                v-model="data.phone" >
                        <template slot="prepend">+998</template>
                      </el-input>
                      <el-row>
                        <el-button @click="showPassword()"  type="primary" class="w-100">{{ $t('Юбориш') }}</el-button>
                      </el-row>
                    </template>
                    <template v-else>
                      <div  class="m-1 router-link" style="font-size:18px"> <b>{{ $t('Raqamingizga kelgan kodni kiriting') }}</b></div>
                      <el-input maxLength="5"  style="margin-top: 20px;  width: 150px;" placeholder="Кодни киритинг" v-model="data.code" type="number"></el-input>
                      <el-button @click="confirmation" type="primary" class="w-100">{{ $t('Тасдиқлаш') }}</el-button>
                    </template>
                  </el-card>
            </el-row>
          <el-row class="text-primary ">
            <h1 v-if="is_auth && user.role_id===2" >Xush kelibsiz doktor {{user.name}}</h1>
            <h1 v-else-if="is_auth && user.role_id===1">Siz adminstrator bo`lib kirdingiz</h1>
          </el-row>
        </div>



        <div class="col-lg-6">
          <el-carousel height="800px">
            <el-carousel-item>
              <img src="@/assets/images/carousel-1.jpg" class="d-block w-100" alt="...">
            </el-carousel-item>
            <el-carousel-item>
              <img src="@/assets/images/carousel-2.jpg" class="d-block w-100" alt="...">
            </el-carousel-item>
            <el-carousel-item>
              <img src="@/assets/images/carousel-3.jpg" class="d-block w-100" alt="...">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ChooseType',
  data() {
    return {
      data: {
        phone: null,
        code: null,
        checkCode: '',
        is_confirmed: false,
      },
      disable: true,
      dialogVisible: false,
      input: '',
      // checkCode: '',
      phone:'',
      loaded: false
    }
  },
  methods: {
    ...mapActions({
      fetchPhone: 'application/phone',
      confirmAction: 'application/confirm',
    }),
    showPassword(){
      if (this.data.phone.length===9 ){
        this.loaded = true
        this.dialogVisible = true
        this.fetchPhone('+998' + this.data.phone)
      }
    },
    confirmation() {
      if (!this.data.code) {
        this.$message.error('Kodni kiriting!')
        return false
      }

      this.loading = 'code'
      this.confirmAction({ phone: '+998' + this.data.phone, code: this.data.code }).then((res) => {
        if (res.success) {
          this.data.is_confirmed = true
          this.confirmDialog = false
          this.$router.push({ name: 'ApplicationsCreate'})
          this.phone=this.data.phone
          // this.$message.success('Muvaffaqiyatli tasdiqlandi!')
          this.$emit('phoneSuccess', true)
        } else {
          this.$message.error('Kod mos emas!')
        }
      }).catch((res) => {
        this.$message.error('Kod mos emas!')
      }).finally(() => {
        this.loading = ''
      })
    },
  },
  computed:{
  ...mapGetters({ is_auth: 'auth/GET_IS_AUTH', user: 'auth/USER' }),

  },
  watch:{
    'data.code'(newVal){
    if(newVal.length>=6){
        this.$message.error('Kodni uzunligi oshib ketdi')
        this.data.code=null
        return false
      }
    }
  }
}
</script>
<style scoped>

  .box-card{
    border-radius: 10px;
    width: 450px !important;
    margin: 0 auto !important;
  }
  .router-link:hover{
    text-decoration: none !important;
  }
  a:hover {
    text-decoration: none !important;
  }
  .large-icon{
    font-size: 80px;
  }
  .mt-100 {
    margin-top: 80px;
  }
  .mt-200 {
    margin-top: 240px;
  }
  .el-input{
    margin-bottom: 20px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

