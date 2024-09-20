import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const {getCartTotalAmount} = useContext(StoreContext)
  return (
    <form className='place-order'>
      <div className="place-order-left">
          <p className="title">Delivery Informations</p>

          <div className="multi-fields">
            <input type="text" placeholder='First Name' />
            <input type="text" placeholder='Last Name' />
          </div>

          <input type="email" placeholder='Email Address' />
          <input type="text" placeholder='Street' />

          <div className="multi-fields">
            <input type="text" placeholder='City' />
            <input type="text" placeholder='State' />
          </div>

          <div className="multi-fields">
            <input type="text" placeholder='Zip Code' />
            <input type="text" placeholder='Country' />
          </div>

          <input type="text" placeholder='Phone' />

      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>Sub Total</p>
              <p>${getCartTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getCartTotalAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getCartTotalAmount()===0?0:getCartTotalAmount()+2}</p>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder