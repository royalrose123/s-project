import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denormalizer'

class UpdateMaterialClickApi extends Service {
  constructor({ materialId }) {
    super()
    this.name = 'UPDATE_MATERIAL_CLICK'
    this.config = {
      url: `/library/material/click/${materialId}`,
      method: 'PATCH',
      data: {},
    }

    // this.denormalizer = denormalizer
  }
}

export const updateMaterialClick = (...apiParams) => getCallApiFunction(new UpdateMaterialClickApi(...apiParams))
