<template>
  <div class="container">
    <h4 class="text-center">{{ $t('Doktor malumotlarini qo`shish') }}</h4>
    <router-link :to="{ name:'DoctorsIndex', query: { type: $route.query.type } }">
      <el-button type="text" class="mb-1" icon="el-icon-arrow-left">{{ $t('Рўйхатга қайтиш') }}</el-button>
    </router-link>
    <el-card v-loading="loadingform" class="box-card box-shadow">
      <personal-detail ref="personalForm" :form="form" />
      <el-col :span="24" class="d-flex justify-content-end mb-3">
        <el-button type="primary" icon="el-icon-check"  @click="save">{{ $t('Сақлаш') }}</el-button>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import PersonalDetail from './personal-details'
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'CreateDoctor',
  components: { PersonalDetail },
  data() {
    return {
      loading: true,
      loadingform: false,
      form: {
        id: 0,
        name: '',
        email: '',
        password: '',
        region_id: '',
        city_id: '',
        disease_id: '',
        description: '',
        role_id:2,
        hospital_id: 3,
        type: this.$route.query.type
      }
    }
  },
  methods: {
    save() {
      if (this.validate()) {
        this.loadingform = true
        this.storeDoctor({ data: this.form })
            .then(res => {
              this.loadingform = false
                Swal.fire({
                  title: this.$t('Маълумот сақланди!'),
                  type: 'success',
                  timer: 1500,
                  showConfirmButton: false,
                  confirmButtonText: 'Давом этиш'
                })
                    .then(() => {
                      this.$router.push({ name: 'DoctorsIndex', query: { type: this.$route.query.type }})
                    })
            })
            .catch((res) => {
              this.is_disable = false
              Swal.fire({
                title: this.$t('Сервернинг ички хатолиги!'),
                icon: 'error',
                timer: 1000,
                showConfirmButton: false,
                confirmButtonText: 'Давом этиш'
              })
            })
      }
    },
    validate() {
      this.$refs['personalForm'].validateForm()
      return this.$refs['personalForm'].validated
    },
    ...mapActions({
      storeDoctor: 'doctor/store',
      // updateDoctor: 'doctor/update',
    })
  }
}
</script>

<style>
@keyframes zoominoutsinglefeatured {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}

.single-featured {
  animation: zoominoutsinglefeatured 0.5s forwards;
}
.swal2-title{
  font-size: 20px;
}
</style>
