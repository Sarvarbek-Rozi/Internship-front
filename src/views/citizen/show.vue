<template>
  <div v-loading="loadingform" class="container">
    <router-link :to="{ name:'CitizensIndex', query: { type: $route.query.type } }">
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
  name: 'CitizenShow',
  data() {
    return {
      loadingform: true
    }
  },
  computed: {
    ...mapGetters({ citizen: 'citizen/GET_CITIZEN' }),
    formdata() {
      return [
        {
          name: this.$t('ФИО'),
          value: [this.citizen.first_name, this.citizen.last_name, this.citizen.patronymic].join(' ')
        },
        {
          name: this.$t('Паспорт'),
          value: this.citizen.passport
        },
        {
          name: this.$t('Тугулган кун'),
          value: this.citizen.birth_date
        },
        {
          name: this.$t('Aддресс'),
          value: this.citizen.address
        },
        {
          name: this.$t('ЖШШИР'),
          value: this.citizen.tin
        },
        {
          name: this.$t('Вилоят'),
          value: this.citizen.region.name_uz
        },
        {
          name: this.$t('Ҳудуд'),
          value: this.citizen.city.name_uz
        },
        {
          name: this.$t('Kasallik turi'),
          value: this.citizen.diseases.name
        },
        {
          name: this.$t('Телефон рақами'),
          value:this.citizen.phone
        }
      ]
    }
  },
  mounted() {
    this.fetchCitizen(this.$route.params.id).then((res) => {
      this.loadingform = false
    })
  },
  methods: {
    ...mapActions({ fetchCitizen: 'citizen/show' })
  }
}
</script>
