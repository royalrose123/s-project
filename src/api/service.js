import axios from 'axios'
import flow from 'lodash/fp/flow'
import omitBy from 'lodash/fp/omitBy'
import mapValues from 'lodash/fp/mapValues'
import isUndefined from 'lodash/fp/isUndefined'
import isPlainObject from 'lodash/fp/isPlainObject'

import toCaseKeys, { CASES } from 'utils/to-case-keys'
import toPredicateValues from 'utils/to-predicate-values'

export const defaultNormalizer = response => response

class Service {
  constructor() {
    this.config = {}
    this.name = 'SERVICE_NAME'
  }

  static normalizeList(list, normalizer) {
    return [...(list || [])].map(item => normalizer(item))
  }

  static normalizePayloadWithPagination({ count, list, page, pagingIndex, pagingSize, requestDate }, normalizer) {
    return {
      count,
      list: this.normalizeList(list, normalizer),
      page,
      pagingIndex,
      pagingSize,
      requestDateTime: requestDate,
    }
  }

  getAccessToken() {
    if (this.currentEnv === 'local') return 'royal.chen@cloud-interactive.com'

    return window.localStorage.getItem('ACCESS_TOKEN')
  }

  removeAccessToken() {
    return window.localStorage.removeItem('ACCESS_TOKEN')
  }

  showLogger(action, response) {
    const responseStyle = 'font-weight: bold; color: #B5B5B5;'

    console.groupCollapsed(`api status: ${action}`)

    console.log('%c response', responseStyle, response)

    console.groupEnd()
  }

  getOption() {
    return {
      toResponseCase: CASES.CAMEL,
      toRequestCase: CASES.SNAKE,
    }
  }

  getApiConfig() {
    return { baseURL: process.env[`API_${this.currentEnv.toUpperCase()}_URL`] }
  }

  getAxiosInstance() {
    const apiConfig = this.withAccessToken
      ? Object.assign(this.getApiConfig(), {
          headers: { Authorization: `okta ${this.getAccessToken()}` },
        })
      : this.apiConfig

    return axios.create(apiConfig)
  }

  getRequestConfig() {
    const { params, data, ...restConfig } = this.config
    const requestConfig = restConfig

    if (isPlainObject(params)) {
      requestConfig.params = this.handleParameter(params)
    }

    if (isPlainObject(data)) {
      requestConfig.data = this.handleParameter(data)
    }

    if (isPlainObject(requestConfig.headers) && requestConfig.headers['content-type'] === 'multipart/form-data') {
      const data = new FormData()

      Object.entries(requestConfig.data).forEach(([key, value]) => {
        Array.isArray(value) ? value.forEach(value => data.append(key, value)) : data.append(key, value)
      })
      requestConfig.data = data
    }

    return requestConfig
  }

  getErrorMessage(response) {
    const { status } = response

    const messages = this.withAccessToken
      ? {
          400: 'Parameters error.',
          401: 'Access token is expired.',
          403: 'No access, please ask for administrator.',
          404: 'Can not found the data.',
          422: 'Time is overlapping.',
        }
      : {
          400: 'Parameters error.',
          401: 'Password error, please confirm and retry.',
          403: 'No access, please ask for administrator.',
          404: 'Account is not existed, please confirm and retry.',
        }

    return `${status} ${messages[status]}` || `${status} Unhandled Error!`
  }

  debug(reason) {
    const { url } = this.config
    const { message } = reason

    console.warn(`${url} \n - status: ${reason?.status ?? reason.returnCode} \n - message: ${message}\n\n`, reason)
  }

  handleUnauthenticated(reason) {
    const { status } = reason

    if (status === 401) {
      this.removeAccessToken()
    }
  }

  handleParameter(parameter) {
    const objectComparator = value => isPlainObject(value) || Array.isArray(value)
    const denormalizedParameter = this.denormalizer(parameter)

    const casedParameter = toCaseKeys(denormalizedParameter, this.getOption().toRequestCase, { objectComparator })

    const predicator = object =>
      Array.isArray(object)
        ? object.filter(value => !isUndefined(value))
        : flow(
            omitBy(isUndefined),
            mapValues(value => (typeof value === 'string' ? value.trim() : value)),
          )(object)

    const predicatedParameter = toPredicateValues(casedParameter, predicator, {
      objectComparator,
    })

    return { ...predicatedParameter, timestamp: new Date().getTime() }
  }

  handleResponse(response) {
    const isResponseError = response instanceof Error

    if (isResponseError) return this.handleFailure(response)

    const casedData = toCaseKeys(response.data, this.getOption().toResponseCase)
    const isBlobData = response.data instanceof Blob

    const { returnCode, returnMessage, returnDetail } = casedData

    const isRequestSuccess = returnCode === '0000'

    if (isRequestSuccess) {
      return this.handleSuccess(casedData.data)
    }

    if (isBlobData) {
      return this.handleBlobSuccess(response)
    }

    return this.handleFailure({
      returnCode,
      returnMessage,
      returnDetail,
    })
  }

  showSuccessLogger(data) {
    this.showLogger(`${this.name}_SUCCESS`, data)

    return data
  }

  handleSuccess(casedData) {
    const normalizedData = this.normalizer(casedData)

    const predicator = object => (Array.isArray(object) ? object.filter(value => !isUndefined(value)) : flow(omitBy(isUndefined))(object))

    const predicatedData = toPredicateValues(normalizedData, predicator)

    this.showSuccessLogger(predicatedData)

    return predicatedData
  }

  handleBlobSuccess(blobData) {
    this.showSuccessLogger(blobData)

    return blobData
  }

  handleFailure(error) {
    this.showLogger(`${this.name}_FAILURE`, error)

    let reason = null
    let message = ''

    // if access token expired, clear localStorage and refresh
    const accessTokenErrorCode = 403

    if (error.response?.status === accessTokenErrorCode) {
      window.localStorage.clear()
      window.location.reload()
    }

    const hasError = (error.returnCode && !error.response) || (!error.returnCode && error.response)

    if (hasError) {
      const { response, returnCode, returnMessage } = error

      message = !returnCode ? this.getErrorMessage(response) : `${returnCode} ${returnMessage}`

      reason = {
        ...(response && { status: response.status }),
        ...(returnCode && { returnCode }),
        message,
      }

      this.debug(reason)
      this.handleUnauthenticated(reason)
    } else {
      message = 'Network Error!'
      reason = error
    }

    return { isResponseError: true, message, detail: error.returnDetail, reason }
  }

  callApi() {
    const axiosInstance = this.getAxiosInstance()
    const requestConfig = this.getRequestConfig()

    this.showLogger(`${this.name}_REQUEST`)

    return axiosInstance(requestConfig)
      .then(response => this.handleResponse(response))
      .catch(error => this.handleFailure(error))
  }
}

Service.prototype.currentEnv = process.env.NODE_ENV
Service.prototype.normalizer = defaultNormalizer
Service.prototype.denormalizer = defaultNormalizer
Service.prototype.withAccessToken = true

export default Service

export function getCallApiFunction(ApiService) {
  return ApiService.callApi()
}
