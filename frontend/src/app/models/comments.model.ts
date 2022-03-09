export interface Comment {
  _id: string,
  text: string,
  user: {
    _id: string,
    name: string
  },
  post: string
}

export interface CommentData {
  text: string,
  user: {
    _id: string,
    name: string
  },
  post: string
}
