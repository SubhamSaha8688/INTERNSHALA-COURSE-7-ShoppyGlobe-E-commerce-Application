import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProducts, 
  selectAllProducts, 
  selectProductsStatus, 
  selectProductsError 
} from '../features/products/productsSlice';

export const useProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return { 
    products, 
    loading: status === 'loading', 
    error 
  };
};