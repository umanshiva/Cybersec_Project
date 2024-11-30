import React, { useId, forwardRef } from 'react'

// basically what will happen is we are creating an input field for our app which can be used in multiple places so its state is defined here but we want to access its state at that location so forwardRef is a react hook that is used to provide the parent with the ability to access children state and DOM elements so just wrap your function inside forwardRef and pass ref into input element from your parent component and u will be able to access its state


const Input = forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>

                {/* // if label is given then display it */}
                {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input