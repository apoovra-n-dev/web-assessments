//eventadd

let btn=document.getElementById("btn");
        
        let btnStyleMouseOver=()=>{
            btn.style.border="none";
            btn.style.backgroundImage=`linear-gradient(pink,blue,violet)`;
            btn.style.color="white"
            btn.style.padding="12px 18px";
            btn.style.borderRadius="8px";
            btn.style.boxShadow="0p 0px 5px grey"

        }
        let btnStyleMouseOut=()=>{
            btn.style.border="none";
            btn.style.backgroundImage=`linear-gradient(blue,violet,pink)`;
            btn.style.color="white"
            btn.style.padding="12px 18px";
            btn.style.borderRadius="20px";
            btn.style.boxShadow="0p 0px 5px black"

        }
        btn.addEventListener("mouseover",btnStyleMouseOver);
        btn.addEventListener("mouseout",btnStyleMouseOut);

        btn.removeEventListener("mouseover")


