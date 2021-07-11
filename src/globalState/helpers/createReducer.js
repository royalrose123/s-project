export function createReducer(initialState, handlers) {
  return function(state = initialState, action) {
    if (action && Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
