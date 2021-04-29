import React from "react";
import "../assets/css/faq.css"


function FAQ({question, steps})
{
    return (
      <div className="question">
          <div className="question-title">
              {question}
          </div>
          <ol className="question-answer-container double-shadowed">
              {steps.map((step) =>
                  <li className="answer">
                      {step}
                  </li>
              )}
          </ol>
      </div>
    );
}


export default FAQ
