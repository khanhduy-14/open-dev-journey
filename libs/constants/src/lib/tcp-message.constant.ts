export enum COMMENT {
  CREATE = 'comment.create',
  UPDATE = 'comment.update',
  DELETE = 'comment.delete',
  FIND_ONE = 'comment.find_one',
}

export enum POST {
  CREATE = 'post.create',
  FIND_ALL = 'post.find_all',
}
export const TCP_MESSAGE = {
  COMMENT,
  POST,
};
