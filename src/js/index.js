let floors = prompt("Enter number of Floors");

let lifts = prompt("Enter number of Lifts");
let curr_floor = 1;
let last_clicked = -1;

const createRoot = () => {
  const rootDiv = document.createElement("div");
  rootDiv.id = "root";

  document.body.appendChild(rootDiv);
};

const message = () => {
  if (floors == 0) {
    const msg = document.createElement("p");
    msg.innerHTML = "No Floors? Are you kidding me?";
    document.getElementById("root").appendChild(msg);
  }
  if (lifts == 0) {
    const msg = document.createElement("p");
    msg.innerHTML = "No Lifts? Are you kidding me?";
    document.getElementById("root").appendChild(msg);
  }
};

const createFloors = () => {
  const rootElement = document.getElementById("root");
  for (let i = floors; i >= 1; i--) {
    const floorDiv = document.createElement("div");
    floorDiv.className = "floor";
    if (i === 1) floorDiv.id = "floor-" + i.toString();

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttons";
    buttonDiv.id = "buttons" + i.toString();

    const buttonUp = document.createElement("button");
    buttonUp.innerHTML = "Up";
    buttonUp.id = "Up" + "_" + i.toString();
    buttonUp.addEventListener("click", upButton);

    const buttonDown = document.createElement("button");
    buttonDown.innerHTML = "Down";
    buttonDown.id = "Down" + "_" + i.toString();
    buttonDown.addEventListener("click", downButton);

    const heading = document.createElement("h3");
    heading.innerHTML = "Floor" + i.toString();

    buttonDiv.appendChild(buttonUp);

    buttonDiv.appendChild(buttonDown);

    buttonDiv.appendChild(heading);

    floorDiv.appendChild(buttonDiv);

    rootElement.appendChild(floorDiv);
  }
};

const createLifts = () => {
  const groundFloor = document.getElementById("floor-1");
  const liftsDiv = document.createElement("div");
  liftsDiv.className = "lifts";
  liftsDiv.id = "lifts";

  for (let i = 1; i <= lifts; i++) {
    const liftDiv = document.createElement("div");
    liftDiv.className = "door";

    const liftContainer = document.createElement("div");
    liftContainer.classList.add("lift");
    liftContainer.id = "lift" + i.toString();
    liftContainer.setAttribute("status", "free");
    liftContainer.setAttribute("currentFloor", "1");

    liftContainer.appendChild(liftDiv);

    liftsDiv.appendChild(liftContainer);
  }

  groundFloor.appendChild(liftsDiv);
};

const upButton = (e) => {
  //get the floor number embedded into each button id
  const elId = e.target.id;
  const num = elId.split("_")[1];

  const liftContainer = document.getElementById("lifts");

  let element;
  for (let i = 1; i <= lifts; i++) {
    if (liftContainer.childNodes[i - 1].getAttribute("status") === "free") {
      element = liftContainer.childNodes[i - 1];
      break;
    }
  }

  //get the lift to move
  console.log(element);

  //get the current floor of the lift selected
  const curr_floor = element.getAttribute("currentFloor");

  //get the previous translateY value of the lift
  const { x, y, z } = getTranslateValues(element);

  //calculate the distance by which we want the lift to move
  const distance = Math.abs(num - curr_floor);

  //get the status of the lift
  const status = element.getAttribute("status");

  //if the floor we need to go to is above the current floor our lift is at negate the floor height = 105px
  if (status === "free") {
    //set the status as busy
    element.setAttribute("status", "busy");

    if (distance > 0 && parseInt(num) > parseInt(curr_floor)) {
      const travel = parseInt(y) + distance * 105 * -1;

      element.style.transform = `translateY(${travel}px)`;
      element.style.transition = `${distance * 2}s linear`;
    }
    //else if the floor we want to go is below, just add the floor height
    else if (distance > 0 && parseInt(num) < parseInt(curr_floor)) {
      const travel = parseInt(y) + distance * 105;

      element.style.transform = `translateY(${travel}px)`;
      element.style.transition = `${distance * 2}s linear`;
    }

    //door opening and closing sequence
    const el = element.children[0];
    setTimeout(() => {
      el.classList.add("open");
    }, distance * 2000 + 1000);

    setTimeout(() => {
      el.classList.remove("open");
    }, distance * 2000 + 4000);

    //set the status again as free
    setTimeout(() => {
      element.setAttribute("status", "free");
    }, distance * 2000 + 6000);

    //setting the current floor to the new floor index
    setTimeout(() => {
      element.setAttribute("currentFloor", num.toString());
    }, 6000);
  }
};

