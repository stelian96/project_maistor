import { Layout } from "../Components/Layout";
import "../global.css"
import "swiper/swiper-bundle.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}
export default MyApp;
