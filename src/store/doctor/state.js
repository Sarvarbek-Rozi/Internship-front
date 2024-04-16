export const state = {
  doctor: {
    id: '',
    role_id: '',
    name: '',
    email: '',
    password: '',
    region_id: '',
    city_id: '',
    diseases_id: '',
    description: '',
    hospital_id:'',
    region: {},
    city: {},
    diseases:{},
    user:{}
  },
  doctors: {
    data: [],
    pagination: {},
  },
}
