import React, { useEffect, useState } from 'react';
import axios from 'axios'
import * as Yup from "yup";
  
const formSchema = Yup.object().shape({
    name: Yup
      .string()
      .min(2, "name must be at least 2 characters"),
    size: Yup
      .string()    
      .notRequired(),
    bacon: Yup
      .boolean()    
      .notRequired(),
    mushrooms: Yup
      .boolean()    
      .notRequired(),
    aidanSpecialSauce: Yup
      .boolean()    
      .notRequired(),
    olives: Yup
      .boolean()    
      .notRequired(),
    special: Yup
      .string()    
      .notRequired(),
})

function OrderForm(props) {
  const emptyForm = {
    name: "",
    size: "",
    bacon: false,
    mushrooms: false,
    aidanSpecialSauce: false,
    olives: false,
    special: "",
  }
  const [disabled, setDisabled] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState({name: ""})

  useEffect(() => {
    formSchema.isValid(form).then(valid => {
      setDisabled(!valid)
    })
  },[form])



  const handleChange = e => {
    e.target.type === 'checkbox' 
    ? setForm({...form, [e.target.name]: e.target.checked})
    : setForm({...form, [e.target.name]: e.target.value})
    
    Yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setError({
          ...error, [e.target.name]: ""
        });
      })
      .catch(err => {
        setError({
          ...error, [e.target.name]: err.errors[0]
        });
      });

  }

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post("https://reqres.in/api/orders", form)
      .then(res => {
        setForm(res.data)
        console.log("success!", form)
      })
      .catch(err => console.log(err.response))
  }

  return (
    <div>
      <form id="pizza-form" onSubmit={e => handleSubmit(e)}>
          <label>
            Name:
            <input
              id="name-input"
              type="text"
              name="name"
              value={form.name}
              onChange={e => handleChange(e)}
            />
          </label>
        { error.name.length > 0 && <p className="error">{error.name}</p> }

          <label>
            Size:
            <select id="size-dropdown" value={form.size} name="size" onChange={handleChange}>
              <option value="">--select a size--</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
          </label>

          <label>
            Add bacon?
            <input
              name="bacon"
              type="checkbox"
              checked={form.bacon}
              onChange={handleChange}
            />
          </label>
          
          <label>
            Add mushrooms?
            <input
              name="mushrooms"
              type="checkbox"
              checked={form.mushrooms}
              onChange={handleChange}
            />
          </label>

          <label>
            Add Aidans Special Sauce?
            <input
              name="aidanSpecialSauce"
              type="checkbox"
              checked={form.aidanSpecialSauce}
              onChange={handleChange}
            />
          </label>
          
            <label>
            Add olives?
            <input
              name="olives"
              type="checkbox"
              checked={form.olives}
              onChange={handleChange}
            />
          </label>
          
          <label>
            Special Instructions?
            <input
              id="special-text"
              type="text"
              name="special"
              value={form.special}
              onChange={e => handleChange(e)}
            />
          </label>

        <button id="order-button" disabled={disabled}>Add to Order!</button>
      </form>
    </div>
  );
}

export default OrderForm;
