 var db=firebase.firestore();
var syjs;
var modify1;
var tempregid;
var tempregname;
var tempreguser;
var tempregpass;
var appindex;

var tempappid;
var address,dist,email,name,gender,phone ,snumber,last,first,mi;

var edsubjcode,edsubjday,edsubjname,edsubjroom,edsubjsec, edsubjsem,edsubjtime, edsubjunit, edsubjyear;
 const cafeList = document.querySelector('#batch');
 const cafeList2 = document.querySelector('#course');
 const sectionsched = document.querySelector('#sectionsched');
 const reg = document.querySelector('#registrar');
 const table = document.querySelector('#temptable');
 const tablecourse = document.querySelector('#tablecourse');
 const tablebatch = document.querySelector('#tablebatch');
 const tablesec = document.querySelector('#tablesec');
const tableshsyear = document.querySelector('#tableshsyear');
const table1st = document.querySelector('#table1styear');
 const cafeList4 = document.querySelector('#year1st');
const cafeList5 = document.querySelector('#shsyear');
 var lbl2 =  document.getElementById('labalenrollees');
 var lbl3 =  document.getElementById('labalapplicants');
var lbl4 = document.getElementById('labalenrolled');
           
 //for batch
function renderCafe(doc){
   
   
    let tr= document.createElement('tr');
    let batch = document.createElement('td');
    let room = document.createElement('td');
    let  quantity= document.createElement('td');
    let time = document.createElement('td');
    let date = document.createElement('td');
 
    
     
        tr.setAttribute('id', doc.id);
    tr.setAttribute('class' , "tr1");
     
    tr.setAttribute('data-toggle', "modal" );
    tr.setAttribute('data-target', "#myModal");
    var i = doc.data().batch;
 var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
       i =  i + "st";
    }
  else  if (j == 2 && k != 12) {
          i =  i + "nd";
    }
    else if (j == 3 && k != 13) {
          i =  i + "rd";
    }
    else
     {
         i =  i + "th";
     }
    
   
    batch.textContent = i;   
    room.textContent = doc.data().room;
     room.setAttribute('id', doc.data().batch+doc.data().room +"room");
    quantity.textContent =  doc.data().quantity;
    quantity.setAttribute('id', doc.data().batch+doc.data().room + "size");
    batch.setAttribute('id', doc.data().batch+doc.data().room +"batch");
    tempid=doc.data().batch+doc.data().room + "size";
    time.textContent = doc.data().timestart + "-" +doc.data().timeend;
    date.textContent = doc.data().date;
    tr.appendChild(batch);
    tr.appendChild(room);
    tr.appendChild(time);
    tr.appendChild(date);
    tr.appendChild(quantity);
    tablebatch.appendChild(tr);
    cafeList.appendChild(tablebatch);
     tr.addEventListener('click', (e) => {
     document.getElementById('btnmodal1').textContent = "Edit";
     document.getElementById('btnmodal2').textContent = "Delete";            
     document.getElementById('modaltitle').textContent =  "Batch:" + document.getElementById( doc.data().batch+doc.data().room +"batch").textContent +  "     Room:" +document.getElementById( doc.data().batch+doc.data().room +"room").textContent  ;
    document.getElementById('modalbody').textContent =  "Delete this data?";
    });
}
    db.collection('batchANDroom').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
 
            if(change.type =='added')
                {
                      
                      renderCafe(change.doc);
                }
            else if(change.type =='modified')
            {
                var item =document.getElementById(change.doc.data().batch+change.doc.data().room + "size");
                  item.style.color = "red";
              
               item.textContent = change.doc.data().quantity;
                   
            }

    });
});
 
// getting data
/*db.collection('studentForms').where('qualified', '==', 'PENDING').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
         
                         renderCafe(doc);
    });
});*/
    //for courses

