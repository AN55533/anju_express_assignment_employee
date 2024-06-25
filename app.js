const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

let employee = [];
app.get('/',(req,res)=>
    {
        res.sendFile(path.join(__dirname,'public','search.html'))
    })

app.get('/add', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'add.html'));
});

app.get('/view', (req, res) => {
    // const detail = req.body;
    // console.log(req.body);
    // res.send(detail);
    // console.log(detail);
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
});

// app.get('/update',(req,res)=>
//     {
//         res.sendFile(path.join(__dirname,'public','update.html'))
//     })
    
    
    app.get('/employeedetails',(req,res)=>
    {
        res.sendFile(path.join(__dirname,'public','employeedetails.html'))
    })
    

// app.get('/views/:id', (req, res) => {
//     const id = req.params.id;
//     const employee = employee.find(view => view.id === parseInt(id));
//     if (!employee) {
//         return res.status(404).send('Task not found');
//     }
//     res.sendFile(path.join(__dirname, 'public', 'employeedetails.html'));
// });
app.post('/add',(req,res)=>
    {
        var{id,name,role}=req.body;
        id=parseInt(id);
        const newemp={id,name,role};
        employee.push(newemp);
        console.log(employee);
        console.log('added')
        res.redirect('/view')
    
    })


    app.get('/view/data',(req,res)=>{
        res.json(employee)
    })
    
    app.get('/update/:id',(req,res)=>
    {
     const eid=req.params.id;
     const details=employee.find(emp=>emp.id==parseInt(eid));
    //  console.log(eid);
     if(!details){
        return res.status(404).json({error:'task not found'});
     }
    
        console.log("updation id:")
        console.log(eid);
        res.sendFile(path.join(__dirname,'public','update.html'))
        
    })
    
    app.post('/update/data/:id',(req,res)=>
    {
        let {id,name,role}=req.body;
        id=parseInt(id)
        const update={id,name,role}
        const reqid=req.params.id;
        let details = employee.findIndex(emp => emp.id === parseInt(reqid));
        // 
        
        if (details !== -1) {
            employee[details] = { ...employee[details], ...update };
        }
        res.redirect('/view')
    
    })
    
    
    app.get('/employeedetails/:id',(req,res)=>
    {
        const id=req.params.id;
        const details=employee.find(emp=>emp.id==parseInt(id));
        console.log(id);
        if(!details){
            return res.status(404).json({error:'task not found'});
        }
        console.log(details)
        res.sendFile(path.join(__dirname,'public','employeedetails.html'))
    
    })
    
    
    
    
    
    
    app.get('/employeedetails/data/:id', (req, res) => {
        const id = req.params.id;
        //console.log(`Received ID: ${id}`);
        //console.log(emplist);
        
        const details = employee.find(emp => emp.id === parseInt(id)); // Ensure the types match
        console.log("search details:")
        console.log(details);
    
        res.json(details);
    });
    
    
    app.post('/delete/:id', (req, res) => {
        const id = req.params.id;
        console.log('Before deletion:', emplist);
        
        emplist = employee.filter(emp => emp.id !==parseInt( id));
    
        console.log('After deletion:', emplist);
        res.redirect('/view');
    });


app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});