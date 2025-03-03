import React from "react";
import Image from "../atoms/Image";
import CalImg from "../../../assets/gym/9.jpeg";
import Form from "../molecules/Form";
import { Fade } from "react-awesome-reveal";

const Calculator = () => {
  return (
    <>
      <section className="w-full h-auto flex items-center bg-zinc-900 delay-75 w3-animate-bottom">
        <main className="w-full grid md:grid-cols-2 items-center gap-20 md:gap-0 lg:gap-8 ">
          <div className="h-full w-full md:order-1 order-2 pt-12 md:pt-0 lg:px-8 px-4 flex flex-col lg:justify-center justify-center items-start lg:gap-20 gap-16">
            <Fade className="w-full mb-32">
              <div className="w-full flex flex-col mt-10 items-center relative z-10">

                <h1 as="h1" className="text-zinc-200 font-light lg:text-5xl md:text-4xl text-3xl">
                  Calculate Your BMI
                </h1>
                <h1
                  as="h1"
                  className="absolute text-zinc-500/10 lg:left-52 md:left-32 left-36 lg:text-9xl md:text-7xl text-6xl font-extralight lg:-top-32 md:-top-20 -top-16 -z-10"
                >
                  BMI Calculator
                </h1>
              </div>

              <Form />
            </Fade>
          </div>

          <div className="w-full h-full md:order-2 order-1 grid">
            <Image alt="Offer Image" objectCover="object-cover" className="w-full" image={CalImg} />
          </div>
        </main>
      </section>
    </>
  );
};

export default Calculator;
