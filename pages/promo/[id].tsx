import axios from "axios";
import { GetServerSideProps } from "next";
import React, { FC } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import PromoPage from "../../components/PromoPage";
import { Promo } from "../../types/Promo";

interface PromoProps {
  promo: Promo;
  promos: Promo[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { id } = query;
  const { data } = await axios.get(`http://localhost:5000/promos/${id}`);
  const { data: promos } = await axios.get(`http://localhost:5000/promos`);

  return {
    props: { promo: data, promos: promos },
  };
};

const Promo: FC<PromoProps> = ({ promo, promos }) => {
  return (
    <>
      <Header />
      <PromoPage
        name={promo.name}
        restaurants={promo.restaurants}
        promos={promos}
      />
      <Footer />
    </>
  );
};

export default Promo;
