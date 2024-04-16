<template>
  <div class="container">
    <router-link :to="{ name:'CitizensIndex', query: { type: $route.query.type } }">
      <el-button type="text" class="mb-1" icon="el-icon-arrow-left">{{ $t('Рўйҳатга қайтиш') }}</el-button>
    </router-link>
    <h4 class="font-weight-bold">{{ title }}</h4>
    <div class="bg-white box-shadow p-4" v-loading="!loaded">
      <div>
        <el-radio-group v-model="filter.status" @change="sendFilter">
          <el-radio-button :value="0" label="0">{{$t('Янги')}}</el-radio-button>
          <el-radio-button :value="1" label="1">{{$t('Тасдиқланган')}}</el-radio-button>
          <el-radio-button :value="2" label="2 ">{{$t('Рад етилган')}}</el-radio-button>
        </el-radio-group>
      </div>
      <el-table v-if="loaded" class="mb-1 mx-auto table-custom" :data="applications" border>
        <el-table-column label="№" width="45" type="index" :index="indexMethod" fixed/>
        <el-table-column width="160">
          <template slot="header">
            <p>{{ $t('Фамиляси') }}</p>
            <input v-model="filter.last_name" class="form-control form-control-sm w-100">
          </template>
          <template slot-scope="scope">
            <router-link :to="{ name:'ApplicationsShow', params:{id: scope.row.id}, query: {type:  $route.query.type } }">
              {{ scope.row.last_name }}
            </router-link>
          </template>
        </el-table-column>

        <el-table-column width="120">
          <template slot="header">
            <p>{{ $t('Исми') }}</p>
            <input v-model="filter.first_name" class="form-control form-control-sm w-100">
          </template>
          <template slot-scope="scope">
            {{ scope.row.first_name }}
          </template>
        </el-table-column>

        <el-table-column prop="passport" width="120">
          <template slot="header">
            <p>{{ $t('Паспорт') }}</p>
            <input v-model="filter.passport" class="form-control form-control-sm w-100">
          </template>
        </el-table-column>

        <el-table-column prop="tin" width="120">
          <template slot="header">
            <p>{{ $t('JSHSHR') }}</p>
            <input v-model="filter.tin" class="form-control form-control-sm w-100">
          </template>
        </el-table-column>
        <el-table-column label="" width="203" prop="region">
          <template slot="header">
            <p>{{ $t('Ҳудуд') }}</p>
            <select v-model="filter.region_id" class="w-170" style="height: 28px" @change="sendFilterRegion">
              <option :value="null">{{ $t('Барчаси') }}</option>
              <template>
                <option v-for="region in regions" :value="region.id" @keyup="sendFilter">{{ region.name_uz }}</option>
              </template>
            </select>
          </template>
          <template slot-scope="scope">
            <p>{{ (scope.row.region && scope.row.region.name_uz) ? scope.row.region.name_uz : '---' }}</p>
          </template>
        </el-table-column>

        <el-table-column width="146" prop="city">
          <template slot="header">
            <p>{{ $t('Туман(Шахар)') }}</p>
            <select v-model="filter.city_id" class="w-100" @change="sendFilter" style="height: 28px">
              <option :value="null">{{ $t('Барчаси') }}</option>
              <template>
                <option v-for="city in cities" :value="city.id" @keyup="sendFilter">{{ city.name_uz }}</option>
              </template>
            </select>
          </template>
          <template slot-scope="scope">
            <p>{{ (scope.row.city && scope.row.city.name_uz) ? scope.row.city.name_uz : '---' }}</p>
          </template>
        </el-table-column>

        <el-table-column label="" width="195" prop="disease">
          <template slot="header">
            <p>{{ $t('Kasallik turi') }}</p>
            <select v-model="filter.diseases_id" class="w-170" style="height: 28px" @change="sendFilter">
              <option :value="null">{{ $t('Барчаси') }}</option>
              <template>
                <option v-for="disease in diseases" :value="disease.id" @keyup="sendFilter">
                  {{disease.name}}
                </option>
              </template>
            </select>
          </template>
          <template slot-scope="scope">
            <p>{{(scope.row.diseases && scope.row.diseases.name) ? scope.row.diseases.name : '---'}}</p>
          </template>
        </el-table-column>


        <el-table-column width="140">
          <template slot="header">
            <el-button class="mt-3" type="primary" size="mini" @click="sendFilter()">{{ $t('Қидириш') }}</el-button>
          </template>
          <template  slot-scope="scope" v-if="filter.status == 0">
            <el-button size="mini" type="success" @click="updateStatus(scope.row.id,1)">{{ $t('Тасдиқлаш') }}</el-button>
            <el-button size="mini" class="m-1" type="danger" @click="showDialog(scope.row)">{{ $t('Рад этиш') }}
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <template slot="title"><h4>Рад этиш</h4></template>
        <div>
          <label for="deny_reason">Изоҳ</label>
          <el-input id="deny_reason" v-model="filter.deny_reason" />
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="dialogVisible = false">Бекор қилиш</el-button>
        <el-button type="danger" @click="updateStatus(form.id, 2)">Рад этиш</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {parseTime} from '@/utils/'
