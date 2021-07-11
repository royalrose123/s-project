import getInitialValues from '../../sharedMethods/getInitialValues'

export default (props, assetInfo, ctaOptions) => {
  return {
    initialValues: getInitialValues(assetInfo, ctaOptions),
  }
}
