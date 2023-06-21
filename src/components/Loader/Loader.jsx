import { CircleLoader } from 'react-spinners';
import './Loader.scss';

export default function Loader() {
  return (
    <div role="alert">
      <div className="loader">
        <CircleLoader
          color={'#3F51B5'}
          loading={true}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
