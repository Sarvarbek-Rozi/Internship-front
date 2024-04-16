<template>
  <el-form
    ref="personal-form"
    v-loading="loadingform"
    label-position="top"
    class="top-label-custom"
    :model="form"
    :rules="rules"
  >
      <div>
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
            <el-button type="primary" icon="el-icon-check" :disabled="is_disable" @click="getPassport">{{ $t('Текшириш') }}</el-button>
          </el-col>
        </el-row>

        <div >
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
                <el-input v-model="form.patronymic"disabled />
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
            <el-col :span="6">
              <el-form-item :label="$t('Телефон рақами')" prop="phone">
                <el-input v-model="form.phone" v-mask="'#########'" class="el-input" placeholder="Шахсий мобил рақамингизни киритинг">
                  <template slot="prepend">+998</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('Kasallik turi')" prop="diseases_id">
                <el-select v-model="form.diseases_id" class="w-100" filterable>
                  <el-option v-for="disease in diseases" :key="disease.id" :label="disease.name" :value="disease.id" />
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
      </div>
  </el-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {cities} from "@/api/resource";

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
      active: 0,
      ispassport: false,
      loadingform: false,
      is_disable: false,
      is_disableConfirm: false,
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
          { required: true, message: this.$t('ЖШШИР киритилмаган'), trigger: 'change' }
        ],
        diseases_id: [
          { required: true, message: this.$t('Kasallik turi киритилмаган'), trigger: 'change' }
        ],
        phone: [
          { required: true, message: this.$t('Телефон рақам киритилмаган'), trigger: 'change' }
        ]
      },
      validated: true
    }
  },
  computed: {
    ...mapGetters({
      regions: 'resource/GET_REGIONS',
      cities:'resource/GET_CITIES',
      diseases:'resource/GET_DISEASES'
    }),
    isNumberFull() {
      return (this.form.passport.length >= 10)
    },
    source() {
      return this.form.source
    },

  },
  mounted() {
    this.fetchRegions()
    this.fetchCities()
    this.fetchDiseases()
  },
  watch: {
    'form.passport'(newVal) {
      this.form.passport = newVal.toUpperCase()
    }},
  methods: {
    ...mapActions({
      fetchCities: 'resource/cities',
      fetchRegions: 'resource/regions',
      fetchDiseases: 'resource/diseases',
      getPassportAction: 'citizen/getPassport',
      setForm: 'citizen/setForm',


    }),
    getPassport() {
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
        this.form.city_id = null
      })
    },
    clearForm() {
      this.form.first_name = null
      this.form.last_name = null
      this.form.fathers_name = null
      this.form.tin = ''
      this.form.passport = ''
      this.form.birth_date = ''
      this.form.address = ''
      this.form.social_areas_id = null
    },
  }

}
</script>