import {toXlsx} from '@/utils/exports'
import Swal from 'sweetalert2'

export default {
  name: 'ApplicationIndex',
  data() {
    return {
      form: {
        id: null,

      },
      filter: {
        last_name: '',
        first_name: '',
        patronymic: '',
        region_id: null,
        city_id: null,
        data_birth:null,
        diseases_id: null,
        status: 0,
        phone:'',
        passport: '',
        address:'',
        deny_reason: '',
        doctor_user_id:null,
        tin: null,
        limit: 0,
        page: 0,
        total: null
      },
      statuses: [
        { id: 0, name: 'Янги' },
        { id: 1, name: 'Тасдиқланган' },
        { id: 2, name: 'Рад етилган' },
      ],
      loaded: false,
      dialogVisible: false,
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
        }
      ],
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      applications: 'application/GET_APPLICATIONS',
      applications_pagination: 'application/GET_APPLICATIONS_PAGINATION',
      user: 'auth/USER',
      regions: 'resource/GET_REGIONS',
      cities: 'resource/GET_CITIES',
      diseases: 'resource/GET_DISEASES',
    }),
    title() {
      return this.$t('Фуқаролар рўйхати')
    },
  },
  mounted() {
    this.fetchRegions().then((res) => {
      this.sendFilter()
    })
    this.fetchCities()
    this.fetchDiseases().then((res) => {
      this.sendFilter()
    })
  },
  methods: {
    ...mapActions({
      fetchApplications: 'application/index',
      indexFull: 'application/indexFull',
      fetchCities: 'resource/cities',
      fetchRegions: 'resource/regions',
      fetchDiseases: 'resource/diseases',
      deleteApplicationAction: 'application/delete',
      updateStatusAction: 'application/updateStatusAction',
    }),
    updateStatus(application_id, status) {
      const msg = (status === 1) ? 'Ушбу аризани тасдиқлайсизми?' : 'Ушбу аризани рад этмоқчимисиз?'
      if (status === 2 && ( this.filter.deny_reason === '')) {
        this.$message.error('Майдонларни тўлдиринг')
        return false
      }
      if (status === 1) {
        this.$confirm(msg, 'Эътибор беринг', { confirmButtonText: 'Тасдиқлаш', cancelButtonText: 'Бекор қилиш', type: 'warning' }).then(() => {
          this.update(application_id, status)
        })
      } else {
        this.update(application_id, status)
      }
    },
    update(application_id, status) {
      this.updateStatusAction({ id: application_id, status, deny_reason:this.filter.deny_reason}).then((res) => {
        this.dialogVisible = false
        if (res.success) {
          Swal.fire({
            title: 'Маълумот сақланди!',
            type: 'success',
            timer: 1500,
            showConfirmButton: false,
            confirmButtonText: 'Давом этиш'
          }).then(() => {
            // this.getCount()
            this.sendFilter()
          })
        } else {
          Swal.fire({
            title: typeof res.error === 'string' ? res.error : 'ERROR',
            type: 'warning',
            timer: 2500,
            showConfirmButton: false,
            confirmButtonText: 'Давом этиш'
          })
        }
      })
    },
     showDialog(item) {
      this.item = item
      this.form.id = item.id
      this.dialogVisible = true
    },
    handleCurrentChange(val) {
      this.filter.limit = this.applications_pagination.limit
      this.filter.page = val
      this.sendFilter()
    },
    handleSizeChange(val) {
      this.filter.limit = val
      this.filter.page = this.applications_pagination.page
      this.sendFilter()
    },
    sendFilter() {
        this.filter.page = null
      this.loaded = false
      this.fetchApplications(this.filter).then((res) => {
        this.loaded = true
        this.filter.limit = this.applications_pagination.limit
        this.filter.page = this.applications_pagination.page
        this.filter.total = this.applications_pagination.total
      })
    },
    sendFilterRegion() {
        this.fetchCities({region_id: this.filter.region_id}).then((res) => {
          this.sendFilter()
          this.filter.city_id = null
        })
    },
    indexMethod(index) {
      return (this.applications_pagination.page - 1) * 50 + index + 1
    },
    deleteApplication(id) {
      if (confirm(this.$t('Ҳақиқатан ҳам ушбу маълумотни ўчирмоқчимисиз?'))) {
        this.deleteApplicationAction(id).then((res) => {
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
            this.exportFormat(data.result.citizens.data),
            this.$t('Aҳоли рўйхати'),
            this.columns,
        )
      })
    },
    ToReport() {

    },
    exportFormat(data) {
      if (data && data.length) {
        let arr = []
        data.forEach(row => {
          arr.push({
            tin: row.tin,
            full_name: [row.last_name, row.first_name, row.fathers_name].join(' '),
            passport: row.passport
          })
        })
        return arr
      }
      return []
    }
  }
}
</script>
