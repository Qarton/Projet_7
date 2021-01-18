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
  put (fd) {
    return Api().put(`meme/${fd.get('memeId')}`, fd)
  },
  delete (memeId) {
    return Api().delete(`meme/${memeId}`)
  }
}
