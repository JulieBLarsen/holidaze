import Head from '../components/layout/Head';
import Heading from '../components/common/Heading';
import Layout from '../components/layout/Layout';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { AUTH_URL } from '../constants/api';
import { Message, BigMessage } from '../components/common/Message';
import { RefreshIcon } from '@heroicons/react/outline';
import { PrimaryButton } from '../components/common/Buttons';

const url = AUTH_URL;

const schema = yup.object().shape({
  identifier: yup
    .string()
    .required(
      <Message message="Please enter your username or email" style="warning" />
    ),
  password: yup
    .string()
    .required(<Message message="Please enter your password" style="warning" />),
});

function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (auth) {
      router.push('/admin');
    }
  }, []);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      router.push('/admin');
    } catch (error) {
      console.log('error', error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Layout containerSize="smallWidth">
      <Head title="Log in" />
      <Heading text="Login" />
      <div className="sm:w-10/12 lg:w-2/4 mx-auto">
        {auth ? (
          <BigMessage
            message="Logged in! Redirecting to dashboard."
            style="success"
          />
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset disabled={submitting}>
                <div className="mt-14 shadow-lg overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="text-left">
                      <div className="flex flex-col mb-6">
                        <label
                          htmlFor="identifier"
                          className="block text-sm font-medium text-gray-700">
                          Username / Email
                        </label>
                        <input
                          type="text"
                          name="identifier"
                          id="identifier"
                          autoComplete="identifier"
                          ref={register}
                          className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                        {errors.identifier && errors.identifier.message}
                      </div>
                      <div className="flex flex-col mb-6">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="password"
                          ref={register}
                          className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                        {errors.password && errors.password.message}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="pr-4">
                      {loginError ? (
                        <Message message={loginError} style="danger" />
                      ) : null}
                    </div>
                    {submitting ? (
                      <PrimaryButton type="submit">
                        <RefreshIcon className="animate-spin-reverse inline w-5 mr-2" />
                        Logging in
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton type="submit">Log in</PrimaryButton>
                    )}
                  </div>
                </div>
              </fieldset>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
}
export default Login;