function renderCafe2(doc)
{
    let tr= document.createElement('tr');
    let coursename = document.createElement('td');
    let program = document.createElement('td');
    let  section= document.createElement('td');
    let size = document.createElement('td'); 
    tr.setAttribute('id', doc.id);
    tr.setAttribute('class' , "tr1");
    
    tr.setAttribute('data-toggle', "modal" );
    tr.setAttribute('data-target', "#myModal");
     coursename.textContent = doc.data().college;
    program.textContent = doc.data().program;
    section.textContent = doc.data().sectioncode;
    
        section.setAttribute('id', doc.id+doc.data().sectioncode);
     size.setAttribute('id', doc.data().sectioncode + "size");
    size.textContent = doc.data().size;
    
 
     tr.appendChild(coursename);
     tr.appendChild(program);
     tr.appendChild(section);
     tr.appendChild(size);
     tablecourse.appendChild(tr);
 
    cafeList2.appendChild(tablecourse);
     
    tr.addEventListener('click', (e) => {
            document.getElementById('btnmodal1').textContent = "Delete";
        
          document.getElementById('btnmodal2').textContent = "Delete";            
     document.getElementById('modaltitle').textContent =  "Section Code: " + document.getElementById(doc.id+doc.data().sectioncode).textContent;
    document.getElementById('modalbody').textContent =  "Delete this data?";
    });
   
}

     //for courses                 
    db.collection('courses').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
                   if(change.type =='added' )
                {
                    
                      renderCafe2(change.doc);
                }
            else if(change.type =='modified')
            {
                  var item = document.getElementById(change.doc.data().sectioncode + "size");
                if(item === change.doc.data().size) 
                {
                    
                }
                else
                    {
                         item.style.color = "red";
               item.textContent = change.doc.data().size; 
                    }
              
               
            }
    });
});

function sectionRender(doc)
{
    let tr= document.createElement('tr');
 
    let subjsection = document.createElement('td');
    let  subjcode= document.createElement('td');
    let subjname = document.createElement('td');
    let subjunit = document.createElement('td');    
    let subjtime = document.createElement('td');
    let subjroom = document.createElement('td');
    let subjday = document.createElement('td');
     let subjsem = document.createElement('td');
    let subjyear = document.createElement('td');
    tr.setAttribute('id', doc.id);
    tr.setAttribute('class' , "tr1");   
    tr.setAttribute('data-toggle', "modal" );
    tr.setAttribute('data-target', "#myModal"); 
    subjsection.textContent = doc.data().section;
    subjname.textContent = doc.data().name;
    subjunit.textContent = doc.data().unit;
    subjtime.textContent = doc.data().time;
    subjroom.textContent = doc.data().room;
    subjday.textContent = doc.data().day;
    subjcode.textContent = doc.data().code;  
    subjsem.textContent = doc.data().sem;
    subjyear.textContent = doc.data().year; 
     tr.appendChild(subjcode);
     tr.appendChild(subjname);
     tr.appendChild(subjday);
     tr.appendChild(subjunit);
     tr.appendChild(subjtime);
     tr.appendChild(subjroom);
     tr.appendChild(subjsection);
     tr.appendChild(subjsem);
     tr.appendChild(subjyear);
     tablesec.appendChild(tr); 
     sectionsched.appendChild(tablesec); 
    tr.addEventListener('click', (e) => {
            let x1 =   document.getElementById('btnmodal1');
            let x2 =   document.getElementById('btnmodal2');
            x1.setAttribute('onclick', "subjedit()");
            x2.setAttribute('onclick', "subjdelete()");
            document.getElementById('btnmodal1').textContent = "Edit"; 
          document.getElementById('btnmodal2').textContent = "Delete";  
        tempappid = doc.id;
        edsubjcode = doc.data().code;
        edsubjsec = doc.data().section;
        edsubjname = doc.data().name;
        edsubjroom = doc.data().room;
        edsubjday = doc.data().day;
        edsubjsem = doc.data().sem;
        edsubjtime= doc.data().time;
        edsubjunit= doc.data().unit;
        edsubjyear= doc.data().year;
     document.getElementById('modaltitle').textContent =  "Subject Code: " + edsubjcode;  
    document.getElementById('modalbody').textContent =  "What to Do?";
    });
   
}

 db.collection('subjects').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      if(change.type =='added')
          {
              sectionRender(change.doc);
          }

    });
});
 
 function renderCafe3(doc)
{

        let edit = document.createElement('button');
        let del = document.createElement('button');   
        let tr= document.createElement('tr');
        let regtemp = document.createElement('td');
        let codetemp = document.createElement('td');
        let  usertemp= document.createElement('td');
        let passwordtemp = document.createElement('td'); 
        tr.setAttribute('id', doc.id);
        tr.setAttribute('class' , "tr1");
        regtemp.textContent =  doc.data().name;   
        codetemp.textContent =  doc.data().code;
        codetemp.setAttribute('id', doc.id + doc.data().code);
        usertemp.textContent =  doc.data().username;
        passwordtemp.textContent =  doc.data().password; 
        tr.setAttribute('data-toggle', "modal" );
        tr.setAttribute('data-target', "#myModal");
        edit.textContent = "EDIT";
        del.textContent = "DELETE";
        tr.appendChild(codetemp);
        tr.appendChild(regtemp);
        tr.appendChild(usertemp);
        tr.appendChild(passwordtemp); 
        table.appendChild(tr);
        reg.appendChild(table);
 
         tr.addEventListener('click', (e) => {
            let x1 =   document.getElementById('btnmodal1');
            let x2 =   document.getElementById('btnmodal2');
            x1.setAttribute('onclick', "regedit()");
            x2.setAttribute('onclick', "regdelete()");
             tempregid = doc.data().code;
              tempregname = doc.data().name;
              tempreguser = doc.data().username;
              tempregpass = doc.data().password;
              appindex = tr.rowIndex;
            document.getElementById('btnmodal1').textContent = "Edit";
            document.getElementById('btnmodal2').textContent = "Delete";            
            document.getElementById('modaltitle').textContent =  "Registrar Code: " +  doc.id;
            document.getElementById('modalbody').textContent =  "What to do?";
    });
    
}

   db.collection('registrar').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
           
    
            if(change.type =='added')
                {
                      
                      renderCafe3(change.doc);
                }
 
    });
});

