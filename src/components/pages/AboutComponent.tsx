import React from 'react'


const AboutUsComponent = () => {
  return (
    <section className="contianer mx-auto p-[40px] bg-blue-100 h-auto w-auto m-12">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div className="order-1">
          <h2 className="sm:mx-24 lg-mx-24 md:mx-24 mx-24 max-w-2xl mb-4 text-base font-extrabold tracking-tight leading-none md:text-3xl xl:text-3xl dark:text-blue-800">Our Story</h2>
          <p className="text-[9px] sm:mx-24 md:text-base md:text-[12px]"> 
            Empowering your gaming experience, our dedicated team at cam shop is excited to unveil our cutting-edge e-commerce website. Dive into a world where innovation meets convenience, featuring a curated selection of computer, phone, and game controller accessories. <br /> <br />
            We're committed to providing enthusiasts with seamless online shopping, ensuring you stay ahead in the gaming realm. Explore the possibilities, level up your gear, and redefine your gaming journey with us.
          </p>
        </div>
        <div className="order-2">
          <img className="w-full rounded-5 max-w-lg " src="https://i.pinimg.com/564x/c8/a6/6b/c8a66bb1bf09eac97d51292ebc89c448.jpg" alt="" />
        </div>
      </div>
    </section>
  );
};

export default AboutUsComponent;

