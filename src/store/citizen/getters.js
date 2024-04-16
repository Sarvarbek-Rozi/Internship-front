
export const getters = {
  GET_CITIZEN: (state) => state.citizen,
  GET_CITIZENS: (state) => state.citizens.data,
  GET_CITIZENS_PAGINATION: (state) => state.citizens.pagination,
  FULL_NAME: (state) => state.citizen.first_name + ' ' + state.citizen.last_name + ' ' + state.citizen.fathers_name,

}
