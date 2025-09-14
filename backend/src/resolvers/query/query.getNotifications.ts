import { util } from '@aws-appsync/utils';
import { Notification } from '../../types/notification';
import { AppSyncContext } from '../../types/appSyncTypes';

export function request(ctx: AppSyncContext<{ groupName: string }>) {
  return {
    operation: 'Scan',
    filter: {
      expression: 'groupName = :g',
      expressionValues: util.dynamodb.toMapValues({
        ':g': ctx.args.groupName,
      }),
    }
  };
}

export function response(ctx: AppSyncContext): Notification[] {
  return ctx.result.items as Notification[];
}
