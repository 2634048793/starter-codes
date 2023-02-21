const addErrorStyle =(id:string)=>{
    let input = document.getElementById(id) as HTMLInputElement;
    let validate = () => {
      if (input.value === "") {
        input.classList.add("on-error");
      } else {
        input.classList.remove("on-error");
      }
    };
    input.addEventListener("input", validate);
    input.addEventListener("blur", validate); 
}