const colorPallete = document.querySelectorAll(".colors-column input");
const gradientBox = document.querySelector(".gradient-box");
const dropDowns = document.querySelector(".select-box select");
const textArea = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");
const gradientType = document.querySelector(".gradientTypes select");
const percenInput = document.querySelectorAll(".inputField input");
const percenBox = document.querySelector(".percenBox");
const dropdownContainer = document.querySelector(".dropdownContainer");
let inputField1 = 30,
  inputField2 = 70;

const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${randomColor.padStart(6, "0")}`;
};

const addGradientColor = (isRandom = false) => {
  console.log(inputField1, inputField2);
  let gradientColor = "";
  if (isRandom) {
    colorPallete[0].value = generateRandomColor();
    colorPallete[1].value = generateRandomColor();
  }

  switch (gradientType.value) {
    case "Linear-gradient":
      // Hide percentage box and show dropdown for direction
      percenBox.classList.add("hide");
      dropdownContainer.classList.remove("hide");

      // Create linear gradient using the selected direction and colors
      gradientColor = `linear-gradient(to ${dropDowns.value}, ${colorPallete[0].value}, ${colorPallete[1].value})`;
      break;

    case "Radial-gradient":
      // Show percentage box and hide direction dropdown
      percenBox.classList.remove("hide");
      dropdownContainer.classList.add("hide");

      // Create radial gradient using percentage values
      gradientColor = `radial-gradient(circle, ${colorPallete[0].value} ${inputField1}%, ${colorPallete[1].value} ${inputField2}%)`;
      break;

    default:
      // Handle cases where no matching gradient type is found
      break;
  }

  gradientBox.style.background = gradientColor;
  textArea.innerHTML = `background : ${gradientColor};`;
};
colorPallete.forEach((input) => {
  input.addEventListener("input", () => addGradientColor(false));
});

const copyBtnHandler = () => {
  navigator.clipboard.writeText(textArea.value);
  copyBtn.innerText = "Code Copied";
  setTimeout(() => {
    copyBtn.innerText = "Copy Code";
  }, 1500);
};
dropDowns.addEventListener("change", () => addGradientColor(false));
refreshBtn.addEventListener("click", () => addGradientColor(true));
copyBtn.addEventListener("click", copyBtnHandler);
gradientType.addEventListener("change", () => addGradientColor(false));

percenInput.forEach((input) => {
  input.addEventListener("change", () => {
    inputField1 = percenInput[0].value;
    inputField2 = percenInput[1].value;
    addGradientColor(false);
  });
});
