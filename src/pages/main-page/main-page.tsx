import { useState } from 'react';
import cn from 'classnames';

import { CardType, MapType, SortingType } from '../../const.ts';
import { Offer } from '../../models/offer.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import {
  getOffers,
  getActiveCity,
  getActiveSortingType,
  getListLoadingStatus,
} from '../../store/offers-list/selectors.ts';

import Header from '../../components/header/header.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import Sorting from '../../components/sorting/sorting.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import OfferCardsList from '../../components/offer/offer-card-list.tsx';
import Map from '../../components/map/map.tsx';

const getSorter = (sortingType: SortingType) => {
  switch (sortingType) {
    case SortingType.Popular:
      return () => 0;
    case SortingType.PriceLowToHigh:
      return (a: Offer, b: Offer) => a.price - b.price;
    case SortingType.PriceHighToLow:
      return (a: Offer, b: Offer) => b.price - a.price;
    case SortingType.TopRatedFirst:
      return (a: Offer, b: Offer) => b.rating - a.rating;
    default:
      return () => 0;
  }
};

function MainPage() {
  const activeCity = useAppSelector(getActiveCity);
  const activeSortingType = useAppSelector(getActiveSortingType);

  const offers = useAppSelector(getOffers)
    .filter((o) => o.city.name === activeCity.name)
    .sort(getSorter(activeSortingType));
  const isLoading = useAppSelector(getListLoadingStatus);
  const isEmpty = () => offers.length === 0;

  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page__gray page--main">
      <Header />
      <main
        className={cn('page__main page__main--index', {
          'page__main--index-empty': isEmpty,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>

        <div className="cities">
          <div
            className={cn('cities__places-container container', {
              'cities__places-container--empty': isEmpty,
            })}
          >
            <section
              className={
                isEmpty() ? 'cities__no-places' : 'cities__places places'
              }
            >
              {isEmpty() ? (
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in{' '}
                    {activeCity.name}
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">
                    {offers.length} places to stay in {activeCity.name}
                  </b>
                  <Sorting />
                  <OfferCardsList
                    offers={offers}
                    setActiveOfferId={setActiveOfferId}
                    cardType={CardType.Main}
                  />
                </>
              )}
            </section>

            <div className="cities__right-section">
              <Map
                location={activeCity.location}
                offers={offers}
                activeOfferId={activeOfferId}
                type={MapType.Main}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
