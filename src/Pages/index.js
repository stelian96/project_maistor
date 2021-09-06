import React, { useEffect } from "react";
import ServicesList from "../Components/ServiceList";
import Store from "../Store";

export default function Index({ services }) {
  useEffect(() => {
    Store.setServices(services);
    console.log(services);
  }, []);

  return <ServicesList />;
}

export async function getStaticProps() {
  try {
    const res = await fetch(
      "http://localhost:8000/services?_limit=20&_sort=premium:DESC"
    );
    const services = await res.json();

    return {
      props: { services },
    };
  } catch {
    return {
      props: {},
    };
  }
}
