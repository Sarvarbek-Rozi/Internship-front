
export const getters = {
  GET_DOCTOR: (state) => state.doctor,
  GET_DOCTORS: (state) => state.doctors.data,
  GET_DOCTORS_PAGINATION: (state) => state.doctors.pagination,
  FULL_NAME: (state) => state.doctor.name,
}
