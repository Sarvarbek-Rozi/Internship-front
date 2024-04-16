export const mutations = {
  SET_DOCTOR: (state, doctor) => {
    state.doctor.id = doctor.id
    state.doctor.role_id = doctor.role_id
    state.doctor.name = doctor.user.name
    state.doctor.email = doctor.user.email
    state.doctor.password = doctor.user.password
    state.doctor.region_id = doctor.region_id
    state.doctor.city = doctor.city
    state.doctor.description = doctor.description
    state.doctor.region = doctor.region
    state.doctor.disease = doctor.disease
    state.doctor.diseases_id = doctor.diseases_id
    state.doctor.city_id = doctor.city_id
  },
  SET_DOCTORS: (state, doctors) => {
    state.doctors.data = doctors.data
  }
}
