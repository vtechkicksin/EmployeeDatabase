(async () => {
  const data = await fetch("./src/data.json");
  const json = await data.json();
  let employee = json;

  let selectedEmployeeId = employee[0].id;
  let selectedEmployee = employee[0];

  let employeeList = document.querySelector(".Employee__name--list");
  let employeeInfo = document.querySelector(".Employee__single--info");

  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");

  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);
    const value = [...formData.entries()];
    const empData = {};
    value.forEach((e) => {
      empData[e[0]] = e[1];
    });

    empData.id = employee[employee.length - 1].id + 1;
    empData.age = new Date() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageurl = empData.imageurl || "https://via.placeholder.com/150";
    employee.push(empData);
    renderEmployee();

    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });

  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      console.log("selectedEmployeeId>>>>>", selectedEmployeeId);
      selectedEmployeeId = e.target.id;

      // selectedEmployee = e;
      console.log("selectedEmployeeId>>>>>", selectedEmployeeId);
      renderEmployee();
      renderSingleEmployee();
    }
    if (e.target.tagName === "I") {
      employee = employee.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );

      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employee[0]?.id || -1;
        selectedEmployee = employee[0] || {};
        renderSingleEmployee();
      }
      renderEmployee();
    }
  });

  const renderEmployee = () => {
    employeeList.innerHTML = "";
    employee.forEach((e) => {
      // console.log(e);
      const employee = document.createElement("span");
      employee.classList.add("employee__name--item");

      if (parseInt(selectedEmployeeId, 10) === e.id) {
        employee.classList.add("selected");
        selectedEmployee = e;
        console.log("selectedEmployee FRom renderEmployee", selectedEmployee);
      }

      employee.setAttribute("id", e.id);
      employee.innerHTML = `${e.firstName} ${e.lastName} <i class="employeeDelete">❌</i>`;
      employeeList.append(employee);
    });
  };

  const renderSingleEmployee = () => {
    // Employee Delete Logic - START
    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }
    // Employee Delete Logic - END

    employeeInfo.innerHTML = `<img src="${selectedEmployee.imageUrl}" /><span class="employees__single--heading">${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})</span><span>${selectedEmployee.address}</span><span>${selectedEmployee.email}</span><span>Mobile - ${selectedEmployee.contactNumber}</span><span>DOB - ${selectedEmployee.dob}</span>`;
  };
  renderEmployee();
})();
