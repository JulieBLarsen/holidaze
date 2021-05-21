import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function FeaturedImageUpload({ register }) {
  const [files, setFiles] = useState([]);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: 'image/*',
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

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <img src={file.preview} className="w-20 h-20" />
      <p>{file.path}</p>
      <p>{file.size} bytes</p>
    </div>
  ));

  return (
    <div className="col-span-1 sm:col-span-2 xl:col-span-1">
      <label className="block text-sm font-medium text-gray-700">
        Featured Image
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
              <span>Upload a file</span>
            </label>
            <input
              id="featured_image"
              name="featured_image"
              {...getInputProps()}
            />
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      <div>
        <ul>{thumbs}</ul>
      </div>
    </div>
  );
}

export default FeaturedImageUpload;
