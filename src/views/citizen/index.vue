<template>
    <div class="container" >
      <h4 class="font-weight-bold pt-2  ">{{ title }}</h4>
      <div v-loading="!loaded" class="bg-white box-shadow p-4">
        <el-button
            type="warning"
            class="float-right ml-2 mb-4 font-weight-bold"
            icon="el-icon-download"
            :loading="isLoading"
            @click="exportToXlsx()"
        >{{ $t('Юклаб олиш') }}
        </el-button>
        <template>
          <router-link :to="{name: 'CitizensCreate', query: { type: $route.query.type } }">
            <el-button type="success" class="float-right mb-4  font-weight-bold" icon="el-icon-plus">{{ $t('Aъзо қўшиш') }}
            </el-button>
          </router-link>
        </template>

      <el-table v-if="loaded" class="mb-1 mx-auto table-custom" :data="citizens" border >
          <el-table-column label="№" width="50" type="index" :index="indexMethod" fixed />

          <el-table-column width="120">
            <template slot="header">
              <p>{{ $t('Фамиля') }}</p>
              <input v-model="filter.last_name" class="form-control form-control-sm w-100" @keyup.enter="sendFilter">
            </template>
            <template slot-scope="scope">
              <router-link :to="{ name:'CitizensShow', params:{id: scope.row.id}, query: {type: $route.query.type } }">
                {{ scope.row.last_name }}
              </router-link>
            </template>
          </el-table-column>

          <el-table-column :width="125">
            <template slot="header">
              <p>{{ $t('Исм') }}</p>
              <input v-model="filter.first_name" class="form-control form-control-sm w-100" @keyup.enter="sendFilter">
            </template>
            <template slot-scope="scope">
              {{ scope.row.first_name }}
            </template>
          </el-table-column>


          <el-table-column prop="passport" :width="120">
            <template slot="header">
              <p>{{ $t('Паспорт') }}</p>
              <input v-model="filter.passport" class="form-control form-control-sm w-100" @keyup.enter="sendFilter">
            </template>
          </el-table-column>

          <el-table-column prop="tin" :width="120">
            <template slot="header">
              <p>{{ $t('JSHSHR') }}</p>
              <input v-model="filter.tin" class="form-control form-control-sm w-100" @keyup.enter="sendFilter">
            </template>
          </el-table-column>

          <el-table-column prop="birth_date" :width="120">
            <template slot="header">
              <p>{{ $t('Tug`ilgan sana') }}</p>
              <input v-model="filter.birth_date" class="form-control form-control-sm w-100" @keyup.enter="sendFilter">
            </template>
          </el-table-column>

          <el-table-column  label="" :width="130" prop="region">
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

          <el-table-column :width="145" prop="city">
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

          <el-table-column width="199" prop="disease">
            <template slot="header">
              <p>{{ $t('Kasallik turi') }}</p>
              <select v-model="filter.diseases_id"  style="height: 28px" @change="sendFilter">
                <option :value="null">{{ $t('Барчаси') }}</option>
                <template>
                  <option v-for="disease in diseases" :value="disease.id" @keyup="sendFilter">{{ $t(disease.name) }}  </option>
                </template>
              </select>
            </template>
            <template slot-scope="scope">
              <p>{{ scope.row.diseases.name}}</p>
            </template>
          </el-table-column>

          <el-table-column :width="120">
            <template slot="header">
              <el-button class="mt-3" type="primary" size="mini" @click="sendFilter()">{{ $t('Қидириш') }}</el-button>
            </template>
            <template slot-scope="scope">
              <router-link :to="{ name:'CitizensEdit', params:{id: scope.row.id} }">
                <el-button size="mini" type="info">{{ $t('Таҳрирлаш') }}</el-button>
              </router-link>
              <el-button size="mini" class="m-1" type="danger" @click="deleteCitizen(scope.row.id)">{{ $t('Ўчириш') }}
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination
            background
            :total="filter.total"
            :page-size="1 * filter.limit"
            layout="prev, pager, next"
            class="mt-3"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { parseTime } from '@/utils/'
