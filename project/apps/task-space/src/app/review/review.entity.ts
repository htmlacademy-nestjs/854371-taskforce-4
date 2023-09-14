import { Entity } from '@project/util/util-types';
import { ReviewInterface } from '@project/shared/app-types';

export class ReviewEntity implements Entity<ReviewEntity, ReviewInterface>, ReviewInterface {
  public textReview: string;
  public assessment: number;
  public executorId: string;
  public taskSub: number;

  constructor(review: ReviewInterface) {
    this.fillEntity(review);
  }

  public fillEntity(entity: ReviewInterface) {
    this.textReview = entity.textReview;
    this.assessment = entity.assessment;
    this.executorId = entity.executorId;
    this.taskSub = entity.taskSub;
  }

  public toObject(): ReviewEntity {
    return { ...this };
  }
}
