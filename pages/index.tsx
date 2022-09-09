import type { NextPage } from 'next';
import ChangeTheme from '../components/ChangeTheme';

const Home: NextPage = () => {
  return (
    <div className="container">
      <h1>Hello, world!</h1>
      <ChangeTheme />
    </div>
  );
};

export default Home;
