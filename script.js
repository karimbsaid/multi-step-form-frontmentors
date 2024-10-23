const form_container = document.querySelectorAll(".form-container");
const step_number = document.querySelectorAll(".step-number");
const step_container = document.querySelector(".step-container");
const planLists = document.querySelector(".plan-lists");
const next_step = document.querySelector(".previous-step");
const goBack_step = document.querySelector(".next-step");
const errorName = document.querySelector(".error-name");
const errorEmail = document.querySelector(".error-email");
const errorPhone = document.querySelector(".error-phone");
const plan = document.querySelectorAll(".plan");
const switchElement = document.querySelector(".switch");
const indicationDiv = document.querySelector(".switch-indication");
const monthlyOption = document.querySelector(".option-monthly");
const annualOption = document.querySelector(".option-annualy");
const nbreTotalStep = form_container.length;

const add_ons__container = document.querySelector(".add-ons__container");
const user = {};

const planOption = [
  { option: 1, title: "Arcade", price: 9 },
  { option: 2, title: "Advanced", price: 12 },
  { option: 3, title: "pro", price: 15 },
];
const addOnsOption = [
  {
    option: 1,
    title: "online service",
    description: "Access to multiplayer games",
    price: 1,
  },
  {
    option: 2,
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: 2,
  },
  {
    option: 3,
    title: "Customizable profile",
    description: "Custom theme on your profile",
    price: 2,
  },
];

const defaultPlan =
  document.querySelector(".plan.plan__active").dataset.planoption;
user.plan = planOption.find((plan) => plan.option === Number(defaultPlan));
user.payPer = "monthly";
user.addOns = [];

function isFirstPage(currentPage) {
  return (
    Number(currentPage.dataset.stepnumber) ===
    Number(form_container[0].dataset.stepnumber)
  );
}
function isLastPage(currentPage) {
  return Number(
    currentPage.dataset.stepnumber ===
      form_container[nbreTotalStep - 1].dataset.stepnumber
  );
}

//SHOW BACK BTN ONLY WHEN THE INDEX OF THE CURRENT CONTENT > 1 AND THE NEXT BTN WILL BE CONFIRM IN THE LAST CONTENT
function manipulateBtnContainer(currentPage) {
  const isFirst = isFirstPage(currentPage);
  const isLast = isLastPage(currentPage);
  goBack_step.classList.remove("btn__hidden");

  if (isFirst) {
    goBack_step.classList.add("btn__hidden");
  }
  if (isLast) {
    next_step.classList.remove("previous-step");
    next_step.classList.add("btn__confirm");
    next_step.textContent = "Confirm";
  }
}

//THIS FUNCTION TO MOVE TO STEP AND ACTIVATE/DESACTIVATE STEP CONTAINER

// function moveToStep(stepClicked) {
//   const activeSteps = document.querySelectorAll(".step-number.step-active");
//   const currentActiveStep = activeSteps[activeSteps.length - 1];
//   const currentStepNumber = Number(currentActiveStep.dataset.step);

//   if (stepClicked === currentStepNumber + 1) {
//     activateStep(stepClicked);
//   } else if (stepClicked <= currentStepNumber) {
//     deactivateStepsFrom(stepClicked);
//   }
// }

function moveToStep(nextStep) {
  const activeSteps = document.querySelector(
    ".form-container.form_content__active"
  ).dataset.stepnumber;
  // console.log(activeSteps);
  // const currentActiveStep = activeSteps[activeSteps.length - 1];
  // const currentStepNumber = Number(currentActiveStep.dataset.step);
  if (nextStep === Number(activeSteps) + 1) {
    activateStep(nextStep);
  } else if (nextStep <= Number(activeSteps)) {
    deactivateStepsFrom(nextStep);
  }
}

// ACTIVATE STEP INDICATOR FUNCTION
function activateStep(stepNumber) {
  // Add 'step-active' class to the clicked step and update the form container
  const stepElement = document.querySelector(
    `.step-number[data-step="${stepNumber}"]`
  );
  stepElement.classList.add("step-active");

  form_container.forEach((el) => el.classList.remove("form_content__active"));
  document
    .querySelector(`.form__content__step${stepNumber}`)
    .classList.add("form_content__active");
}

//DESACTIVE STEP INDICATOR
function deactivateStepsFrom(stepNumber) {
  // Remove 'step-active' class from all steps after the clicked step
  step_number.forEach((el) => {
    const step = Number(el.dataset.step);
    if (step > stepNumber) {
      el.classList.remove("step-active");
    }
  });

  form_container.forEach((el) => el.classList.remove("form_content__active"));
  document
    .querySelector(`.form__content__step${stepNumber}`)
    .classList.add("form_content__active");
}

//THESE FUNCTIONS IS FOR INPUT VALIDATION BECAUSE THEY MAINTAINS INTEGRITY AND SECURITY OF DATA

function verifyName(name) {
  name = name.trim();
  const regex = /^[a-zA-Z ]+$/;
  if (name === "") {
    return { valid: false, message: "Name is required." };
  } else if (!regex.test(name)) {
    return { valid: false, message: "Please enter a valid user name." };
  } else {
    return { valid: true, message: "" };
  }
  return regex.test(name);
}
function verifyEmail(email) {
  email = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email === "") {
    return { valid: false, message: "Email is required." };
  } else if (!emailRegex.test(email)) {
    return { valid: false, message: "Please enter a valid email address." };
  } else {
    return { valid: true, message: "" }; // Valid email
  }
}