function render1st(doc)
{

    let tr= document.createElement('tr');
    let appid1 = document.createElement('td');
    let  section= document.createElement('td');
    let name1 = document.createElement('td');
    let program = document.createElement('td');
    let year = document.createElement('td');
    let phone = document.createElement('td');
    let college = document.createElement('td');
    tr.setAttribute('data-id', doc.id);
    tr.setAttribute('class' , "tr1");
    tr.setAttribute('data-toggle', "modal" );
    tr.setAttribute('data-target', "#myModal");
    program.textContent = doc.data().Program;
    college.textContent = doc.data().College;
    section.textContent =  doc.data().Section;
    phone.textContent = doc.data().Phone;
    year.textContent = doc.data().Year;
    appid1.textContent = doc.data().StudentNumber;
    name1.textContent =doc.data().LastName + ","+ doc.data().FirstName +" "+ doc.data().MiddleInitial;    
    tr.appendChild(appid1);
    tr.appendChild(name1);
    tr.appendChild(section);
    tr.appendChild(college);
    tr.appendChild(program);
    tr.appendChild(year);
    tr.appendChild(phone);
    table1st.appendChild(tr);
    cafeList4.appendChild(table1st);
    tr.addEventListener('click', (e) => {
          let x =   document.getElementById('btnmodal1');
          x.setAttribute('onclick', "done()");
           document.getElementById('btnmodal2').style.display ="none";
          /*x2.setAttribute('onclick', "delete()");*/
            tempappid = doc.id;
            appindex = tr.rowIndex;
            snumber = appid1.textContent;
            address = doc.data().Address;
            college = doc.data().College;
            dist = doc.data().DistrictNo;
            email = doc.data().Email;
            gender = doc.data().Gender;
            last = doc.data().LastName;
            first = doc.data().FirstName;
            mi = doc.data().MiddleInitial;
            document.getElementById('btnmodal1').textContent ="Back";
            document.getElementById('modalbody').textContent =  
              "Student# :" + snumber + "\n" +
              "Address: " + address + "\n"+ 
               "College: " + college + "\n"+ 
                "District# :" +dist + "\n" +
                "Email: " + email  + "\n" + 
                "Gender: " + gender + "\n";
          document.getElementById('modaltitle').textContent = last + " " + first+ " "+mi;
    });
    
}


 db.collection('studentForms').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        
         if(change.doc.data().Education === "COLLEGE" && change.doc.data().Year.substr(4,7) ==="Year" && change.doc.data().Status === "Enrolled")   
            {
            render1st(change.doc);
            }
     
              else if(change.type == 'modified' && change.doc.data().Education === "COLLEGE" && change.doc.data().Year.substr(4,7) ==="Year" &&
               change.doc.data().Status==="Enrolled")   
            {
            render1st(change.doc);
            }
         
    });
});

