

document.addEventListener("DOMContentLoaded", () => {
  const glasses = document.querySelectorAll(".glass-checkbox");
  const nameInput = document.querySelector("input[type='text']");
  const ageInput = document.querySelector("input[type='number']");


  loadData();


  glasses.forEach((glass, index) => {
    glass.addEventListener("click", () => {
      glass.classList.toggle("checked");
      saveData();
    });
  });

 
  nameInput.addEventListener("input", saveData);
  ageInput.addEventListener("input", saveData);

  function saveData() {
    const glassStates = [];
    glasses.forEach(glass => {
      glassStates.push(glass.classList.contains("checked"));
    });

    const data = {
      name: nameInput.value,
      age: ageInput.value,
      glasses: glassStates
    };

    localStorage.setItem("waterTrackerData", JSON.stringify(data));
  }

  function loadData() {
    const saved = localStorage.getItem("waterTrackerData");
    if (!saved) return;

    const data = JSON.parse(saved);

    nameInput.value = data.name || "";
    ageInput.value = data.age || "";

    glasses.forEach((glass, index) => {
      if (data.glasses && data.glasses[index]) {
        glass.classList.add("checked");
      }
    });
  }
});
