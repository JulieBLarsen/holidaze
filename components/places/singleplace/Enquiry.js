import EnquiryForm from './EnquiryForm';

function Enquiry(props) {
  return (
    <div>
      <h3 className="font-bold text-lg mt-6 mb-2">Message host:</h3>
      <EnquiryForm place={props.place} />
    </div>
  );
}

export default Enquiry;