function rendershsyear(doc)
{
 
    let tr= document.createElement('tr');
    let appid1 = document.createElement('td');
    let  section= document.createElement('td');
    let name1 = document.createElement('td');
    let program = document.createElement('td');
    let year = document.createElement('td');
    let phone = document.createElement('td');
    tr.setAttribute('data-id', doc.id);
    tr.setAttribute('class' , "tr1");
    tr.setAttribute('data-toggle', "modal" );
    tr.setAttribute('data-target', "#myModal");
    program.textContent = doc.data().Program;
    section.textContent = doc.data().Section;
    phone.textContent = doc.data().Phone;
    year.textContent = doc.data().Year;
    appid1.textContent = doc.data().StudentNumber;
    name1.textContent =doc.data().LastName + ","+ doc.data().FirstName +" "+ doc.data().MiddleInitial;  
    tr.appendChild(appid1);
    tr.appendChild(name1);
    tr.appendChild(section);
    tr.appendChild(program);
    tr.appendChild(year);
    tr.appendChild(phone);
    tableshsyear.appendChild(tr);
    cafeList5.appendChild(tableshsyear);
    tr.addEventListener('click', (e) => {
        let x =   document.getElementById('btnmodal1');
        x.setAttribute('onclick', "done()");
        document.getElementById('btnmodal2').style.display ="none";
        /*x2.setAttribute('onclick', "delete()");*/
        tempappid = doc.id;
        appindex = tr.rowIndex;
        snumber = appid1.textContent;
        address = doc.data().Address;
        college = doc.data().College;
        dist = doc.data().DistrictNo;
        email = doc.data().Email;
        gender = doc.data().Gender;
        document.getElementById('btnmodal1').textContent ="Back";
     
        document.getElementById('mbody').textContent =  
              "Student# :" + snumber + "\n" +
              "Address: " + address + "\n"+ 
               "College: " + college + "\n"+ 
                "District# :" +dist + "\n" +
                "Email: " + email  + "\n" + 
                "Gender: " + gender + "\n";
        last = doc.data().LastName;
        first = doc.data().FirstName;
        mi = doc.data().MiddleInitial;
        document.getElementById('modaltitle').textContent = last + " " + first+ " "+mi;
          
    });
    
}


 db.collection('studentForms').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        
         if(change.type == 'added' && change.doc.data().Education === "SHS" && change.doc.data().Year.substr(0,5) === "Grade"  && change.doc.data().Status === "Enrolled")   
            {
            rendershsyear(change.doc);
            }
       
             else if(change.type == 'modified' && change.doc.data().Education === "SHS" && change.doc.data().Year.substr(0,5) === "Grade"  && change.doc.data().Status ==="Enrolled" )   
            {
            rendershsyear(change.doc);
            }
        
    });
});




 function regedit()
{
    document.getElementById('codetempdiv').style.display ="block";
    document.getElementById('codetempdiv2').style.display ="none";
    document.getElementById('txtcode').value = tempregid;
    document.getElementById('txtname').value = tempregname;
    document.getElementById('txtedituser').value = tempreguser;
    document.getElementById('txteditpass').value = tempregpass;
    
    $('#myModal').modal('hide');
    
}


 function regdelete()
{
    
}
 function subjedit()
{
    var secselect = document.getElementById("secselect");
    var secsubyear = document.getElementById("secsubjyear");
    var option1 = document.createElement("option");
    var option2 = document.createElement("option");
    var option3= document.createElement("option");
    var option4= document.createElement("option");
    var option5= document.createElement("option");               
    var option7= document.createElement("option");
    var tempsec = edsubjsec.replace(/[^A-Za-z]/g, "");
    
       if(tempsec.value === "ABM" ||
          secselect.value === "STEM" ||
          secselect.value === "HUMSS" ||
          secselect.value === "GA"  )
            {
                secsubyear.options.length = 0;
                option1.text="Grade 11";
                option2.text="Grade 12";
        
                secsubyear.add(option1);
                secsubyear.add(option2);
           
            }
            else
            {
                secsubyear.options.length = 0;
                option1.text="1st Year";
                option2.text="2nd Year";
                option3.text="3rd Year";
                option4.text="4th Year";
                option5.text="5th Year";
                secsubyear.add(option1);
                secsubyear.add(option2);
                secsubyear.add(option3);
                secsubyear.add(option4);
                secsubyear.add(option5);
            }
    var char =edsubjsec.replace(/[^A-Za-z]/g, "");
    var num =  edsubjsec.replace(/[^0-9]/g, "");
        document.getElementById("secsubjyear").value = edsubjyear;
        document.getElementById("secsubjsem").value = edsubjsem;
        document.getElementById("secselect").value = char;
        document.getElementById("subjyearsem").value = num;
        document.getElementById("subjnametxt").value = edsubjname;
        document.getElementById("subjcodetxt").value = edsubjcode;
        document.getElementById("subjunittxt").value = edsubjunit;
        document.getElementById("sectime1").value =  edsubjtime.slice(0,2);
        document.getElementById("sectime2").value = edsubjtime.slice(3,5);  
        document.getElementById("sectimeAMPM").value= edsubjtime.slice(5,7);  
        document.getElementById("sectime3").value =  edsubjtime.slice(8,10);  
        document.getElementById("sectime4").value=  edsubjtime.slice(11,13);  
        document.getElementById("sectimeAMPM2").value=  edsubjtime.slice(13,15); 
        document.getElementById("subjroomtxt").value = edsubjroom;
        document.getElementById("subjdaytxt").value = edsubjday; 
     
        document.getElementById("subjproc").style.display = "none";
        document.getElementById("subjedit").style.display = "inline";
        document.getElementById("subjsave").style.display = "inline";
      $('#myModal').modal('hide');
}
 function subjdelete()
{
    
}
function done()
{
   
    $('#myModal').modal('hide');
}

