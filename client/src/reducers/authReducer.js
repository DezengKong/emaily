import { FETCH_USER } from '../actions/types'

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false // 因为在javascript中''空字符串就是false
    default:
      return state
  }
}
