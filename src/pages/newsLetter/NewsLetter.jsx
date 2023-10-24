import React from "react";
import "./newsLetter.css";
function NewsLetter() {
  return (
    <div className="newsLetterMain text-center">
      <p className="newsLetterHeadingText text-4xl md:text-5xl xl:text-5xl lg:text-5xl">
        Subscribe to our newsletter
      </p>
      <p className="newsLetterSecondHeadingText py-5 sm:py-5 md:py-10 lg:py-10 xl:py-10 text-base md:text-xl xl:text-xl lg:text-xl text-center">
        Be the first to know about releases and QuickT news and insights.
      </p>
      <div className="flex items-center justify-center gap-5">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full sm:w-2/3 md:w-2/4 lg:w-1/4 newsLetterInputField"
        />
        <button className="newsLetterButton">Subscribe</button>
      </div>
      <p className="newsLetterNormalText text-xs md:text-base lg:text-base xl:text-base pt-5">
        By clicking Subscribe you're confirming that you agree with our{" "}
        <span className="newsLetterCondition"> Terms and Conditions.</span>
      </p>
    </div>
  );
}

export default NewsLetter;
