import { util } from '@aws-appsync/utils';
import { AppSyncContext } from "../types/appSyncTypes";
import { SendNotificationInput, Notification } from '../types/notification';

export function request(
  ctx: AppSyncContext<{ input: SendNotificationInput }>
) {
  const { userId, email, channel, groupName, topicName, message, priority, status, deepLinkUrl, readStatus , createdBy, viewedBy } =
    ctx.args.input;

  const notificationId = util.autoId();
  const createdAt = util.time.nowISO8601();

  ctx.stash.notificationId = notificationId;
  ctx.stash.createdAt = createdAt;

  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues({ notificationId }),
    attributeValues: util.dynamodb.toMapValues({
      userId,
      email,
      channel,
      groupName,
      topicName,
      message,
      readStatus,
      priority,
      status,
      deepLinkUrl,
      createdAt,
      createdBy,
      viewedBy
    }),
  };
}

export function response(ctx: any): Notification {
  return {
    ...ctx.args.input,
    notificationId: ctx.stash.notificationId,
    createdAt: ctx.stash.createdAt,
  };
}
