const status = document.querySelector('.status-text')
const form = document.querySelector('form')

form.addEventListener('submit',addToDB)


//adding users to db
async function addToDB(e){
    e.preventDefault()
    const userName =form.user.value
    const password =form.password.value
    const email =form.email.value

   console.log(userName,password,email)
    const result =await fetch('/register',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({
            userName,password,email
        })
    })
    

  if(result.status===200){
    status.innerText ='Sucessfully Registered'
  }
  else{
    status.innerText ='invalid..'
    status.style.backgroundColor ='red'
  }

}
 