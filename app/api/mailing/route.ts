import NewsletterTemplate from '@components/emails/Newsletter';
import prisma from '@prisma/prisma';
import { ApiResponse } from '@utils/apiResponse';
import { sender } from '@utils/sender';
import {
  INTERNAL_SERVER_ERROR,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_OK,
  STATUS_UNAUTHORIZED
} from '@utils/statusCodes';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const TEN_MINUTES_IN_MS = 1000 * 10 * 60;

export async function GET(request: Request) {
  if (
    request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return ApiResponse(STATUS_UNAUTHORIZED, 'Unauthorized');
  }

  try {
    // send newsletter to users who didn't get it in the last 23h 50m, assuming a cron job every 10 minutes
    // this is to avoid sending the newsletter to the same users multiple times
    // this is not a perfect solution, but it's good enough for now
    const users = await prisma.user.findMany({
      where: {
        confirmed: true,
        deleted: false,
        OR: [
          {
            lastMail: {
              lt: new Date(Date.now() - ONE_DAY_IN_MS + TEN_MINUTES_IN_MS) // 24h - 10m
            }
          },
          {
            lastMail: null
          }
        ]
      },
      select: {
        id: true,
        email: true
      }
    });

    console.info(`Found ${users.length} users to mail to.`);

    if (users.length === 0) {
      return ApiResponse(STATUS_OK, 'No user to mail to.');
    }

    const news = await prisma.news.findMany({
      where: {
        createdAt: {
          gt: new Date(Date.now() - ONE_DAY_IN_MS)
        }
      },
      orderBy: {
        score: 'desc'
      },
      take: 25
    });

    console.info(`Found ${news.length} news to include in the newsletter.`);

    if (news.length === 0) {
      return ApiResponse(STATUS_OK, 'No news to include in newsletter.');
    }

    const validRankedNews = news.sort((a, b) => b.score - a.score);

    const sent = await sender(
      users.map(user => user.email),
      NewsletterTemplate(validRankedNews)
    );

    if (!sent) {
      return ApiResponse(STATUS_INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
    }

    // update users so they don't get the newsletter again
    await prisma.user.updateMany({
      where: {
        id: {
          in: users.map(user => user.id)
        }
      },
      data: {
        lastMail: new Date()
      }
    });

    return ApiResponse(
      STATUS_OK,
      `Newsletter sent to ${users.length} addresses.`
    );
  } catch (error) {
    console.error(error);
    return ApiResponse(STATUS_INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
  }
}
