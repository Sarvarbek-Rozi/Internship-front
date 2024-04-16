<template>
  <div class="container">
    <router-link :to="{ name:'ApplicationsIndex', query: { type: $route.query.type } }">
      <el-button type="text" class="mb-1" icon="el-icon-arrow-left">{{ $t('Рўйҳатга қайтиш') }}</el-button>
    </router-link>
    <div class="bg-white box-shadow p-4">
      <el-table class="table-custom"  :data="formdata" border>
        <el-table-column :label="$t('Номи')" prop="name" width="300" class="font-weight-bold"/>
        <el-table-column prop="value" :label="$t('Қиймати')"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ApplicationShow',
  computed: {
    ...mapGetters({ application: 'application/GET_APPLICATION' }),
    formdata() {
      return [
        {
          name: this.$t('ФИО'),
          value: [this.application.first_name, this.application.last_name, this.application.patronymic].join(' ')
        },
        {
          name: this.$t('Паспорт'),
          value: this.application.passport
        },
        {
          name: this.$t('Тугулган куни'),
          value: this.application.birth_date
        },
        {
          name: this.$t('Aддрес'),
          value: this.application.address
        },
        {
          name: this.$t('ЖШШИР'),
          value: this.application.tin
        },
        {
          name: this.$t('телефон рақами'),
          value: this.application.phone
        },
        {
          name: this.$t('Вилоят'),
          value: this.application.region.name_uz
        },
        {
          name: this.$t('Ҳудуд'),
          value: this.application.city.name_uz
        },
        {  // refresh berganda xatolik beryabdi
          name: this.$t('Kasallik turi'),
          value: this.application.diseases.name
        }
      ]
    }
  },
  mounted() {
    this.fetchApplication(this.$route.params.id)
  },
  methods: {
    ...mapActions({ fetchApplication: 'application/show' })
  }
}
</script>
