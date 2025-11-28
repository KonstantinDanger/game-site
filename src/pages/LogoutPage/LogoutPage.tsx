import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '@/redux/store';
import { logout } from '@/redux/reducers/auth';
import Loading from '@/components/Loading/Loading';

export default function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      logout({
        onSuccess: () => navigate('/login', { replace: true }),
        onError: () => navigate(-1),
      }),
    );
  }, [dispatch, navigate]);

  return <Loading />;
}
