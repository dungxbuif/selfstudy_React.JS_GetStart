import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
import '../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../node_modules/slick-carousel/slick/slick-theme.css';
import * as action from '../../../store/actions';
class Specialty extends Component {
   componentDidMount() {}

   render() {
      let settings = {
         dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 4,
         slidesToScroll: 2,
      };
      return (
         <div className="section-specialty">
            <div className="specialty-container row">
               <div className="specialty-header w-100 py-4 d-flex justify-content-between">
                  <h2>Chuyên khoa phổ biến</h2>
                  <button>Xem thêm</button>
               </div>
               <Slider {...settings} className="specialty-slider container">
                  <div className="specialty-body text-left ">
                     <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" />
                     <div>Cơ xương khớp</div>
                  </div>
                  <div className="specialty-body text-left">
                     <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" />
                     <div>Cơ xương khớp</div>
                  </div>
                  <div className="specialty-body text-left ">
                     <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" />
                     <div>Cơ xương khớp</div>
                  </div>
                  <div className="specialty-body text-left ">
                     <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" />
                     <div>Cơ xương khớp</div>
                  </div>
                  <div className="specialty-body text-left ">
                     <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" />
                     <div>Cơ xương khớp</div>
                  </div>
                  <div className="specialty-body text-left ">
                     <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" />
                     <div>Cơ xương khớp</div>
                  </div>
               </Slider>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      isLoggedIn: state.user.isLoggedIn,
      language: state.app.language,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
