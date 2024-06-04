import React from "react";

function VerificationPopup({ message, onAccept, products, isEmptyCart }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                  isEmptyCart ? "bg-red-100" : "bg-green-100"
                } sm:mx-0 sm:h-10 sm:w-10`}
              >
                {isEmptyCart ? (
                  <svg
                    className="h-6 w-6 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Verificación
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{user.firstName}, {message}</p>
                </div>
                {!isEmptyCart && (
                  <>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {products.map((product) => (
                          <div
                            key={product.id}
                            className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase"
                          >
                            <p>{product.name}</p>
                            <p>${product.price} x {product.quantity}</p>
                          </div>
                        ))}
                      </p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <p className="text-sm text-gray-500">Total compra:</p>
                      <p className="text-sm text-gray-500">${total}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onAccept}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationPopup;
