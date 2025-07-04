import React, {useId} from 'react'

function Select({
    options, label, 
    className= '', ...props
}, ref) {
    const id= useId()
  return (
    <div>
      {label && <label htmlFor={id} className=''>{label}</label>}
      <select {...props} id={id} ref={ref} className={`${className}`}>
        {options?.map((option)=>(
            <option value={option} key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
