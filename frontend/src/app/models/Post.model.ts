export interface Post {
  _id: string,
  title: string,
  user: {
    _id: string,
    name: string
  },
  date: string,
  description: null | string,
  image: null | string,
}

export interface PostData {
  title: string,
  user: {
    _id: string,
    name: string
  },
  description: null | string,
  image: null | string,
}
