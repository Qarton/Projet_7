import Api from '@/services/api'

export default {
  index () {
    return Api().get('meme')
  },
  post (meme) {
    return Api().post('meme', meme)
  },
  show (memeId) {
    return Api().get(`meme/${memeId}`)
  },
  like (value) {
    return Api().get('meme/like', value)
  }
}
