import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeed,
  getOrdersSelector,
  getLoadingSelector
} from '../../services/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersSelector);
  const isLoading = useSelector(getLoadingSelector);

  if (isLoading) {
    return <Preloader />;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  const handleGetFeed = useCallback(() => {
    dispatch(getFeed());
  }, [dispatch]);

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={handleGetFeed} />
    </>
  );
};
