<template>
  <div class="container" v-loading="isLoading">
    <h4 class="text-center">{{ $t('Aҳоли маълумотларини қўшиш') }}</h4>
    <router-link :to="{ name:'CitizensIndex', query: { type: $route.query.type } }">
      <el-button type="text" class="mb-1" icon="el-icon-arrow-left">{{$t('Рўйхатга қайтиш') }}</el-button>
    </router-link>
    <el-card class="box-card box-shadow">
      <personal-detail ref="personalForm" :form="form" />
      <el-col :span="24" class="d-flex justify-content-end mb-3">
        <el-button type="primary" icon="el-icon-check" :disabled="is_disable" @click="save">{{$t('Сақлаш') }}</el-button>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import PersonalDetail from './personal-details'
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'UpdateCitizen',
  components: { PersonalDetail },
  data() {
    return {
      isLoading: true,
      imageUrl: '',
      is_disable: false,
      active: 0,
      form: {
        id: '',
        first_name: '',
        last_name: '',
        patronymic: '',
        passport: '',
        birth_date:'',
        phone:'',
        doctor_user_id:1,
        tin: '',
        region_id: '',
        city_id: '',
        diseases_id: '',
        address: '',
        type: this.$route.query.type
      }
    }
  },
  mounted() {
    this.edit(this.$route.params.id)
        .then(res => {
          this.setForm({ form: this.form, citizen: res.result.citizen })
          this.isLoading = false
        })
  },
  methods: {
    save() {
      if (this.validate()) {
        console.log('kelli')
        this.is_disable = true
        this.updateCitizen(this.form).then((res) => {
          console.log('kellii')

          if (res.success) {
            this.setForm({ form: this.form, citizen: res.result.citizen })
            console.log('kelliii')

            Swal.fire({
              title: this.$t('Маълумот сақланди!'),
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
              confirmButtonText: 'Давом этиш'
            })
                .then(() => {
                  this.$router.push({ name: 'CitizensIndex', query: { type: this.$route.query.type } })
                })
          } else if (res.error === 'Bu ma\'lumotlar bazada mavjud') {
            this.is_disable = false
            Swal.fire({
              title: this.$t('Ушбу маълумотлар базада мавжуд!'),
              icon: 'error',
              timer: 2000,
              showConfirmButton: false,
              confirmButtonText: 'Давом этиш'
            })
          }
        })
            .catch((res) => {
              this.is_disable = false
              Swal.fire({
                title: this.$t('Сервернинг ички хатолиги!'),
                icon: 'error',
                timer: 2000,
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
      edit: 'citizen/edit',
      updateCitizen: 'citizen/update',
      setForm: 'citizen/setForm'
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
