import React, { useEffect, useState } from 'react';

const Alert = ({value}) => {
    return (
        <div
            class="font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100"
            data-dismissible="alert"
        >
            <div class="mr-12">{value}</div>
            <div
                class="absolute top-2.5 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
                data-dismissible-target="alert"
            >
                <button
                    role="button"
                    class="w-max rounded-lg p-1"
                    data-alert-dimissible="true"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    )
};
export default Alert;