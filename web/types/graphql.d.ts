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
  createComment: Comment;
  createImage: Image;
  createOrUpdateUserInfo: User;
  createUser: User;
  deleteComment: Comment;
  deleteImage: Image;
  deleteUser: User;
  loginUser?: Maybe<LoginResponse>;
  updateComment: Comment;
  updateImage: Image;
  updateLikes: Image;
  updateUser: User;
  updateUserLikes: User;
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


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationLoginUserArgs = {
  input: SignUpOrInInput;
};


export type MutationUpdateCommentArgs = {
  id: Scalars['Int'];
  input: UpdateCommentInput;
};


export type MutationUpdateImageArgs = {
  id: Scalars['Int'];
  input: UpdateImageInput;
};


export type MutationUpdateLikesArgs = {
  id: Scalars['Int'];
  currentUserId: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  input: UpdateUserInput;
};


export type MutationUpdateUserLikesArgs = {
  imageId: Scalars['Int'];
  currentUserId: Scalars['Int'];
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
};

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

export type CommentsQueryVariables = Exact<{
  imageId: Scalars['Int'];
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'body'>
  )> }
);

export type Find_Image_By_IdVariables = Exact<{
  id: Scalars['Int'];
}>;


export type Find_Image_By_Id = (
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

export type UpdateLikeMutationVariables = Exact<{
  id: Scalars['Int'];
  currentUserId: Scalars['Int'];
}>;


export type UpdateLikeMutation = (
  { __typename?: 'Mutation' }
  & { updateLikes: (
    { __typename?: 'Image' }
    & Pick<Image, 'likes'>
  ) }
);

export type UpdateUserLikesMutationVariables = Exact<{
  imageId: Scalars['Int'];
  currentUserId: Scalars['Int'];
}>;


export type UpdateUserLikesMutation = (
  { __typename?: 'Mutation' }
  & { updateUserLikes: (
    { __typename?: 'User' }
    & { userLikes: Array<Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'id'>
    )>> }
  ) }
);

export type GetUserByIdVariables = Exact<{
  currentUserId: Scalars['Int'];
}>;


export type GetUserById = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'handle' | 'password'>
    & { userLikes: Array<Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'title'>
    )>>, images: Array<Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'title'>
    )>> }
  )> }
);

export type CurrentUserAndAllImagesVariables = Exact<{
  currentUserId: Scalars['Int'];
}>;


export type CurrentUserAndAllImages = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'handle'>
    & { userLikes: Array<Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'title'>
    )>>, images: Array<Maybe<(
      { __typename?: 'Image' }
      & Pick<Image, 'title' | 'url' | 'likes' | 'userId'>
    )>> }
  )>, images: Array<(
    { __typename?: 'Image' }
    & Pick<Image, 'id' | 'title' | 'url' | 'likes'>
    & { comments: Array<Maybe<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'body'>
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
  & { loginUser?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email' | 'handle'>
      & { images: Array<Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'title' | 'url' | 'likes' | 'userId'>
      )>> }
    )> }
  )> }
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
    & Pick<User, 'name' | 'handle' | 'profilePicUrl' | 'bio'>
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
        & Pick<User, 'handle'>
      )>> }
    )>> }
  )> }
);
