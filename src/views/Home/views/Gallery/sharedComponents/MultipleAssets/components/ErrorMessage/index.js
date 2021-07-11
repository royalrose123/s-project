// Libs
import React from 'react'
import PropTypes from 'prop-types'

// Components

// Lib MISC

// Style
import getStyle from './style'

// variables

// PropTypes
export const propTypes = {
  errors: PropTypes.array,
}

const fieldTitle = {
  assetName: 'Asset Name',
  content: 'Running Date',
  countryCode: 'Country',
  assetLanguage: 'Language',
  message: 'Message',
  webUrl: 'URL',
  tags: 'Tags',
  assetPlatform: 'Platform',
  assetFormat: 'Placement',
  primaryText: 'Primary Text',
  headline: 'Headline',
  description: 'Description',
  caption: 'Caption',
  assetCta: 'CTA',
}

function ErrorMessage(props) {
  const { errors } = props
  const style = getStyle(props)

  return (
    <div css={style.errorMessageWrapper()}>
      {errors.map((item, index) => {
        const rowIndex = index + 1

        const errorArray = Object.entries(item)

        const newErrorArray = errorArray.map((item, index) => {
          const fieldName = item[0]
          // const fieldError = item[1]

          return `"${fieldTitle[fieldName]}"`
        })

        if (newErrorArray.length === 1) {
          return (
            <div key={index} css={style.errorMessageRow()}>
              <b>{`Asset Row # ${rowIndex}:`}</b>
              <span>{`${newErrorArray.join(', ')} is mandatory`}</span>
            </div>
          )
        } else {
          return (
            <div key={index} css={style.errorMessageRow()}>
              <b>{`Asset Row # ${rowIndex}:`}</b>
              <span>{`${newErrorArray.join(', ')} are mandatory`}</span>
            </div>
          )
        }
      })}
    </div>
  )
}

ErrorMessage.propTypes = propTypes

export default ErrorMessage
