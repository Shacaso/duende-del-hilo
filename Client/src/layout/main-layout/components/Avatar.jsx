import { useAuth } from '@/hooks/useAuth';
import { Preload } from '@/components';
import PropTypes from 'prop-types';

export function Avatar({ size }) {
  const { authState } = useAuth();
  const [firstLetter, ...rest] = authState?.user?.name ?? '???';
  return (
    <>
        <div className='min-w-full min-h-full avatar'>
          <div className='min-w-full min-h-full rounded-full shadow-lg'>
            <div
              className={`${size} min-w-full min-h-full bg-primary flex items-center justify-center text-secondary-content font-bold capitalize`}
            >
              M
            </div>
          </div>
        </div>
    </>
  );
}

Avatar.propTypes = {
  size: PropTypes.string,
};

Avatar.defaultProps = {
  size: 'text-[1.5rem]',
};
