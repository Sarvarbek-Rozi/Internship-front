<template>
  <el-form
    ref="personal-form"
    label-position="top"
    class="top-label-custom"
    :rules="rules"
    :model="form"
  >
    <div>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('Фамилия')" prop="last_name">
            <el-input v-model="form.last_name" disabled />

          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Исм')" prop="first_name">
            <el-input v-model="form.first_name"  disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Отасининг исми')" prop="patronymic">
            <el-input v-model="form.patronymic" disabled/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Паспорт')" prop="passport">
            <el-input
                v-model="form.passport"
                placeholder="XX 000 00 00"
                disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('ЖШШИР')" prop="tin">
            <el-input
                v-model="form.tin"
                disabled
              />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item type="date" :label="$t('Туғилган санаси')" prop="birth_date">
            <el-input
                ref="birth_date"
                v-model="form.birth_date"
                v-loading="loading === 'birth_date'"
                placeholder="01.01.2019"
                disabled
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Xudud')" prop="region_id">
            <el-select v-model="form.region_id" class="w-100" filterable @change="sendFilterRegion" >
              <el-option v-for="region in regions" :key="region.id" :label="region.name_uz" :value="region.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Tuman')" prop="city_id">
            <el-select v-model="form.city_id" class="w-100">
              <el-option v-for="city in cities" :key="city.id" :label="city.name_uz" :value="city.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Телефон рақами')" prop="phone">
            <el-input v-model="form.phone"  class="el-input" placeholder="Шахсий мобил рақамингизни киритинг">
              <template slot="prepend">+998</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Kasallik turi')" prop="diseases_id">
            <el-select v-model="form.diseases_id" class="w-100" filterable @change="sendFilterDiseases">
              <el-option v-for="disease in diseases" :key="disease.id" :label="disease.name" :value="disease.id" disabled />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Aддресс')" prop="address">
            <el-input v-model="form.address" />
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PersonalDetial',
  props: {
    form: {
      type: Object,
      default() {
        return { }
      }
    }
  },
  data() {
    return {
      loading: '',
      is_disable: true,
      active: 0,
      rules: {
        passport: [
          { required: true, message: this.$t('Паспорт киритилмаган'), trigger: 'change' }
        ],
        birth_date: [
          { required: true, message: this.$t('Туғилган сана киритилмаган'), trigger: 'change' }
        ],
        first_name: [
          { required: true, message: this.$t('Исм киритилмаган'), trigger: 'change' }
        ],
        last_name: [
          { required: true, message: this.$t('Фамилия киритилмаган'), trigger: 'change' }
        ],
        patronymic: [
          { required: true, message: this.$t('Отасининг исми киритилмаган'), trigger: 'change' }
        ],
        address: [
          { required: true, message: this.$t('Aдрес киритилмаган'), trigger: 'change' }
        ],
        tin: [
          { required: true, message: this.$t('ЖШШИР киритилмаган'),  trigger: 'change' }
        ],
        diseases_id: [
          { required: true, message: this.$t('Kasallik turi киритилмаган'), trigger: 'change' }
        ],
        phone: [
          { required: true, message: this.$t('Телефон рақам киритилмаган'), trigger: 'change' }
        ]
      },
      validated: false,
      birth_date_disabled: true,
      delaying: false
    }
  },
  computed: {
    ...mapGetters({
      regions: 'resource/GET_REGIONS',
      cities:'resource/GET_CITIES',
      diseases:'resource/GET_DISEASES',
      users:'resource/GET_USERS',
      doctors:'doctor/GET_DOCTORS'
    }),
    source() {
      return this.form.source
    }
  },
  mounted() {
    this.fetchRegions()
    this.fetchCities()
    this.fetchDiseases()
    this.fetchUsers()
    this.fetchDoctors()
  },
  methods: {
    ...mapActions({
      fetchCities: 'resource/cities',
      fetchRegions: 'resource/regions',
      fetchDiseases: 'resource/diseases',
      fetchUsers:'resource/users',
      fetchDoctors:'doctor/index',

    }),
    validate() {
      this.validateForm()
      return this.validated
    },
    validateForm() {
      this.$refs['personal-form'].validate((valid) => {
        this.validated = valid
      })
    },

    sendFilterRegion() {
      this.fetchCities({ region_id: this.form.region_id }).then((res) => {
        console.log(this.region_id)
        this.form.city_id = null
      })
    },
    sendFilterDiseases(){
      this.fetchDiseases({diseases_id: this.doctors[1].disease_id}).then((res)=>{
      })
    },
  }
}
</script>
