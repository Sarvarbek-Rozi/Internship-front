<template>
  <div style="min-height: 60vh" class="d-flex justify-content-around align-items-stretch">
    <div class="container d-flex justify-content-around align-items-stretch">
      <el-card
          v-loading="code != '' || loading"
          class="box-card classic-style"
          style="margin-top: 200px  ;"
      >
        <p class="text-center" style="font-size: 20px; margin: 0 0 20px;">
          {{ $t('Email va parolni kiriting!') }}
        </p>
        <el-row>
          <el-form
              ref="login-form"
              label-width="100px"
              class="login-form-custom"
          >
            <el-form-item :label="$t('Email')" class="mb-2">
              <input v-model="form.email" @keyup.enter="checkFieldsFilled()" />
            </el-form-item>
            <el-form-item :label="$t('Parol')" class="mb-0">
              <input v-model="form.password" type="password" @keyup.enter="checkFieldsFilled()">
            </el-form-item>
          </el-form>
        </el-row>
        <hr>
        <el-row>
          <el-button type="primary" class="w-100" style="font-size: 18px; " icon="el-icon-right" @click="checkFieldsFilled()">{{ $t('Кириш') }}</el-button>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    code() {
      return this.$route.query.code || ''
    }
  },
  methods: {
    ...mapActions({login: 'auth/login' }),
    submitLogin() {
      this.loading = true
      this.login(this.form)
          .then(res => {
            if(res.result.user.role_id==2){
              this.$router.push({ name: 'CitizensIndex' })
            }
            else if(res.result.user.role_id==1){
              this.$router.push({ name: 'DoctorsIndex' })
            }
          })
          .catch(err => {
            this.showLoginError(err)
          })
          .finally(() => {
            this.loading = false
          })
    },
    checkFieldsFilled() {
      if (this.validate()) {
        this.submitLogin()
      } else {
        this.showLoginError('empty')
      }
    },
    validate() {
      return !!((this.form.email.length > 0 && this.form.password.length > 0))
    },
    showLoginError($type) {
      var message
      if ($type === 'empty') {
        message = this.$t('Email ёки парол киритилмади')
      } else {
        message = this.$t('Email ёки парол хато')
      }
      this.$message({
        message: message,
        type: 'error',
        duration: 5 * 1000,
        offset: 80
      })
    }
  }
}
</script>
<style scoped>
.box-card {
  display: block;
  width: 480px;
  margin: auto;
}
</style>
