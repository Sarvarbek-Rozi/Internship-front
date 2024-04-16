export const state = {
  application: {
    id: '',
    passport: '',
    tin: '',
    first_name: '',
    last_name: '',
    patronymic: '',
    birth_date: '',
    region_id: '',
    city_id: '',
    number: '',
    code: '',
    type: '',
    address: '',
    diseases_id: '',
    phone: '',
    region: {},
    city: {},
    disease: {}
  },
  applications: {
    data: [],
    pagination: {}
  },
  regions: [],
  cities: [],
  phone: '',
  data: [],
  diseases: [],
}
