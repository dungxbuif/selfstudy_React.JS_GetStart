import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
import '../../../../node_modules/slick-carousel/slick/slick.css';
import '../../../../node_modules/slick-carousel/slick/slick-theme.css';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';

class Specialty extends Component {
   constructor(props) {
      super(props);
      this.state = {
         arrDoctors: [],
      };
   }

   componentDidUpdate(prevProps, prevStates, snapshot) {
      if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
         this.setState({
            arrDoctors: this.props.topDoctorsRedux,
         });
      }
   }

   componentDidMount() {
      this.props.loadTopDoctors();
   }

   handleViewDetailDoctor = (doctor) => {
      console.log(doctor);
      this.props.history.push(`detail-doctor/${doctor.id}`);
   };

   render() {
      let allDoctors = this.state.arrDoctors;
      let language = this.props.language;
      let settings = {
         dots: false,
         infinite: true,
         speed: 500,
         slidesToShow: 4,
         slidesToScroll: 2,
      };
      return (
         <div className="section-specialty pt-2 pb-4">
            <div className="specialty-container row">
               <div className="specialty-header w-100 py-4 d-flex justify-content-between">
                  <h2>Chuyên khoa phổ biến</h2>
                  <button>Xem thêm</button>
               </div>
               <Slider {...settings} className="specialty-slider container">
                  {allDoctors &&
                     allDoctors.length &&
                     allDoctors.map((item, index) => {
                        let nameVi = `${item.positionData.valueVi}: ${item.lastName} ${item.firstName}`;
                        let nameEn = `${item.positionData.valueEn}: ${item.firstName} ${item.lastName}`;
                        return (
                           <div
                              key={index}
                              className="specialty-body text-left "
                              onClick={() => this.handleViewDetailDoctor(item)}>
                              <img src={new Buffer(item.image, 'base64').toString('binary')} />
                              <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                           </div>
                        );
                     })}
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
      topDoctorsRedux: state.admin.topDoctors,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      loadTopDoctors: async () => await dispatch(actions.fetchTopDoctors()),
   };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
