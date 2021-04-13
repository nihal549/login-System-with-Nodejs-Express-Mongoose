const form = document.querySelector('form')
const detail =document.querySelector('.status')

form.addEventListener('submit',verifyUser)


//verifing users from db

async function verifyUser(e){
    e.preventDefault()
    const email =form.email.value
    const password =form.password.value

    const result = await fetch('/login',{
         method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({
           email,password
        })
    })

    console.log(result.status)
    

    if(result.status===200){
         detail.classList.add('found')
         detail.innerText ='user found'
    }else{
          detail.classList.add('not-found')
          detail.innerText ='Invalid credentials'

    }
    
   
    


    
}