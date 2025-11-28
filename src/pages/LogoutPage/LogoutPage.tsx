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
        onSuccess: () => navigate(-1),
        onError: () => navigate(-1),
      }),
    );
  }, []);

  return <Loading />;
}
