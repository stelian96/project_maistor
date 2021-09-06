import Link from "next/link";

import ImageSwiper from "../components/ImageSwiper";

export default function Service({ service }) {
  console.log(service);
  return (
    <>
      <Link href="/">
        <a>Върни се</a>
      </Link>

      <div>
        <div>{service.name}</div>
        <div>{service.description}</div>
        {service.price != null ? (
          <p>{service.price} лв.</p>
        ) : null}
        <ImageSwiper images={service.images} />
      </div>
    </>
  );
}

// tell next.js how many pages there are
export async function getStaticPaths() {
  const res = await fetch("http://localhost:8000/services");
  const services = await res.json();
  const paths = services.map((service) => ({
    params: { slug: String(service.slug) },
  }));
  return {
    paths,
    fallback: false,
  };
}

// for each individual page: get the data for that page
export async function getStaticProps({ params }) {
  const { slug } = params;
  const res = await fetch(`http://localhost:8000/services/?slug=${slug}`);
  const data = await res.json();
  const service = data[0];

  return {
    props: { service },
  };
}
