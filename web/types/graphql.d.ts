export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  JSON: Record<string, unknown>;
  JSONObject: Record<string, unknown>;
  Time: string;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Int'];
  body: Scalars['String'];
  image: Image;
  imageId: Scalars['Int'];
  user: User;
  posterId: Scalars['Int'];
};

export type CreateCommentInput = {
  body: Scalars['String'];
  imageId: Scalars['Int'];
  posterId: Scalars['Int'];
};

export type CreateImageInput = {
  title: Scalars['String'];
  url: Scalars['String'];
  userId: Scalars['Int'];
};

export type CreateOrUpdateUserInfo = {
  bio?: Maybe<Scalars['String']>;
  profilePicUrl?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  name: Scalars['String'];
  handle: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};



export type Image = {
  __typename?: 'Image';
  id: Scalars['Int'];
  title: Scalars['String'];
  url: Scalars['String'];
  likes?: Maybe<Scalars['Int']>;
  comments: Array<Maybe<Comment>>;
  likedBy: Array<Maybe<User>>;
  user: User;
  userId: Scalars['Int'];
  createdAt: Scalars['String'];
};



export type LoginResponse = {
  __typename?: 'LoginResponse';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToUserLikes: User;
  createComment: Comment;
  createImage: Image;
  createOrUpdateUserInfo: User;
  createUser: User;
  decrementImageLikes: Image;
  deleteComment: Comment;
  deleteImage: Image;
  deleteUser: User;
  incrementImageLikes: Image;
  loginUser: User;
  logoutUser: User;
  removeFromUserLikes: User;
  updateComment: Comment;
  updateImage: Image;
  updateUser: User;
};


export type MutationAddToUserLikesArgs = {
  imageId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateImageArgs = {
  input: CreateImageInput;
};


export type MutationCreateOrUpdateUserInfoArgs = {
  id: Scalars['Int'];
  input: CreateOrUpdateUserInfo;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDecrementImageLikesArgs = {
  id: Scalars['Int'];
  currentUserId: Scalars['Int'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationIncrementImageLikesArgs = {
  id: Scalars['Int'];
  currentUserId: Scalars['Int'];
};


export type MutationLoginUserArgs = {
  input: SignUpOrInInput;
};


export type MutationLogoutUserArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveFromUserLikesArgs = {
  imageId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationUpdateCommentArgs = {
  id: Scalars['Int'];
  input: UpdateCommentInput;
};


export type MutationUpdateImageArgs = {
  id: Scalars['Int'];
  input: UpdateImageInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  findUserByEmail?: Maybe<User>;
  findUserByHandle?: Maybe<User>;
  findUserByPassword?: Maybe<User>;
  image?: Maybe<Image>;
  images: Array<Image>;
  redwood?: Maybe<Redwood>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryCommentArgs = {
  id: Scalars['Int'];
};


export type QueryFindUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryFindUserByHandleArgs = {
  handle: Scalars['String'];
};


export type QueryFindUserByPasswordArgs = {
  password: Scalars['String'];
};


export type QueryImageArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type Redwood = {
  __typename?: 'Redwood';
  version?: Maybe<Scalars['String']>;
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
};

export type SignUpOrInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type UpdateCommentInput = {
  body?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['Int']>;
  posterId?: Maybe<Scalars['Int']>;
};

export type UpdateImageInput = {
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>;
  handle?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  handle: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  userLikes: Array<Maybe<Image>>;
  images: Array<Maybe<Image>>;
  comments: Array<Maybe<Comment>>;
  isAdmin: Scalars['Boolean'];
  profilePicUrl?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  jwt?: Maybe<Scalars['String']>;
  localStoragePassword?: Maybe<Scalars['String']>;
};

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id'>
  ) }
);

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'body'>
  ) }
);

export type CommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments: Array<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'body'>
  )> }
);

export type FindImageByIdEditImageCellVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindImageByIdEditImageCell = (
  { __typename?: 'Query' }
  & { image?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'title' | 'url' | 'likes'>
  )> }
);

export type UpdateImageMutationVariables = Exact<{
  id: Scalars['Int'];
  input: UpdateImageInput;
}>;


export type UpdateImageMutation = (
  { __typename?: 'Mutation' }
  & { updateImage: (
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'title' | 'url' | 'likes'>
  ) }
);

