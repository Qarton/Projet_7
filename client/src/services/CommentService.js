import Api from '@/services/api'

export default {
  post (comment) {
    return Api().post('comments', comment)
  },
  delete (commentId) {
    return Api().delete(`comments/${commentId}`)
  },
  index (memeId) {
    return Api().get(`comments/${memeId}`)
  }
}
