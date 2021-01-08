import Api from '@/services/api'

export default {
  index (comment) {
    return Api().get('comments', {
      params: comment
    })
  },
  post (comment) {
    return Api().post('comments', comment)
  },
  delete (commentId) {
    return Api().delete(`comments/${commentId}`)
  },
  search (userId) {
    return Api().get('user-activity-comment', {
      params: {
        userId: userId
      }
    })
  }
}