db.collection('studentForms').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
     
        if(change.type == 'added' ){
             if(change.doc.data().Qualified === "YES" &&  change.doc.data().Status ==="Enrollee")   
            {
            enrollees = enrollees + 1;
  
            }
     
             else if(change.doc.data().Status  === "Applicant"  || change.doc.data().Status ==="For Clearance")   
            {
            applicants = applicants + 1;
           
        } 
            else if(change.doc.data().Qualified === "YES"    
            &&  
                 change.doc.data().Status  === "Enrolled" )
                {
                    enrolled = enrolled + 1;
                }
         
        }
        
           else if( change.type == 'modified')
            {
 
             if(change.doc.data().Qualified === "YES" &&  change.doc.data().Status ==="Enrollee" &&  change.doc.data().Year ==="")   
            {
                enrollees = enrollees + 1;
                if(applicants !=0)
                    {
                applicants = applicants - 1;
                    }
            }
   
             else if(change.doc.data().Qualified === "NO")   
            {
                if(applicants != 0)
                    {
                          applicants = applicants - 1;
                    }
          
           
        } 
                   else if(change.doc.data().Qualified === "YES" &&  (change.doc.data().Year.substr(4,7) ==="Year" || change.doc.data().Year.substr(0,5) === "Grade") && 
                    change.doc.data().Status  === "Ongoing"  )    
            {
                enrolled = enrolled + 1;
             if(applicants != 0)
                    {
                          applicants = applicants - 1;
                    }
                if(enrollees != 0)
                    {
                          enrollees = enrollees - 1;
                    }
           
        } 
    
       if(change.doc.data().Qualified === "YES" &&  change.doc.data().Status ==="Enrollee" &&  change.doc.data().Year !=="")   
            {
               enrollees = enrollees + 1;
                if(applicants !=0)
                    {
                 applicants = applicants - 1;
                    }
            }
            }
                lbl2.textContent= enrollees;
               lbl3.textContent= applicants;
                lbl4.textContent= enrolled;
        
    });
});