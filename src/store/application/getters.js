export const getters = {
  GET_APPLICATION: (state) => state.application,
  GET_APPLICATIONS: (state) => state.applications.data,
  GET_APPLICATIONS_PAGINATION: (state) => state.applications.pagination,
  FULL_NAME: (state) => state.application.first_name + ' ' + state.application.last_name + ' ' + state.application.patronymic,
  GET_PHONE: (state) => state.phone,
}
