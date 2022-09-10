import type { NextPage } from "next";
import ChangeTheme from "../components/ChangeTheme";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Modal from "../components/Modal";

const Home: NextPage = () => {
  return (
    <div>
      <Layout>
        <Modal />
      </Layout>
    </div>
  );
};

export default Home;
