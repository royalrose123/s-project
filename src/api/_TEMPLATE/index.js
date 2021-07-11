import Service, { getCallApiFunction } from '../../service'
// import denormalizer from './denomalizer'
// import normalizer from './normalizer'

class TemplateApi extends Service {
  constructor({ parametersOfFrontEndKey }) {
    super()
    this.name = 'TEMPLATE_NAME'
    this.config = {
      url: '/',
      method: 'GET',
      params: {
        parametersOfFrontEndKey,
      },
    }
  }
}

export const functionName = (...apiParams) => getCallApiFunction(new TemplateApi(...apiParams))
