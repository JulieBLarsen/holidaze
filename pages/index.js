import Head from '../components/layout/Head';
import Heading from '../components/common/Heading';
import Layout from '../components/layout/Layout';
import { PrimaryButton } from '../components/common/Buttons';
import Link from 'next/link';

// check if api call works:

export default function Home() {
  return (
    <div className="background__image">
      <Layout containerSize="smallWidth">
        <Head />
        <Heading text="Find somewhere to stay in Bergen" />
        <div className="mx-auto flex justify-center">
          <Link href="/places">
            <a>
              <PrimaryButton>View all accommodations</PrimaryButton>
            </a>
          </Link>
        </div>
      </Layout>
    </div>
  );
}
