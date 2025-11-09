"use client";

import React from "react";

interface Option<T> {
    id: number | string;
    label: string;
    value: T;
}

interface ButtonSelectProps<T> {
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
    className?: string;
}

export default function ButtonSelect<T>({
                                            options,
                                            value,
                                            onChange,
                                            className = "",
                                        }: ButtonSelectProps<T>) {
    return (
        <div
            className={`w-full flex flex-wrap items-center justify-center gap-5 ${className}`}
        >
            {options.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    className={`text-base text-violet border-2 text-violet-600 border-violet-600 hover:bg-violet-600 hover:text-white transition-all duration-300 px-5 py-1 rounded-2xl cursor-pointer ${
                        option.value === value ? "bg-violet-600 text-white" : ""
                    }`}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
