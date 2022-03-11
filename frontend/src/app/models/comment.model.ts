export interface CommentApi {
  _id: string,
  post: string
  user: string,
  text: string
}

export interface CommentData {
  text: string,
  token: string,
  post: string,
  user: string
}

export class CommentClass {
  constructor(
    public _id: string,
    public post: string,
    public user: string,
    public text: string
  ) {}
}