import { toXlsx } from '@/utils/exports'
import Swal from 'sweetalert2'

export default {
  name: 'CitizenIndex',
  data() {
    return {
      filter: {
        last_name: '',
        first_name: '',
        patronymic: '',
        region_id: null,
        city_id: null,
        diseases_id: null,
        passport: '',
        tin: null,
        limit: 30,
        page: 0,
        total: null
      },
      fullPage: true,
      loaded: false,
      columns: [
        {
          label: this.$t('ФИО'),
          field: 'full_name'
        },
        {
          label: this.$t('Паспорт'),
          field: 'passport'
        },
        {
          label: this.$t('ЖШШИР'),
          field: 'tin'
        },
        {
          label: this.$t('Телефон рақами'),
          field: 'phone'
        },
        {
          label: this.$t('Тугулган кун'),
          field: 'birth_date'
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
          label: this.$t('Aддресс'),
          field: 'address'
        },
        {
          label: this.$t('Kasallik turi'),
          field: 'diseases'
        }
      ],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      citizens: 'citizen/GET_CITIZENS',
      citizens_pagination: 'citizen/GET_CITIZENS_PAGINATION',
      user: 'auth/USER',
      regions: 'resource/GET_REGIONS',
      cities: 'resource/GET_CITIES',
      diseases: 'resource/GET_DISEASES'
    }),
    title() {
      return this.$t('Фуқаролар рўйхати')
    },
    currentYear() {
      return String(new Date().getFullYear())
    },
    years() {
      var years = []
      for (var i = 1991; i <= this.currentYear; i++) {
        years.push(i)
      }
      return years
    }
  },
  mounted() {
    this.getRegions()
    this.getDiseases()
    this.sendFilter()

  },
  methods: {
    ...mapActions({
      fetchCitizens: 'citizen/index',
      indexFull: 'citizen/indexFull',
      fetchCities: 'resource/cities',
      fetchRegions: 'resource/regions',
      fetchDiseases: 'resource/diseases',
      deleteCitizenAction: 'citizen/delete'
    }),
    getTime(date) {
      return parseTime(date)
    },
    handleCurrentChange(val) {
      this.filter.page = val
      this.sendFilter()
    },

    getRegions() {
      this.fetchRegions()
    },
    getDiseases() {
      this.fetchDiseases()
    },
    sendFilter() {
      this.loaded = false
      this.fetchCitizens(this.filter).then((res) => {
        this.loaded = true
        this.filter.limit = res.result.citizens.per_page
        this.filter.page = res.result.citizens.current_page
        this.filter.total = res.result.citizens.total
      })
    },
    sendFilterRegion() {
      if (this.user.role_id === 1) {
        this.fetchCities({ region_id: this.filter.region_id }).then((res) => {
          this.sendFilter()
          this.filter.city_id = null
        })
      }
    },
    indexMethod(index) {
      return (this.filter.page - 1) * 30 + index + 1
      // return index + 1
    },
    deleteCitizen(id) {
      if (confirm(this.$t('Ҳақиқатан ҳам ушбу маълумотни ўчирмоқчимисиз?'))) {
        this.deleteCitizenAction(id).then((res) => {
          Swal.fire({
            title: this.$t('Муваффақиятли ўчирилди!'),
            type: 'success',
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
            this.exportFormat(data.result.citizens),
        this.$t('Aҳоли рўйхати'),
            this.columns,
        )
      })
    },

    exportFormat(data) {
      if (data && data.length) {
        const arr = []
            data.forEach(row => {
          arr.push({
            tin: row.tin,
            full_name: [row.last_name, row.first_name, row.patronymic].join(' '),
            passport: row.passport,
            phone: row.phone,
            birth_date: row.birth_date,
            diseases: row.diseases.name,
            region: row.region.name_uz,
            city: row.city.name_uz,
            address: row.address
          })
        })
        return arr
      }
      return []
    }
  }
}
</script>