//THIS FUNCTION IS TO CHOOSE THE PLAN AND ADDED IT THE USER OBJECT
function pickPlan(planPicked) {
  plan.forEach((plan) => {
    plan.classList.remove("plan__active");
  });
  document
    .querySelector(`.option__${planPicked}`)
    .classList.add("plan__active");
  const planed = planOption.find((plan) => plan.option === planPicked);
  user.plan = planed;
}

//THIS FUNCTION TO DISPLAY SUMMARY
function displaySummary() {
  const { plan: planChoosen, payPer, addOns } = user;

  let totalPrices = 0;
  const selected__plan = document.querySelector(".selected__plan");
  totalPrices += planChoosen.price;
  selected__plan.insertAdjacentHTML(
    "afterbegin",
    `<p class="selected__plan--name">
  ${planChoosen.title} $ <span>(</span><span class="period__name">${payPer}</span>)
  </p><a href="#" class="change">Change</a>
  <p class="plan-cost selected__plan--cost">$${planChoosen.price}/mo</p>`
  );
  const selected__add_ons_element =
    document.querySelector(".selected__add-ons");
  addOns.forEach((addOns) => {
    const { title, description, price } = addOns;
    totalPrices += price;
    selected__add_ons_element.insertAdjacentHTML(
      "beforeend",
      `              <div class="add-ons__summary online-service__add-ons">
    <p class="selected__add-ons--name">${title}</p>
    <p class="plan-cost selected__add-ons--cost">+$ ${price}/mo</p>
    </div>`
    );
  });
  const total_container = document.querySelector(".total-container");
  total_container.insertAdjacentHTML(
    "beforeend",
    `
  <p class="total--name">
  Total (per <span class="period__name">${payPer}</span>)
  </p>
  <p class="total-cost">
  $<span class="total-num">${totalPrices}</span
  ><span class="total-period">/mo</span>
  </p>
  `
  );
}

/********************************************************************************************************************************************************* */

/****************************************************************here all the event happen *****************************************************************/

/********************************************************************************************************************************************************* */

document.addEventListener("DOMContentLoaded", function () {
  const contentActivated = document.querySelector(
    ".form-container.form_content__active"
  );
  manipulateBtnContainer(contentActivated);
});

step_container.addEventListener("click", function (e) {
  const stepItem = e.target.closest(".step-item");
  const stepClicked = Number(stepItem.dataset.stepnumber);

  // Move to step logic
  moveToStep(stepClicked);
});

goBack_step.addEventListener("click", function (e) {
  const contentActivated = document.querySelector(
    ".form-container.form_content__active "
  );
  const contentActivatedStep = Number(contentActivated.dataset.stepnumber);
  moveToStep(contentActivatedStep - 1);
});

next_step.addEventListener("click", function (e) {
  const currentPage = document.querySelector(
    ".form-container.form_content__active"
  );

  const contentActivatedStep = Number(currentPage.dataset.stepnumber);

  const newPage = document.querySelector(
    `.form-container.form__content__step${contentActivatedStep + 1}` // Increment step number
  );
  if (isFirstPage(currentPage)) {
    errorName.textContent = "";
    errorEmail.textContent = "";
    errorPhone.textContent = "";
    const userName = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const num = document.querySelector("#num").value;
    const { valid: validname, message: messagename } = verifyName(userName);
    if (!validname) {
      errorName.textContent = messagename;
      return;
    }
    const { valid: validemail, message: messageemail } = verifyEmail(email);
    if (!validemail) {
      errorEmail.textContent = messageemail;
      return;
    }
    errorName.textContent = "";
    errorEmail.textContent = "";
    errorPhone.textContent = "";
    user.username = userName;
    user.email = email;
    user.phoneNumber = num;
  } else if (isLastPage(newPage)) {
    displaySummary();
  }

  moveToStep(Number(contentActivatedStep) + 1);

  manipulateBtnContainer(newPage);
});

planLists.addEventListener("click", function (e) {
  const plan = e.target.closest(".plan");
  const planPicked = Number(plan.dataset.planoption);
  pickPlan(planPicked);
});

switchElement.addEventListener("click", () => {
  if (monthlyOption.classList.contains("switch-option-active")) {
    monthlyOption.classList.remove("switch-option-active");
    indicationDiv.classList.add("switch-annualy");
    annualOption.classList.add("switch-option-active");
    user.payPer = "annualy";
  } else {
    // Switch to monthly
    annualOption.classList.remove("switch-option-active");

    monthlyOption.classList.add("switch-option-active");
    indicationDiv.classList.remove("switch-annualy");
    user.payPer = "monthly";
  }
});

add_ons__container.addEventListener("click", function (e) {
  const addOnSelected = e.target.closest(".add_ons");
  const checkbox = addOnSelected.querySelector("input");

  checkbox.checked = !checkbox.checked;
  if (checkbox.checked) {
    addOnSelected.classList.add("active");
  } else {
    addOnSelected.classList.remove("active");
  }
  const add_on_picked = [...document.querySelectorAll(".add_ons.active")];
  for (let el of add_on_picked) {
    user.addOns.push(
      addOnsOption.find((addOn) => addOn.option === Number(el.dataset.addon))
    );
  }
});
