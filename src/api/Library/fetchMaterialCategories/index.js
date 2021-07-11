import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denormalizer'
// import normalizer from './normalizer'

class FetchMaterialCategoriesAPI extends Service {
  constructor() {
    super()
    this.name = 'FETCH_MATERIAL_CATEGORIES_DATA'
    this.config = {
      url: `/library/material/categories`,
      method: 'GET',
      params: {},
      withCredentials: true,
    }

    // this.denormalizer = denormalizer
    // this.normalizer = normalizer
  }
}

export const fetchMaterialCategories = (...apiParams) => getCallApiFunction(new FetchMaterialCategoriesAPI(...apiParams))
