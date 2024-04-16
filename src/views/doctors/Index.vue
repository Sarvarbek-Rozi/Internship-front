<template>
  <div class="container mt-2">
    <h4 class="font-weight-bold pt-2">{{ title }}</h4>
    <div v-loading="!loaded" class="bg-white box-shadow p-4">
      <el-button
          type="warning"
          class="float-right mb-4  ml-2 font-weight-bold"
          icon="el-icon-download"
          :loading="isLoading"
          @click="exportToXlsx()"
      >{{ $t('Юклаб олиш') }}
      </el-button>
      <template>
        <router-link :to="{name: 'DoctorsCreate', query: { type: $route.query.type } }">
          <el-button v-if="user.role_id===1" type="success" class="float-right mb-4 font-weight-bold" icon="el-icon-plus">{{ $t('Doktor qo`shish') }}
          </el-button>
        </router-link>
      </template>
      <el-table v-if="loaded" class="mb-1 mx-auto table-custom" :data="doctors" border>
        <el-table-column label="№" width="50" type="index" :index="indexMethod" fixed />
        <el-table-column>
          <template slot="header">
            <p>{{ $t('Ism/Familya') }}</p>
            <input v-model="filter.name" class="form-control form-control-sm w-100" @keyup.enter="sendFilter">
          </template>
          <template slot-scope="scope">
            <router-link :to="{ name:'DoctorShow', params:{id: scope.row.id}, query: {type: $route.query.type } }">

            {{scope.row.user.name}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <p>{{ $t('Email') }}</p>
            <input v-model="filter.email" class="form-control form-control-sm w-100" @keyup.enter="sendFilter">
          </template>
          <template slot-scope="scope">
              {{ scope.row.user.email }}
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <p>{{ $t('Parol') }}</p>
            <input v-model="filter.password" class="form-control form-control-sm w-100" @keyup.enter="sendFilter">
          </template>
          <template slot-scope="scope">
            {{ scope.row.user.password }}
          </template>
        </el-table-column>
        <el-table-column  label="" :width="155" prop="region">
          <template slot="header">
            <p>{{ $t('Ҳудуд') }}</p>
            <select v-model="filter.region_id" class="w-100" style="height: 28px" @change="sendFilterRegion">
              <option :value="null">{{ $t('Барчаси') }}</option>
              <template >
                <option v-for="region in regions" :value="region.id" @keyup="sendFilter">{{ $i18n.locale === 'ru' ? region.name_ru: $i18n.locale === 'uz' ? region.name_uz : region.name_cyrl }}</option>
              </template>
            </select>
          </template>
          <template slot-scope="scope">
            <p> {{ $i18n.locale === 'ru' ? scope.row.region.name_ru : $i18n.locale === 'uz' ? scope.row.region.name_uz : scope.row.region.name_cyrl }}</p>
          </template>
        </el-table-column>
        <el-table-column :width="165" prop="city">
          <template slot="header">
            <p>{{ $t('Туман(Шахар)') }}</p>
            <select v-model="filter.city_id" class="w-100" style="height: 28px" @change="sendFilter">
              <option :value="null">{{ $t('Барчаси') }}</option>
              <template>
                <option v-for="city in cities" :value="city.id" @keyup="sendFilter">{{ $i18n.locale === 'ru' ? city.name_ru: $i18n.locale === 'uz' ? city.name_uz : city.name_cyrl }}</option>
              </template>
            </select>
          </template>
          <template slot-scope="scope">
            <p> {{ $i18n.locale === 'ru' ? scope.row.city.name_ru : $i18n.locale === 'uz' ? scope.row.city.name_uz : scope.row.city.name_cyrl }}</p>
          </template>
        </el-table-column>


        <el-table-column :width="190" label=""  prop="disease">
          <template slot="header">
            <p>{{ $t('Kasallik turi') }}</p>
            <select v-model="filter.disease_id" class="w-170" style="height: 28px" @change="sendFilter">
              <option :value="null">{{ $t('Барчаси') }}</option>
              <template>
                <option v-for="disease in diseases" :value="disease.id" @keyup="sendFilter">{{disease.name}}  </option>
              </template>
            </select>
          </template>
          <template slot-scope="scope">
            <p>{{
                (scope.row.disease && scope.row.disease.name) ? $t(scope.row.disease.name) : '---'
              }}</p>
          </template>
        </el-table-column>


        <el-table-column>
          <template slot="header">
            <p>{{ $t('Tarif') }}</p>
            <input v-model="filter.description" class="form-control form-control-sm w-100" @keyup.enter="sendFilter">
          </template>
          <template slot-scope="scope">
              {{ scope.row.description }}
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <el-button class="mt-3" type="primary" size="mini" @click="sendFilter()">{{ $t('Қидириш') }}</el-button>
          </template>
          <template  slot-scope="scope">
            <router-link :to="{ name:'DoctorsEdit', params:{id: scope.row.id} }">
                          <el-button size="mini" type="info">{{ $t('Таҳрирлаш') }}</el-button>
            </router-link>
            <el-button size="mini" class="m-1" type="danger" @click="deleteCitizen(scope.row.id)">{{ $t('Ўчириш') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      <el-pagination-->
<!--          background-->
<!--          :total="filter.total"-->
<!--          :page-size="1 * filter.limit"-->
<!--          layout="prev, pager, next"-->
<!--          class="mt-3"-->
<!--          @current-change="handleCurrentChange"-->
<!--      />-->
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { parseTime } from '@/utils/'
import { toXlsx } from '@/utils/exports'
import Swal from 'sweetalert2'

export default {
  name: 'DoctorsIndex',
  data() {
    return {
      filter: {
        role_id:null,
        name: '',
        email:'',
        region_id: null,
        city_id: null,
        disease_id:null,
        hospital_id: null,
        description:'',
        limit: 30,
        page: 0,
        total: null
      },
      fullPage: true,
      loaded: false,
      columns: [
        {
          label: this.$t('Ism Familiya'),
          field: 'name'
        },
        {
          label: this.$t('Email'),
          field: 'email'
        },
        {
          label: this.$t('Password'),
          field: 'password'
        },
        {
          label: this.$t('Вилоят'),
          field: 'region'
        },
        {
          label: this.$t('Ҳудуд'),
          field: 'city'
        },
        {
          label: this.$t('Kasallik turi'),
          field: 'disease'
        },
        {
          label: this.$t('Doktor tarifi'),
          field: 'description'
        },
      ],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      doctors: 'doctor/GET_DOCTORS',
      doctors_pagination: 'doctor/GET_DOCTORS_PAGINATION',
      user: 'auth/USER',
      regions: 'resource/GET_REGIONS',
      cities: 'resource/GET_CITIES',
      diseases: 'resource/GET_DISEASES'
    }),
    title() {
      return this.$t('Doktorlar ro`yxati')
    },

  },
  mounted() {
    this.getRegions()
    this.getDiseases()
    this.getUsers()
    this.sendFilter()
  },

  methods: {
    ...mapActions({
      fetchDoctors: 'doctor/index',
      fetchCities: 'resource/cities',
      fetchRegions: 'resource/regions',
      fetchDiseases: 'resource/diseases',
      fetchUsers:'resource/users',
      deleteDoctorAction: 'doctor/delete',
      indexFull: 'doctor/indexFull',


    }),
    handleCurrentChange(val) {
      this.filter.page = val
      this.sendFilter()
    },
    getRegions() {
      this.fetchRegions()
    },
    getDiseases(){
      this.fetchDiseases()
    },
    getUsers(){
      this.fetchUsers()
    },
    sendFilter() {
      this.loaded = false
      this.fetchDoctors(this.filter).then((res) => {
        this.loaded = true
        this.filter.limit = res.result.doctors.per_page
        this.filter.page = res.result.doctors.current_page
        this.filter.total = res.result.doctors.total
      })
    },
    sendFilterRegion() {
        this.fetchCities({ region_id: this.filter.region_id }).then((res) => {
          this.sendFilter()
          this.filter.city_id = null
        })
    },
    indexMethod(index) {
      return (this.filter.page - 1) * 10 + index + 1
      // return index + 1
    },
    deleteCitizen(id) {
      if (confirm(this.$t('Ҳақиқатан ҳам ушбу маълумотни ўчирмоқчимисиз?'))) {
        this.deleteDoctorAction(id).then((res) => {
          Swal.fire({
            title: this.$t('Муваффақиятли ўчирилди!'),
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            confirmButtonText: 'Давом этиш'
          }).finally(() => {
            this.sendFilter()
          })
        })
      }
    },
    exportToXlsx() {
      this.isLoading = true
      this.filter['getAll'] = 1
      this.indexFull(this.filter).then(data => {
        this.isLoading = false
        toXlsx(
            this.exportFormat(data.result.doctors),
            this.$t('Doktorlar ro`yxati'),
            this.columns,
        )
      })
    },
    exportFormat(data) {
      if (data && data.length) {
        const arr = []
        data.forEach(row => {
          arr.push({
            name: row.user.name,
            email: row.user.email,
            password: row.user.password,
            region: row.region.name_uz,
            city: row.city.name_uz,
            disease: row.disease.name,
            description: row.description,
          })
        })
        return arr
      }
      return []
    }
  }
}
</script>
