<template>
  <div class="header">
    <div class="w-100 bg-white py-2">
      <div class="container bg-white">
        <div class="d-flex justify-content-between">
          <div class="d-flex text-start" style="font-size: 14px">
            <img alt="logo" src="@/assets/images/small-calendar.svg" height="14px" class="mr-2 mt-1"> {{ $t('Сана:') }} {{ date }} г.
          </div>
          <div v-if="is_auth" class="d-flex" style="cursor: pointer" @click="logoutHandle()">
            {{ $t('Тизимдан чиқиш') }} <img alt="logo" src="@/assets/images/logout.svg" height="14px" class="ml-2 mt-1  ">
          </div>
          
        </div>
      </div>
    </div>
    <el-menu
      class="el-menu-custom px-1"
      mode="horizontal"
      active-text-color="#fff"
      text-color="#fff"
      background-color="#3186FB"
      @select="handleSelect"
    >
      <el-submenu index="2" style="float: right;">
        <template slot="title">
          {{ selectedLanguage }}
        </template>
        <el-menu-item index="2-1" @click="changeLocale('uz_crl')">Ўзбекча</el-menu-item>
        <el-menu-item index="2-1" @click="changeLocale('ru')">Русский</el-menu-item>
      </el-submenu>
      <el-menu-item v-if="!is_auth" index="1" class="d-none d-sm-none d-md-block"><router-link :to="'/'"> <img alt="logo" width="300px" height="60px" src="@/assets/images/logouz.png"> </router-link></el-menu-item>
      <el-menu-item v-if="is_auth" index="3" class="d-none d-sm-none d-md-block"><router-link :to="{name: 'CitizensIndex'}"> <img alt="logo" width="300px" height="60px" src="@/assets/images/logouz.png"> </router-link></el-menu-item>
      <el-menu-item v-if="is_auth" index="3" style="float: right;">{{ user_full_name }}</el-menu-item>
      <el-menu-item  v-if="is_auth" index="3" style=" line-height: 88px; float: right;"><router-link :to="{name: 'ApplicationsIndex'}">{{ $t('Аризалар') }} </router-link></el-menu-item>
      <el-menu-item v-if="is_auth" index="3" style="float: right; line-height: 89px;"><router-link :to="{name: 'ApplicationCheckYouth'}"> {{ $t('Aриза ҳолатини текшириш') }} </router-link> </el-menu-item>
      <el-menu-item v-if="is_auth" index="3" style="float: right; line-height: 89px;"><router-link :to="{name: 'CitizensIndex'}">{{ $t('Асосий рўйхат') }} </router-link> </el-menu-item>
      <el-menu-item v-if="is_auth && user.role_id === 1" index="3" style="float: right; line-height: 89px;"><router-link :to="{name: 'Report'}"> {{ $t('Фуқоро хисоботи') }}   </router-link></el-menu-item>
      <el-menu-item v-if="is_auth && user.role_id === 1" index="3" style="float: right; line-height: 89px;"><router-link :to="{name: 'ReportApplication'}"> {{ $t('Аризалар ҳисоботи') }}  </router-link></el-menu-item>
    </el-menu>
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
    ...mapGetters({ is_auth: 'auth/GET_IS_AUTH', user_full_name: 'auth/USER_FULL_NAME', user: 'auth/USER' }),
    date() {
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
      var yyyy = today.getFullYear()
      return dd + '.' + mm + '.' + yyyy
    }
  },
//   created() {
//     this.selectedLanguage(this.$i18n.locale)
//   },
  methods: {
    ...mapActions({ logout: 'auth/logout' , changeLocaleAction: 'app/changeLocale' }),
    handleSelect(index, indexPath) {
      console.log(index)
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
    loginViaAuthService() {
      window.location = String(this.authServiceLink).replace('[domain]', window.location.hostname)
    },
    logoutHandle() {
      this.logout()
        .then(res => {
          var fullUrl = window.location.origin + '/'
          window.location = fullUrl
        })
    }
  }
}
</script>
