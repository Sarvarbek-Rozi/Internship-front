<template>
  <div>
    <el-form
        ref="personal-form"
        label-position="center"
        class="top-label-custom"
        :model="form"
        :rules="rules"
    >
      <el-row>
        <el-col :span="10">
          <el-form-item :label="$t('Паспорт')" prop="passport">
            <el-input
                ref="passport"
                v-model="form.passport"
                v-mask="'AA #######'"
                v-loading="loading === 'passport'"
                :value="form.passport"
                :class="{ 'full-input': isNumberFull }"
                suffix-icon="el-icon-check"
                type="text"
                maxlength="10 "
            />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item :label="$t('ЖШШИР')" prop="tin">
            <el-input
                maxlength="14"
                v-model="form.tin"
                v-mask="'##############'"

            />
          </el-form-item>
        </el-col>
        <el-col :span="3" style="margin-top: 29px;" class="d-flex justify-content-end mb-3" >
          <el-button type="primary" icon="el-icon-check" v-if="disable" @click="getPassport">{{ $t('Текшириш') }}</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-form-item :label="$t('Фамилия')" prop="last_name">
            <el-input v-model="form.last_name"  disabled  />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Исм')" prop="first_name">
            <el-input v-model="form.first_name" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Отасининг исми')" prop="patronymic">
            <el-input v-model="form.patronymic" disabled />
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item type="date" :label="$t('Туғилган санаси')" prop="birth_date">
            <el-input
                ref="birth_date"
                v-model="form.birth_date"
                v-loading="loading === 'birth_date'"
                placeholder="01.01.2019"
                v-mask="'##.##.####'"
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
<!--        <el-col :span="6">-->
<!--          <el-form-item :label="$t('Телефон рақами')" prop="phone">-->
<!--            <el-input v-model="form.phone" v-mask="'#########'" class="el-input"  >-->
<!--              <template slot="prepend">+998</template>-->
<!--            </el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
        <el-col :span="6">
          <el-form-item :label="$t('Kasallik turi')" prop="diseases_id">
            <el-select v-model="form.diseases_id" class="w-100" filterable @change="sendFilterDiseases">
              <el-option v-for="disease in diseases" :key="disease.id" :label="disease.name" :value="disease.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Doktorlar ro`yxati')" prop="doctor_user_id">
            <el-select v-model="form.doctor_user_id" class="w-100" filterable>
              <el-option v-for="doctor in doctors" :key="doctor.id" :label="doctor.user.name" :value="doctor.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item :label="$t('Aддресс')" prop="address">
            <el-input v-model="form.address" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import application.js from "../../../router/modules/application.js";

export default {
  name: 'PersonalDetial',
  props: {
    form: {
      type: Object,
      y_id: '',
      region_id: '',
      default() {
        return { }
      }
    }
  },

  data() {
    return {
      loading: '',
      active: 0,
      disable:true,
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
        fathers_name: [
          { required: true, message: this.$t('Отасининг исми киритилмаган'), trigger: 'change' }
        ],
        address: [
          { required: true, message: this.$t('Aдрес киритилмаган'), trigger: 'change' }
        ],
        tin: [
          { required: true, message: this.$t('ЖШШИР киритилмаган'), trigger: 'change' }
        ],
        social_areas_id: [
          { required: true, message: this.$t('Ижтимоий ҳолати киритилмаган'), trigger: 'change' }
        ],
        region_id: [
          { required: true, message: this.$t('Ҳудуд киритилмаган'), trigger: 'change' }
        ],
        city_id: [
          { required: true, message: this.$t('Туман (шаҳар) киритилмаган'), trigger: 'change' }
        ]
      },
      validated: true
    }
  },
  computed: {
    ...mapGetters({
      diseases: 'resource/GET_DISEASES',
      regions: 'resource/GET_REGIONS',
      cities: 'resource/GET_CITIES',
      doctors:'doctor/GET_DOCTORS',
      users:'resource/GET_USERS',
      applications_pagination: 'application/GET_APPLICATIONS_PAGINATION'
    }),
    isNumberFull() {
      return (this.form.passport.length >= 10)
    },
    isBirthDateFull() {
      return (this.form.birth_date && this.form.birth_date.length >= 10)
    },
    source() {
      return this.form.source
    }
  },
  mounted() {
    this.fetchDiseases()
    this.fetchRegions().then((res) => {
    })
  },
  watch: {
    'form.passport'(newVal) {
      this.form.passport = newVal.toUpperCase()
    },
    'form.region_id'(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.fetchCities({ region_id: newVal }).then((res) => {
          this.cities = res.result.cities
        })
      }
    }
  },
  methods: {
    ...mapActions({
      fetchDiseases: 'resource/diseases',
      fetchCities: 'resource/cities',
      fetchRegions: 'resource/regions',
      fetchDoctors:'doctor/index',
      fetchApplications: 'application/index',

    }),
    validateForm() {
      this.$refs['personal-form'].validate((valid) => {
        this.validated = valid
      })
    },sendFilterRegion() {
      this.fetchCities({ region_id: this.form.region_id }).then((res) => {
        this.form.city_id = null
      })
    },
    sendFilterDiseases(){
      this.fetchDoctors({disease_id: this.form.diseases_id}).then((res)=>{
        this.form.doctor_user_id = null
      })
    },
    getPassport() {
      this.disable=false
      this.loading = 'passport'
      const data = { passport: this.form.passport.replace(' ', ''), tin: this.form.tin }
      this.getPassportAction(data)
          .then(res => {
            if (res.result.citizen === undefined) {
              this.$message({
                message: this.$t('Маълмот топилмади'),
                type: 'warning',
                duration: 5 * 1000,
                offset: 80
              })
            } else {
              this.ispassport = true
              this.setForm({ form: this.form, citizen: res.result.citizen })
            }
            this.loading = ''
          })
          .catch(res => {
            this.birth_date_disabled = false
            this.loading = ''
            this.form.source = 2
            this.$refs.passport.focus()
          })
    },
    ...mapActions({
      getPassportAction: 'citizen/getPassport',
      setForm: 'citizen/setForm',
    })
  }
}
</script>
