import {diseases} from "@/api/resource";

export const mutations = {
  SET_CITIZEN: (state, citizen) => {
    state.citizen.id = citizen.id
    state.citizen.phone = citizen.phone
    state.citizen.passport = citizen.passport
    state.citizen.first_name = citizen.first_name
    state.citizen.last_name = citizen.last_name
    state.citizen.patronymic = citizen.patronymic
    state.citizen.birth_date = citizen.birth_date
    state.citizen.address = citizen.address
    state.citizen.tin = citizen.tin
    state.citizen.new_passport = citizen.new_passport
    state.citizen.region_id = citizen.region_id
    state.citizen.city = citizen.city
    state.citizen.region = citizen.region
    state.citizen.diseases = citizen.diseases
    state.citizen.city_id = citizen.city_id
    state.citizen.type = citizen.type
    state.citizen.diseases_id = citizen.diseases_id
  },
  SET_CITIZENS: (state, citizens) => {
    state.citizens.data = citizens.data
  },
}
