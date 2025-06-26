import {ReactElement} from 'react';
import {Link} from 'react-router-dom';

import {AppRoute, CardType} from '../../const.ts';
import {Offer} from '../../models/offer.ts';

import OfferCard from '../offer/offer-card.tsx';


type FavoriteListProps = {
  city: string;
  offers: Offer[];
}

function FavoriteList({city, offers}: FavoriteListProps): ReactElement {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
@@ -33,3 +35,6 @@ export function FavoriteList({city, offers}: FavoriteListProps): ReactElement {
    </li>
  );
}


export default FavoriteList;