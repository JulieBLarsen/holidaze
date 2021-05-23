import { useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { Message } from '../../common/Message';
import { RefreshIcon } from '@heroicons/react/outline';
import { PrimaryButton } from '../../common/Buttons';
import { BASE_URL } from '../../../constants/api';
const schema = yup.object().shape({
  user_email: yup
    .string()
    .required(<Message message="Please enter your email" style="warning" />)
    .email(
      <Message message="Please enter a valid email address" style="warning" />
    ),
  user_name: yup
    .string()
    .required(<Message message="Please enter your name" style="warning" />),
  message: yup
    .string()
    .required(<Message message="Please write a message" style="warning" />),
  place: yup.string(),
  host: yup.string(),
});
function EnquiryForm({ place, host }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await axios.post(BASE_URL + 'enquiries', data);
      console.log(response);
      setSubmitMessage(<Message message="Enquiry sent" style="success" />);
    } catch (error) {
      console.log('error', error);
      setSubmitError(error.toString());
    } finally {
      setSubmitting(false);
      reset();
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={submitting}>
          <input
            ref={register}
            type="hidden"
            name="place"
            id="place"
            value={place}></input>
          <input
            ref={register}
            type="hidden"
            name="host"
            id="host"
            value={host}></input>
          <div className="mt-2 shadow-lg overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="text-left">
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="user_email"
                    className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <input
                    type="text"
                    name="user_email"
                    id="user_email"
                    autoComplete="email"
                    ref={register}
                    className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                  {errors.user_email && errors.user_email.message}
                </div>
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="user_name"
                    className="block text-sm font-medium text-gray-700">
                    Your name:
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    autoComplete="name"
                    ref={register}
                    className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></input>
                  {errors.user_name && errors.user_name.message}
                </div>
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700">
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    ref={register}
                    className="mt-2 py-2 px-3 border outline-none border-gray-300  focus:border-primary rounded-md"></textarea>
                  {errors.message && errors.message.message}
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <div>
                  {submitError ? (
                    <Message message={submitError} style="danger" />
                  ) : null}
                  {submitMessage}
                </div>
                {submitting ? (
                  <PrimaryButton type="submit">
                    <RefreshIcon className="animate-spin-reverse inline w-5 mr-2" />
                    Sending enquiry
                  </PrimaryButton>
                ) : (
                  <PrimaryButton type="submit">Send enquiry</PrimaryButton>
                )}
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default EnquiryForm;
