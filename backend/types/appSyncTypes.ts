// appsync-types.ts
// A small helper to add type safety to AppSync resolver context

export interface AppSyncContext<TArgs = any, TResult = any> {
  args: TArgs; // GraphQL arguments
  result?: TResult; // raw DynamoDB result
  prev?: { result: TResult }; // previous function result in a pipeline
  stash: Record<string, any>; // stash for passing data between resolvers
}
