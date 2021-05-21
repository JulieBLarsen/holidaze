import Head from '../components/layout/Head';
import Heading from '../components/common/Heading';
import Layout from '../components/layout/Layout';
import ContactForm from '../components/contact/ContactForm';

export default function Home() {
  return (
    <Layout containerSize="smallWidth">
      <Head title="Contact" />
      <Heading text="Contact" />
      <div className="sm:w-10/12 lg:w-2/4 mx-auto">
        <ContactForm />
      </div>
    </Layout>
  );
}
