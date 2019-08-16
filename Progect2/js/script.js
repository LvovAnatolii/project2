/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

	const listAllStudents = document.getElementsByClassName("student-item cf");
	const numberPages = Math.ceil(listAllStudents.length/10);
	const numberLastPageStudents = Math.trunc(10*((listAllStudents.length/10)- Math.floor(listAllStudents.length/10)));
	const button = document.createElement('button');
	const divNav = document.createElement("div");
	const ulNav = document.getElementsByTagName('ul')[0];
	const inputName = document.createElement("input");
	const searchStudent = document.getElementsByClassName("page-header cf")[0];
	const numberSearshPages = 0;

	// Show list one page  of students
	function showPage(numberPage, listStudents, lastPageStudents, numberPagesA){
		if (numberPage == numberPagesA && lastPageStudents >0){
				for (let i=0; i < lastPageStudents; i+=1){
					listStudents[(numberPage-1)*10+i].style.display='';
				}
		}	else{
			for (let i=0; i<10; i+=1){
				listStudents[(numberPage-1)*10+i].style.display='';
			}	}			
	}	
	// Hidden list of all students
	function hidePage(){
		for (let i=0; i<listAllStudents.length; i+=1){
			listAllStudents[i].style.display='none';
		}
	}
	//Create HTML with buttons of navigation
	function nav (numberPage, flag){
		let buttonsString = "";
			for (let i = 1; i <= numberPage; i+=1 ){
				buttonsString = buttonsString + "<button>"+i+"</button>"+" ";
			}
			if (flag == "sr"){
				buttonsString = buttonsString + "<button>Back</button>"				
			}
		divNav.innerHTML = buttonsString;
		divNav.className = "nav";
		ulNav.appendChild(divNav);
	}
	//Create string of search
	function search (){
		searchStudent.appendChild(button);
		button.className = "student-search input";
		button.textContent = "Student search";
		searchStudent.append(inputName);
		inputName.className = "student-search input";
	}
	//START	
	hidePage();
	showPage(1, listAllStudents, numberLastPageStudents, numberPages);
	nav (numberPages);
	search ();
	// Lisen number pages buttoms	
	 divNav.addEventListener ('click', () => {
			if (event.target.textContent <=numberPages){
				hidePage();
				showPage(event.target.textContent, listAllStudents, numberLastPageStudents, numberPages);
			}
	});
	// Lisen field of search and same mathematic
	button.addEventListener ('click', () => {
			let nameStudent = inputName.value;
			inputName.value = "";
			let namesArr = document.getElementsByTagName("h3");
			let searchedArr = [];
			for (let i = 0; i<listAllStudents.length; i+=1){
				let numbers = namesArr[i].textContent.indexOf(nameStudent.toLowerCase());
					if (numbers >0){
					searchedArr.push(i);					
				}
			}
			if (searchedArr.length>0){
				let listSearshStudents=[];
				for (let i = 0; i<searchedArr.length; i+=1){
					listSearshStudents.push(listAllStudents[searchedArr[i]]);				
				}			
				let numberSearshPages = Math.ceil(searchedArr.length/10);
				let numberSearshLastPageStudents = Math.trunc(10*((searchedArr.length/10)- Math.floor(searchedArr.length/10)));			
				hidePage();
				showPage(1, listSearshStudents, numberSearshLastPageStudents, numberSearshPages);
				nav(numberSearshPages, "sr");
			} else{
				alert('No results for'+' '+nameStudent);
				}
	});		
	// Lisen searshed number pages buttoms		
	divNav.addEventListener ('click', () => {
			if (event.target.textContent <=numberSearshPages){
				hidePage();
				showPage(event.target.textContent, listSearshStudents, numberSearshLastPageStudents, numberSearshPages);
			}else {
				if (event.target.textContent=="Back"){
					hidePage();
					showPage(1, listAllStudents, numberLastPageStudents, numberPages);
					nav (numberPages);
					search ();
				}
			}
	});