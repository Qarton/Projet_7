import Api from '@/services/api'

export default {
  search (userId) {
    return Api().get('activity', {
      params: {
        userId: userId
      }
    })
  }
}
