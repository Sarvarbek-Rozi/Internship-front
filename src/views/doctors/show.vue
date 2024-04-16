<template>
  <div v-loading="loadingform" class="container">
    <router-link :to="{ name:'DoctorsIndex', query: { type: $route.query.type } }">
      <el-button type="text" class="mb-1" icon="el-icon-arrow-left">{{ $t('Рўйҳатга қайтиш') }}</el-button>
    </router-link>
    <div class="bg-white box-shadow p-4">
      <el-table
          class="table-custom"
          :data="formdata"
          border
      >
        <el-table-column
            :label="$t('Номи')"
            prop="name"
            width="300"
            class="font-weight-bold"
        />
        <el-table-column
            prop="value"
            :label="$t('Қиймати')"
        />
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DoctorShow',
  data() {
    return {
      loadingform: true
    }
  },
  computed: {
    ...mapGetters({ doctor: 'doctor/GET_DOCTOR'}),
    formdata() {
      return [
        {
          name: this.$t('Ism/Familiya'),
          value: this.doctor.name
        },
        {
          name: this.$t('Email'),
          value: this.doctor.email
        },
        {
          name: this.$t('Parol'),
          value: this.doctor.password
        },
        {
          name: this.$t('Вилоят'),
          value: this.doctor.region.name_uz
        },
        {
          name: this.$t('Ҳудуд'),
          value: this.doctor.city.name_uz
        },

        {
          name: this.$t('Kasallik turi'),
          value:this.doctor.disease.name
        },
        {
          name: this.$t('Tarif'),
          value: this.doctor.description
        },
      ]
    }
  },
  mounted() {
    this.fetchCitizen(this.$route.params.id).then((res) => {
      this.loadingform = false
    })
  },
  methods: {
    ...mapActions({ fetchCitizen: 'doctor/show' })
  }
}
</script>
