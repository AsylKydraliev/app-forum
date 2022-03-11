export interface Post {
  _id: string,
  title: string,
  user: {
    _id: string,
    name: string,
    token: string
  },
  date: string,
  description: null | string,
  image: null | string,
}

export class ApiPostData {
  constructor(
    public _id: string,
    public title: string,
    public user: {
      _id: string,
      name: string,
      token: string
    },
    public date: string,
    public description: null | string,
    public image: null | string,
  ) {}
}

export interface PostData {
  title: string,
  user: {
    _id: string,
    name: string,
    token: string
  },
  description: string,
  image: null | File,
}