const downButton = (e) => {
  //get the floor number embedded into each button id
  const elId = e.target.id;
  const num = elId.split("_")[1];

  const liftContainer = document.getElementById("lifts");

  let element;
  for (let i = 1; i <= lifts; i++) {
    if (liftContainer.childNodes[i - 1].getAttribute("status") === "free") {
      element = liftContainer.childNodes[i - 1];
      break;
    }
  }

  //get the lift to move
  console.log(element);

  //get the current floor of the lift selected
  const curr_floor = element.getAttribute("currentFloor");

  //get the previous translateY value of the lift
  const { x, y, z } = getTranslateValues(element);

  //calculate the distance by which we want the lift to move
  const distance = Math.abs(num - curr_floor);

  //get the status of the lift
  const status = element.getAttribute("status");

  //if the floor we need to go to is above the current floor our lift is at negate the floor height = 105px
  if (status === "free") {
    //set the status as busy
    element.setAttribute("status", "busy");

    if (distance > 0 && parseInt(num) > parseInt(curr_floor)) {
      const travel = parseInt(y) + distance * 105 * -1;

      element.style.transform = `translateY(${travel}px)`;
      element.style.transition = `${distance * 2}s linear`;
    }
    //else if the floor we want to go is below, just add the floor height
    else if (distance > 0 && parseInt(num) < parseInt(curr_floor)) {
      const travel = parseInt(y) + distance * 105;

      element.style.transform = `translateY(${travel}px)`;
      element.style.transition = `${distance * 2}s linear`;
    }

    //door opening and closing sequence
    const el = element.children[0];
    setTimeout(() => {
      el.classList.add("open");
    }, distance * 2000 + 1000);

    setTimeout(() => {
      el.classList.remove("open");
    }, distance * 2000 + 4000);

    //set the status again as free
    setTimeout(() => {
      element.setAttribute("status", "free");
    }, distance * 2000 + 6000);

    //setting the current floor to the new floor index
    setTimeout(() => {
      element.setAttribute("currentFloor", num.toString());
    }, 6000);
  }
};

const disableButtons = () => {
  const str = "Up" + "_" + floors;
  const upBt = document.getElementById(str);
  upBt.style.visibility = "hidden";

  const str2 = "Down" + "_" + 1;
  const downBt = document.getElementById(str2);
  downBt.style.visibility = "hidden";
};

function getTranslateValues(element) {
  const style = window.getComputedStyle(element);
  const matrix = style["transform"] || style.mozTransform;

  // No transform property. Simply return 0 values.
  if (matrix === "none" || typeof matrix === "undefined") {
    return {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  // Can either be 2d or 3d transform
  const matrixType = matrix.includes("3d") ? "3d" : "2d";
  const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");

  // 2d matrices have 6 values
  // Last 2 values are X and Y.
  // 2d matrices does not have Z value.
  if (matrixType === "2d") {
    return {
      x: matrixValues[4],
      y: matrixValues[5],
      z: 0,
    };
  }

  // 3d matrices have 16 values
  // The 13th, 14th, and 15th values are X, Y, and Z
  if (matrixType === "3d") {
    return {
      x: matrixValues[12],
      y: matrixValues[13],
      z: matrixValues[14],
    };
  }
}

createRoot();
message();

if (floors != 0 && lifts != 0) {
  createFloors();
  createLifts();
}

disableButtons();