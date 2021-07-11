import Service, { getCallApiFunction } from '../../service'
import denormalizer from './denormalizer'
import normalizer from './normalizer'

const ORDER = {
  ASC: 'asc',
  DESC: 'desc',
}

class FetchMaterialListAPI extends Service {
  constructor({ categoryId, search, col, no, order, tags, page, pageSize }) {
    super()
    this.name = 'FETCH_MATERIAL_LIST_DATA'
    this.config = {
      url: `/library/materials`,
      method: 'GET',
      params: {
        categoryId,
        search,
        col,
        no,
        order: order || ORDER.DESC,
        tags,
        page,
        pageSize,
      },
      withCredentials: true,
    }
    this.denormalizer = denormalizer
    this.normalizer = normalizer
  }
}

export const fetchMaterialList = (...apiParams) => getCallApiFunction(new FetchMaterialListAPI(...apiParams))