export type FindUserByHandleVariables = Exact<{
  handle: Scalars['String'];
}>;


export type FindUserByHandle = (
  { __typename?: 'Query' }
  & { userToEdit?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'handle' | 'bio' | 'profilePicUrl'>
  )> }
);

export type EditUserInfoMutationVariables = Exact<{
  id: Scalars['Int'];
  input: CreateOrUpdateUserInfo;
}>;


export type EditUserInfoMutation = (
  { __typename?: 'Mutation' }
  & { createOrUpdateUserInfo: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type LogOutMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type LogOutMutation = (
  { __typename?: 'Mutation' }
  & { logoutUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type DeleteImageMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteImageMutation = (
  { __typename?: 'Mutation' }
  & { deleteImage: (
    { __typename?: 'Image' }
    & Pick<Image, 'id'>
  ) }
);

export type FindImageByCellImageCellVariables = Exact<{
  id: Scalars['Int'];
}>;


export type FindImageByCellImageCell = (
  { __typename?: 'Query' }
  & { image?: Maybe<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'title' | 'url' | 'likes'>
    & { comments: Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'body' | 'posterId'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'handle' | 'jwt'>
      ) }
    )>> }
  )> }
);

export type IncrementImageLikesMutationVariables = Exact<{
  imageId: Scalars['Int'];
  currentUserId: Scalars['Int'];
}>;


export type IncrementImageLikesMutation = (
  { __typename?: 'Mutation' }
  & { incrementImageLikes: (
    { __typename?: 'Image' }
    & Pick<Image, 'likes'>
  ) }
);

export type DecrementImageLikesMutationVariables = Exact<{
  imageId: Scalars['Int'];
  currentUserId: Scalars['Int'];
}>;


export type DecrementImageLikesMutation = (
  { __typename?: 'Mutation' }
  & { decrementImageLikes: (
    { __typename?: 'Image' }
    & Pick<Image, 'likes'>
  ) }
);

export type AddToUserLikesMutationVariables = Exact<{
  imageId: Scalars['Int'];
  currentUserId: Scalars['Int'];
}>;


export type AddToUserLikesMutation = (
  { __typename?: 'Mutation' }
  & { addToUserLikes: (
    { __typename?: 'User' }
    & { userLikes: Array<Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'id'>
    )>> }
  ) }
);

export type RemoveFromUserLikesMutationVariables = Exact<{
  imageId: Scalars['Int'];
  currentUserId: Scalars['Int'];
}>;


export type RemoveFromUserLikesMutation = (
  { __typename?: 'Mutation' }
  & { removeFromUserLikes: (
    { __typename?: 'User' }
    & { userLikes: Array<Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'id'>
    )>> }
  ) }
);

export type GetUserJwtByIdVariables = Exact<{
  currentUserId: Scalars['Int'];
}>;


export type GetUserJwtById = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'jwt' | 'localStoragePassword'>
    & { images: Array<Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'id'>
    )>> }
  )> }
);

export type AllImagesVariables = Exact<{ [key: string]: never; }>;


export type AllImages = (
  { __typename?: 'Query' }
  & { images: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'title' | 'url' | 'likes' | 'userId' | 'createdAt'>
    & { comments: Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'body' | 'imageId'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'handle'>
      ) }
    )>>, likedBy: Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>> }
  )> }
);

export type LogInMutationVariables = Exact<{
  input: SignUpOrInInput;
}>;


export type LogInMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'handle' | 'jwt' | 'localStoragePassword'>
  ) }
);

export type CreateImageMutationVariables = Exact<{
  input: CreateImageInput;
}>;


export type CreateImageMutation = (
  { __typename?: 'Mutation' }
  & { createImage: (
    { __typename?: 'Image' }
    & Pick<Image, 'id'>
  ) }
);

export type SignUpMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type UserQueryVariables = Exact<{
  handle: Scalars['String'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { userInfoAndImages?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'handle' | 'profilePicUrl' | 'bio' | 'jwt'>
    & { userImages: Array<Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'title' | 'url' | 'likes'>
      & { comments: Array<Maybe<(
        { __typename?: 'Comment' }
        & Pick<Comment, 'body'>
        & { user: (
          { __typename?: 'User' }
          & Pick<User, 'handle'>
        ) }
      )>>, likedBy: Array<Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'handle'>
      )>> }
    )>> }
  )> }
);
