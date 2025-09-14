export interface AppSyncContext<TArgs = any, TResult = any> {
  args: TArgs;
  result?: TResult;
  prev?: { result: TResult };
  stash: Record<string, any>;
}
