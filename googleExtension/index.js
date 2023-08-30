let myLeads=[]
const inpEl = document.getElementById("input-el")
const inpBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const dltBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

function render(leads){
    let listItems = ""
    for(let i = 0; i<leads.length; i++){
        
        listItems += `
        <li>
            <a target = '_blank' href = '${leads[i]}'>
                  ${leads[i]}
                </a>
        </li>
    `
      
}
    ulEl.innerHTML = listItems
}
if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

dltBtn.addEventListener("dblclick", function(){
    localStorage.clear
    myLeads=[]
    render(myLeads)
    console.log(leadsFromLocalStorage)
})


inpBtn.addEventListener("click", function()
{
    myLeads.push(inpEl.value)
    inpEl.value=""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads)

    console.log(localStorage.getItem("myLeads"))
})


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})