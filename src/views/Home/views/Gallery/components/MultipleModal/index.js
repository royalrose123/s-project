import React from 'react'
import { hot } from 'react-hot-loader/root'
import PropTypes from 'prop-types'

// Components
import MultipleModalForm from './components/MultipleModalForm'
import MultipleModalFormik from './components/MultipleModalFormik'

// Lib MISC
import { ACTION_TYPES } from '../../constants/actionTypes'

// Style
// import getStyle from './style'

// PropTypes
export const propTypes = {
  showActionFooter: PropTypes.string,
}

// DefaultProps
export const defaultProps = {}
function MultipleModal(props) {
  const { showActionFooter } = props

  const isMultipleMove = showActionFooter === ACTION_TYPES.MOVE

  return (
    <MultipleModalFormik title={isMultipleMove ? 'Move Multiple Assets' : 'Edit Multiple Assets'} isMultipleMove={isMultipleMove} {...props}>
      <MultipleModalForm isMultipleMove={isMultipleMove} {...props} />
    </MultipleModalFormik>
  )
}

MultipleModal.propTypes = propTypes
MultipleModal.defaultProps = defaultProps

export default hot(MultipleModal)
