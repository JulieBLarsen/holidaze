import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '../context/AuthContext';
import { SWRConfig } from 'swr';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}>
        <Component {...pageProps} />
      </SWRConfig>
    </AuthProvider>
  );
}

export default App;
