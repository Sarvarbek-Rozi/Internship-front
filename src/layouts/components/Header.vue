<template>
  <div>

    <!-- Topbar Start -->
      <div class="row gx-0 d-none d-lg-flex" style="background-color: #f2f6fc!important;">
        <div class="col-lg-7 px-5 text-start">
          <div class="h-100 d-inline-flex align-items-center py-3 me-4">
            <small>123 Ko`cha, Toshkent, UZB</small>
          </div>
          <div class="h-100 d-inline-flex align-items-center py-3">
            <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
          </div>
        </div>
        <div class="col-lg-5 px-5 text-end">
          <div class="h-100 d-inline-flex align-items-center py-3 me-4">
            <small></small>
            <small class="text-primary">Tel:+998942719911</small>
            <small v-if="is_auth" class="d-flex ml-4 text-warning" style="cursor: pointer" @click="logoutHandle()">
              {{ $t('Тизимдан чиқиш') }} <img alt="logo" src="@/assets/images/logout.svg" height="14px" class="ml-2 mt-1 ">
            </small>
          </div>

        </div>
      </div>

    <!-- Topbar End -->


    <!-- Navbar Start -->
    <nav class="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 wow fadeIn" data-wow-delay="0.1s">
      <a href="" class="navbar-brand d-flex align-items-center px-4 px-lg-5 ">
        <router-link :to="'/'"> <h1 class="m-0 text-primary"><i class="far fa-hospital me-3"></i>Klinik</h1></router-link>
      </a>
      <div class="collapse navbar-collapse" id="navbarCollapse" >
        <el-menu
            mode="horizontal"
            text-color="#000"
            background-color="#fff"
            @select="handleSelect"
            style="margin-right:0!important;"
        >
          <el-menu-item  v-if="is_auth && user.role_id===2"   style="float: right;" >
            <div class="btn btn-primary   d-lg-block  mt-3" >
              <router-link :to="{name: 'CitizensIndex'}" style="text-decoration: none" >
                <div>  {{ user_full_name }}</div>
              </router-link>
            </div>
          </el-menu-item>
          <el-menu-item v-else-if="is_auth && user.role_id===1" style="float: right;">
            <div class="btn btn-primary   d-lg-block  mt-3" >
              <router-link :to="{name: 'DoctorsIndex'}" style="text-decoration: none" >
                <div>  {{ user_full_name }}</div>
              </router-link>
            </div>
          </el-menu-item>
          <el-menu-item v-if="!is_auth" style="line-height: 89px;">
            <router-link :to="{name: 'ApplicationCheckYouth'}" style="text-decoration: none" >
              <div>{{$t('Aриза ҳолатини текшириш')}}</div>
            </router-link>
          </el-menu-item>
          <el-menu-item v-if="is_auth && user.role_id === 2"  style=" line-height: 88px;">
            <router-link :to="{name: 'ApplicationsIndex'}" style="text-decoration: none">
              <div>{{$t('Сўровлар')}}</div>
            </router-link>
          </el-menu-item>
          <el-submenu  >
            <template slot="title">
              {{ selectedLanguage }}
            </template>
            <el-menu-item index="2-1" @click="changeLocale('uz_crl')">Ўзбекча</el-menu-item>
            <el-menu-item index="2-1" @click="changeLocale('ru')">Русский</el-menu-item>
          </el-submenu>

          <el-menu-item  v-if="!is_auth" index="4" style="float: right; line-height: 89px;">
              <router-link :to="{ name:'Login' }" style="text-decoration: none;">
                <div class="text-white btn btn-primary rounded-0 py-3 px-lg-4 d-none d-lg-block mt-2" style="border-radius: 20px!important; ">
                  {{ $t('Aдминистраторлар учун кириш') }}
                  <img
                      alt="logo"
                      src="@/assets/images/login.svg"
                      height="14px"
                      class="ml-2 mt-1 bg-white"
                  >
                </div>
              </router-link>
          </el-menu-item>
        </el-menu>
      </div>
    </nav>
    <!-- Navbar End -->
  </div>

</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      selectedLanguage: this.$i18n.locale === 'ru' ? 'Русский' : this.$i18n.locale === 'uz' ? 'O\'zbekcha' : 'Ўзбекча',
      authServiceLink: process.env.VUE_APP_AUTH_SERVICE_URL
    }
  },
  computed: {
    ...mapGetters({ is_auth: 'auth/GET_IS_AUTH', user_full_name: 'auth/USER_FULL_NAME', user: 'auth/USER'}),
  },
  methods: {
    ...mapActions({ logout: 'auth/logout' , changeLocaleAction: 'app/changeLocale' }),
    handleSelect(index, indexPath) {
    },
    changeLocale(lang) {
      this.changeLocaleAction(lang)
      this.selectedLang(lang)
    },
    selectedLang(lang) {
      switch (lang) {
        case 'uz': this.selectedLanguage = 'O\'zbekcha'; break
        case 'uz_crl': this.selectedLanguage = 'Ўзбекча'; break
        case 'ru': this.selectedLanguage = 'Русский'; break
        default: this.selectedLanguage = 'O\'zbekcha'; break
      }
    },
    logoutHandle() {
      this.logout()
          .then(res => {
            window.location = '/'
          })
    }
  }
}
</script>
