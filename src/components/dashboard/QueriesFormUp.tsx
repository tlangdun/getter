import React from "react";
import { RadioGroup } from '@headlessui/react'
import { useState } from 'react'

const availability = [
  { name: '20%', inStock: true },
  { name: '40%', inStock: true },
  { name: '60%', inStock: true },
  { name: '80%', inStock: true },
  { name: '100%', inStock: true }
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [percentage, setPercentage] = useState(availability[4])

  return (
    <>
      <button
      data-testid="new-query-button"
      type="button"
      onClick={() => setShowModal(true)}
      className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          className="mx-auto h-16 w-16 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          fill="currentColor"
          viewBox="0 0 28 28"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span className="mt-2 block text-sm font-medium text-gray-900">Create a new query</span>
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Create a new Query
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className="space-y-8 divide-y divide-gray-200 ml-2 relative p-6 flex-auto w-96 h-100 ">
                  <div className="pt-8 space-y-6 sm:pt-1 sm:space-y-1">
                    <label htmlFor="query-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                      Query Name
                    </label>
                    <div className="sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="query-name"
                        id="query-name"
                        autoComplete="given-name"
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-email">
                      Skills
                    </div>

                    <div role="skills" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-start items-center mt-2">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="skill-java"
                            aria-describedby="java-description"
                            name="skill-java"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="skill-java" className="font-medium text-gray-700">
                            java
                          </label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="skill-javascript"
                            aria-describedby="javascript-description"
                            name="skill-javascript"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="skill-javascript" className="font-medium text-gray-700">
                            javaScript
                          </label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="skill-python"
                            aria-describedby="python-description"
                            name="skill-python"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="skill-python" className="font-medium text-gray-700">
                            python
                          </label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="skill-c"
                            aria-describedby="c-description"
                            name="skill-c"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="skill-c" className="font-medium text-gray-700">
                            c
                          </label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="skill-cplusplus"
                            aria-describedby="cplusplus-description"
                            name="skill-cplusplus"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="skill-cplusplus" className="font-medium text-gray-700">
                            c++
                          </label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="skill-csharp"
                            aria-describedby="csharp-description"
                            name="skill-csharp"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="skill-csharp" className="font-medium text-gray-700">
                            c#
                          </label>
                        </div>
                      </div>
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="skill-swift"
                            aria-describedby="swift-description"
                            name="skill-swift"
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="skill-swift" className="font-medium text-gray-700">
                            swift
                          </label>
                        </div>
                      </div>


                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-email">
                        Availability
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <RadioGroup value={percentage} onChange={setPercentage} className="mt-2">
                        <RadioGroup.Label className="sr-only">Choose a availability option</RadioGroup.Label>
                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                          {availability.map((option) => (
                            <RadioGroup.Option
                              key={option.name}
                              value={option}
                              className={({ active, checked }) =>
                                classNames(
                                  option.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                                  active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                  checked
                                    ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                  'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                                )
                              }
                              disabled={!option.inStock}
                            >
                              <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </form>
                
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}