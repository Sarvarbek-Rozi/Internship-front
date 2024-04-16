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
          <el-col :span="6">
            <el-form-item :label="$t('Ism/Familiya')" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('Email')" prop="email">
              <el-input v-model="form.email" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('Parol')" prop="password">
              <el-input v-model="form.password"/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
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
            <el-form-item :label="$t('Kasallik turi')" prop="disease_id">
              <el-select v-model="form.disease_id" class="w-100" filterable>
                <el-option v-for="disease in diseases" :key="disease.id" :label="disease.name" :value="disease.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('Tarif')" prop="description">
              <el-input v-model="form.description"  />
            </el-form-item>
          </el-col>
        </el-row>
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
      loadingform: false,
      is_disable: false,
      is_disableConfirm: false,
      rules: {
        name: [
          { required: true, message: this.$t('Исм киритилмаган'), trigger: 'change' }
        ],
       email: [
          { required: true, message: this.$t('Email киритилмаган'), trigger: 'change' }
        ],
        password: [
          { required: true, message: this.$t('Parol киритилмаган'), trigger: 'change' }
        ],
        region_id: [
          { required: true, message: this.$t('Xudud киритилмаган'), trigger: 'change' }
        ],
        city_id: [
          { required: true, message: this.$t('Tuman киритилмаган'), trigger: 'change' }
        ],
        disease_id: [
          { required: true, message: this.$t('Kasallik turi киритилмаган'), trigger: 'change' }
        ],
        description: [
          { required: true, message: this.$t('Tarif киритилмаган'), trigger: 'change' }
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
    source() {
      return this.form.source
    }
  },
  mounted() {
    this.fetchRegions()
    this.fetchCities()
    this.fetchDiseases()

  },
  methods: {
    ...mapActions({
      fetchCities: 'resource/cities',
      fetchRegions: 'resource/regions',
      fetchDiseases: 'resource/diseases',

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
        this.form.city_id = null
      })
    },

  }

}
</script>
