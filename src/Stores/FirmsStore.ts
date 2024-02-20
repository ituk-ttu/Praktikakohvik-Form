import type { Firm, MapStatusAndFirms } from "@/Models/Firms"
import { ref } from 'vue'
const mapStatusAndFirms = ref<MapStatusAndFirms>()
const mapStatus = ref<boolean>()
const firms = ref<Firm[]>()
const currentFirm = ref<Firm>()
const urlApi = 'https://pkapi.onrender.com/api/'
const apiKey = ref('')

export default function useFirms() {
  const loadFirms = async () => {
    const response = await fetch(urlApi + 'firms')
    const data = await response.json()

    if (data) {
      return data
    }

    return [];
  }
  
  const load = async () => {
    mapStatusAndFirms.value = await loadFirms()
    mapStatus.value = mapStatusAndFirms.value?.displayMap
    firms.value = mapStatusAndFirms.value?.firms
  }

  const postFirm = async (newFirm: Firm) => {
    apiKey.value = newFirm.key
    const form = new FormData()
    form.append('Name', newFirm.name)
    form.append('Image', newFirm.image)
    form.append('ImageBackground', newFirm.imageBackground)
    form.append('ShortName', newFirm.shortName)
    form.append('EnglishDescription', newFirm.englishDescription)
    form.append('EstonianDescription', newFirm.estonianDescription)
    form.append('GridMapColumn', newFirm.gridMapColumn)
    form.append('GridMapRow', newFirm.gridMapRow)

    const headers = new Headers()
    headers.set('KEY', newFirm.key)

    const response = await fetch(urlApi + 'firms', {
      method: 'POST',
      headers,
      body: form
    })
    
    const data = await response.json();

    if (data) {
      if (response.status == 200)
      {
        currentFirm.value = data;
        await load()
      }
      else
      {
        return data.errors == undefined ? data : data.errors
      }
    }
  }

  const updateFirm = async (firm: Firm, id: string) => {
    apiKey.value = firm.key
    const form = new FormData()
    form.append('Name', firm.name)
    form.append('Image', firm.image)
    form.append('ImageBackground', firm.imageBackground)
    form.append('ShortName', firm.shortName)
    form.append('EnglishDescription', firm.englishDescription)
    form.append('EstonianDescription', firm.estonianDescription)
    form.append('GridMapColumn', firm.gridMapColumn)
    form.append('GridMapRow', firm.gridMapRow)

    const headers = new Headers()
    headers.set('KEY', firm.key)

    const response = await fetch(urlApi + 'firms/' + id, {
      method: 'PUT',
      headers,
      body: form
    })
    
    const data = await response.json()

    if (data) {
      if (response.status == 200)
      {
        currentFirm.value = data
        await load()
      }
      else
      {
        return data.errors == undefined ? data : data.errors
      }
    }
  }

  const deleteFirm = async (id: string, key: string) => {
    apiKey.value = key
    const headers = new Headers()
    headers.set('KEY', key)

    const response = await fetch(urlApi + 'firms/' + id, { method: 'DELETE', headers })
    const data = await response.json()

    if (data) {
      if (response.status == 200)
      {
        currentFirm.value = undefined
        firms.value = data
      }
      else
      {
        return data.errors == undefined ? data : data.errors
      }
    }
  }

  const updateMapStatus = async (status: boolean, key: string) => {
    const headers = new Headers()
    headers.set('KEY', key)

    const response = await fetch(urlApi + 'map/' + status, {
      method: 'PUT',
      headers,
    })

    if (response.status === 200) mapStatus.value = status
  }

  return { urlApi, apiKey, firms, currentFirm, load, postFirm, updateFirm, deleteFirm, mapStatus, updateMapStatus }
}
