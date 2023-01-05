import axios from 'axios';

const fetchUrl = 'https://frontend-take-home.fetchrewards.com/form'

export async function initData() {
  try {
    const response = await axios.get(fetchUrl);
    const stateInitials = response.data.states.map(state => state.abbreviation);
    return {
      occupations: response.data.occupations,
      stateInitials
    }
  } catch(e) {
      console.log(e)
    }
}

export async function submitData (formdata) {
  try {
    const response = await axios.post(fetchUrl, formdata);
    console.log(response);
    if (response.status === 201) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
    return false
  }
}