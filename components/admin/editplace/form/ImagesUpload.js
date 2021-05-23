import { ExclamationCircleIcon } from '@heroicons/react/outline';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImagesUpload({ register }) {
  const [files, setFiles] = useState([]);

  // from http://scratch99.com/web-development/javascript/convert-bytes-to-mb-kb/
  function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: 'image/*',
    maxSize: 1000000,
    validator: fileSizeValidator,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = (
    <div className="mb-6 flex flex-wrap gap-4">
      {acceptedFiles.map((file) => {
        const fileSize = bytesToSize(file.size);
        return (
          <div key={file.name} className="mt-2 w-1/4">
            <div className="w-full h-32">
              <img
                src={file.preview}
                className="rounded-md object-cover w-full h-full"
              />
            </div>
            <div className="mt-2 w-full h-full">
              <p className="text-xs font-semibold break-all">{file.path}</p>
              <p className="text-xs mt-1 break-all">{fileSize}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  function fileSizeValidator(file) {
    if (file.size > 1000000) {
      return `File size larger than 1MB`;
    }

    return null;
  }
  const fileRejectionItems = (
    <div className="my-2 flex flex-wrap gap-1">
      {fileRejections.map(({ file, errors }) => (
        <div key={file.name} className="mt-1 w-full">
          <p className="text-xs font-semibold break-all">{file.path}</p>
          <div
            key={file.path}
            className=" bg-danger text-danger-dark mt-1 leading-tight p-1 px-2 mb-4 rounded-md">
            <ExclamationCircleIcon className="inline w-5 mr-2" />
            {errors.map((e, index) => (
              <div className="inline text-xs font-semibold" key={index}>
                {e.message}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="col-span-1 sm:col-span-2 xl:col-span-1">
      <label className="block mt-3 text-sm font-medium text-gray-700">
        Choose Images
      </label>
      <div
        {...getRootProps()}
        className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 h-60 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true">
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor="featured_image"
              className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
              <span>Upload Images</span>
            </label>
            <input ref={register} {...getInputProps()} />
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 1MB</p>
        </div>
      </div>
      <div>
        <p className="mt-4 block text-sm font-medium text-gray-700">
          Selected Images:
        </p>
        <ul>{thumbs}</ul>
        {fileRejectionItems}
      </div>
    </div>
  );
}

export default ImagesUpload;
