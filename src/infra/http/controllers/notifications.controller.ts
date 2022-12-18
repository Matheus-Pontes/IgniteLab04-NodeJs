import { Controller, Post, Patch, Param, Get } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {

  constructor(
      private sendNotification : SendNotification,
      private cancelNotification: CancelNotification,
      private readNotification: ReadNotification,
      private unreadNotification: UnreadNotification,
      private countRecipientNotifications: CountRecipientNotification,
      private getRecipientNotification: GetRecipientNotifications
    ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id : string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) : Promise<{ count: number}> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    });

    return {
      count
    }
  }

  @Get('from/:recipientId')
  async getfromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotification.execute({ recipientId });

    return { notifications : notifications.map(NotificationViewModel.toHTTP) };
  }

  @Patch(':id/read')
  async read(@Param('id') id : string) {
    await this.readNotification.execute({ notificationId: id });

  }

  @Patch(':id/unread')
  async unread(@Param('id') id : string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
