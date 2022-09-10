import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

    const [loader, setLoader] = useState(true)
    const [value, setValue] = useState(null)
    const [bids, setBids] = useState([])

    const fetchApiData = async () => {
      try {
        const res = await fetch('https://backend-ohlocal-development.umnsbhcb5nb6a.ap-south-1.cs.amazonlightsail.com/api/test_web_assignment/');

        const data = await res.json();
        console.log("api data fetched");
        console.log(data);
        setValue(data)
        setLoader(false);
        setBids(data.bids)
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      fetchApiData();
    }, []);


    if(loader) {
      return (
        <>
          <h2>Loading...</h2>
        </>
      )
    }


  return (
    <>
      <div className="nav-bar">
        <div className="ham-menu">
        <i className="fa-solid fa-bars"></i>
        </div>
        <div className="search-bar">
          <input type="text" placeholder='Enter here' />
          <button type='button'>Search</button>
        </div>

        <div className="nav-list">
          <h6>Live Bids</h6>
          <img src={value.nav_bar.person_icon} alt="person" /> 
          <h6>Help &amp; Support</h6>
        </div>
      </div>
      
      <header>
        <div>
        <img src={value.heading.svg} alt="" />
        <h1>{value.heading.heading}</h1>
        <h4>{value.heading.sub_heading}</h4>
        </div>

      </header>

      <div className="main-product">
          <img src={value.main_product.main_product_svg} alt="tv" />
          <div className="pr-details">
            <p>{value.main_product.product_title}</p>
            <h6>{value.main_product.product_pipeline}</h6>
            <div className="price">
              <img src={value.main_product.online_price_icon} alt="price" /> 
              <h3>Rs.{value.main_product.online_price}</h3>
            </div>
            <p>Qty: {value.main_product.quantity}</p>
            <div className="link">
             <p href="#" className="details-a">All Details</p>
            </div>

          </div>
          <div className="pr-status">
            <div className="status">
               <h3>Status</h3>
               <img src={value.main_product.status_icon} alt="logo" />
            </div>

            <p>Time Remaing</p>
            <p className='live'>{value.main_product.time_remaining} minutes</p>

            <div className="bids">
              <h2>Bids Placed <span>{value.main_product.bid_placed}</span></h2>
            </div>
          </div>
      </div>

      <div className="product-cards">
        {bids.map(i => (
          <div className="product-item">

            <div className="image-div">
              <img src={i.shop_image} alt="" />
              <p>{i.shop_name}</p>
            </div>
            <p>{i.shop_address}</p>
            <h2>{i.offer_price}</h2>
            <p>Deliver and Services</p>
            <div className="del-status">
              <img src={i.express_delivery_icon}alt="" className='logo'/>
              <div className="del-name">
                <h4>Express delivery</h4>
                <p>(delivery in 1 hour)</p>
              </div>
              <img src={i.express_delivery ? i.check_icon : i.cross_icon} alt="" className="status" />
            </div>
            <div className="del-status">
              <img src={i.return_option_icon} alt="" className='logo'/>
              <div className="del-name">
                <h4>Return Option</h4>
              </div>
              <img src={i.return_option ? i.check_icon : i.cross_icon} alt="" className="status" />
            </div>

            <button className='btn-blue'><img src={i.extra_offer_icon} alt="" /> Extra Offer</button>
            <p>{i.product_name}</p>
            <div className='btn-flex'>
            <button className="btn-orange">Buy Now</button>
            </div>

            <h4>Alternate Products</h4>
            <div className="alt-pro">
              <img src={value.main_product.main_product_svg} alt="" />
              <div className="alt-details">
                <p>{i.alternate_product_details.product_name}</p>
                <div className="alt-price">
                  <img src={i.alternate_product_details.online_price_icon} alt="" />
                  <h4>{i.alternate_product_details.online_price}</h4>
                  <h2>{i.alternate_product_details.offer_price}</h2>
                  <div className="btn-orange">Order Now</div>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
