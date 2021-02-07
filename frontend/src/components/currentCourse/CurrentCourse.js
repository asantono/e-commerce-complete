import React from 'react';
import {useSelector} from 'react-redux';

const CurrentCourse = () => {
    const {userCourse} = useSelector(state => state.userReducer)
    return(
        <div className='current-course'>
            <div className='current-course__title'>
                {userCourse.title}
            </div>
            <div className='current-course__message'>
                You have successfully gained access to the course!!!
            </div>
            <div className='current-course__thank-you'>
                Thank you for viewing my e-commerce application
            </div>
        </div>
    )
}

export default CurrentCourse;