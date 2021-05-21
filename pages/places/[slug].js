import Head from '../../components/layout/Head';
import { HeadingSmaller } from '../../components/common/Heading';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { BASE_URL } from '../../constants/api';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Features from '../../components/places/singleplace/Features';
import Host from '../../components/places/singleplace/Host';
import Minimap from '../../components/places/singleplace/Minimap';
import ImageGrid from '../../components/places/singleplace/images/ImageGrid';

export default function Place() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, error } = useSWR(
    slug ? `${BASE_URL}places?slug=${slug}` : null
  );

  if (error) return <p>error</p>;
  if (!data) return <p>loading..</p>;

  const place = data[0];

  return (
    <Layout containerSize="smallWidth">
      <div className="mt-20">
        <Head title={place.title} />
        <ImageGrid featured={place.featured_image} images={place.images} />
        <HeadingSmaller text={place.title} />
        <div className="my-4 flex items-center">
          <p className="text-xl">
            <span className="font-bold">${place.price}</span> / night
          </p>
        </div>
        <div className="grid grid-cols-5 gap-10">
          <div className="col-span-5 xl:col-span-3">
            <div>
              <Features
                guests={place.guests}
                bathrooms={place.bathrooms}
                bedrooms={place.bedrooms}
                wifi={place.wifi}
                breakfast={place.breakfast}
                kitchen={place.kitchen}
              />
            </div>
            <div className="block xl:hidden">
              <Host host={place.host} place={place.title} />
            </div>
            <p className="mt-6 leading-relaxed">{place.description}</p>
            <div className="block xl:hidden">
              <Minimap place={place} />
            </div>
          </div>
          <div className="hidden xl:block col-span-2">
            <Host host={place.host} place={place.title} />
            <Minimap place={place} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
