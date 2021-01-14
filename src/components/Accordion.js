import React, { useState } from "react";



const Accordion = ({ items }) => { 
  //initialize a new piece of state
  //useState introduces a state in the functional component. useState has two elements. The first element is a piece of state we keep track of and it will change over time. The 2nd element is a function that we call to update that piece of state. When this function is called, the functional component will be automatically re-render. Also, this function takes in a parameter that will be the initial value of the piece of state.
  //array destructuring- short cut to get an element in the array
  const [activeIndex, setActiveIndex] = useState(null);


  //helper function
  const onTitleClick = (index) => { 
    //the setter function coming from the useState()'array will get the index value, and re-render the entire functional component. When the component is being re-render, the default value on the useState will change to the index value in turn changing the activeIndex initial value to index value.
    setActiveIndex(index);
  }


  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex ? 'active' : '';
    console.log(index) // 0,1,2

    return (
    <React.Fragment key={item.title}> 
        <div
          className={`title ${active}`}
          onClick={() => onTitleClick(index)}
        >
        <i className="dropdown icon"></i>
        {item.title}
      </div>
        <div className={`content ${active}`}>
        <p>{item.content}</p>
      </div>
    </React.Fragment>
    )
  });


  return <div className="ui styled accordion">
    {renderedItems}
  </div>
}

export default Accordion;