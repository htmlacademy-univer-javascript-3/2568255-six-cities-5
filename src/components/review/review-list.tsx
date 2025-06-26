import { ReactElement } from 'react';
import { Review } from '../../models/review.ts';
import ReviewItem from './review-item.tsx';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({ reviews }: ReviewsListProps): ReactElement {
  return (
    <ul className="reviews__list">
      {reviews.map((review: Review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
