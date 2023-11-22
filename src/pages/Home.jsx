// src/components/common/Header.js

import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import FeaturedSlider from '../components/common/FeaturedSlider';
import CategoryList from '../components/common/CategoryList';
import FeaturedProducts from '../components/common/FeaturedProducts';
import '../App.css';

const Home = () => {
  return (
    <div className='bg-gray-100' >
      
      <div class="mx-20 my-auto p-4">
        <div className='flex flex-row mx-2'>
          <div className='w-3/5'><FeaturedSlider /></div>


          <div className=' flex-col w-2/5 mx-6 '>
            <img src="https://gamikey.com/wp-content/uploads/2023/09/Adobe-Pro-Edition-Banner-1536x768.png" alt="Slide 3" className='rounded-3xl p-2' />
            <img src="https://gamikey.com/wp-content/uploads/2023/09/Adobe-Pro-Edition-Banner-1536x768.png" alt="Slide 3" className='rounded-3xl p-2' />
          </div>

        </div>

        {/* <CategoryList /> */}
        <FeaturedProducts />
      </div>

    </div>
  );
};

export default Home;
