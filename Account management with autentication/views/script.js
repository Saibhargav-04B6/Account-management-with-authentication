// Handling Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userid',data.id)
            window.location.href = data.role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
        } else {
            alert('Login failed: ' + data.error);
        }           
    } catch (error) {
        console.error('Error during login:', error);
    }
});

// Handling Registration Form Submission
document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Registration successful!');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed: ' + data.error);
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
});

const ua = document.querySelector('#account-management');
var reg=document.getElementById('regform');
var reg1=document.getElementById('regform1');
const uL = document.getElementById('userList');
// Fetching User Data for Admin Dashboard
async function fetchUsers() {
    try {
        const response = await fetch('/admin/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const users = await response.json();
        reg.style.display="none";
        ua.style.display="none";
        reg1.style.display="none";
        uL.style.display="block";
        const userList = document.getElementById('userList');
        if(users.length==0)
        {
            userList.innerHTML=`<div class="nodata"><b>No Data Found</b></div>`;
        }
        else{
        userList.innerHTML = `
        <h3>UserList</h3><table>
        <thead>
            <th>UserId</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
        </thead>
        <tbody id="dt">
        </tbody>
    </table>`;
    var a=document.getElementById('dt');
        users.forEach(user => {
            dt.innerHTML+=`<tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td><div class="act">
        <button onclick="editdata(${user.id})">Update</button>
        <button onclick="deletedata(${user.id})">Delete</button>
        <button onclick="makeadmin(${user.id})">Make Admin</button> 
    </div></td>
        </tr>`;
        
        });}
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
async function fetchAdmins() {
    try {
        const response = await fetch('/admin/admins', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        const users = await response.json();
        reg.style.display="none";
        ua.style.display="none";
        reg1.style.display="none";
        uL.style.display="block";
        const userList = document.getElementById('userList');
        if(users.length==0)
            {
                userList.innerHTML=`<div class="nodata"><b>No Data Found</b></div>`;
            }
            else{
        userList.innerHTML = `
        <h3>AdminList</h3><table>
        <thead>
            <th>AdminId</th>
            <th>AdminName</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
        </thead>
        <tbody id="dt">
        </tbody>
    </table>`;
    var a=document.getElementById('dt');
        users.forEach(user => {
            dt.innerHTML+=`<tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td><div class="act">
        <button onclick="editdata(${user.id})">Update</button>
        <button onclick="deletedata(${user.id})">Delete</button>
    </div></td>
        </tr>`;
        });}
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
function createUser()
{
    uL.style.display="none";
    ua.style.display="none";
    reg1.style.display="none";
    reg.style.display="block";
    var d=document.getElementById('regform');
    d.innerHTML=`<div class="container1">
        <h2>Register</h2>
        <form id="registerForm">
            <input type="text" id="username" placeholder="Username" required>
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
    </div>`;
    document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('Registration successful!');
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Registration failed: ' + data.error);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    });
}
function createAccount()
{
    uL.style.display="none";
        ua.style.display="none";
    reg.style.display="none";
    reg1.style.display="block";
    var d=document.getElementById('regform1');
    d.innerHTML=`<div class="mainform">
        <div class="mp" id="mp1">
        <form id="createform">
            <div class="ip">
                <H2>ACCOUNT DETAILS</H2>
            </div>
            <hr>
            <div class="ip">
                <label for="user_id">User Id:</label><br>
                <input type="text" id="user_id" name="user_id" placeholder="Enter userId" required>
            </div>
            <div class="ip">
                <label for="account_number">Account Number:</label><br>
                <input type="text" id="account_number" name="account_number" placeholder="Enter account number" required>
            </div>
            <div class="ip">
                <label for="account_name">Account Name:</label><br>
                <input type="text" id="account_name" name="account_name" placeholder="Enter account name" required>
            </div>
            <div class="ip">
                <label for="account_type">Account Type:</label><br>
                <select id="account_type" name="account_type" required>
                    <option>SAVINGS</option>
                    <option>CURRENT</option>
                    <option>FIXED</option>
                </select>
            </div>
            <div class="ip">
                <label for="balance">Balance:</label><br>
                <input type="text" id="balance" name="balance" placeholder="Enter balance" required>
            </div>
            <div class="ip">
                <label for="opening_date">Opening Date:</label><br>
                <input type="date" id="opening_date" name="opening_date" required>
            </div>
            <div class="ip">
                <label for="last_transaction_date">Last transaction Date:</label><br>
                <input type="date" id="last_transaction_date" name="last_transaction_date" required>
            </div>
            <div class="ip">
                <label for="status">Status:</label><br>
                <input type="text" id="status" name="status" placeholder="active / inactive" required>
            </div>
            <div class="ip">
                <label for="branch_name">Branch Name:</label><br>
                <input type="text" id="branch_name" name="branch_name" placeholder="Enter Branch Name" required>
            </div>
            <div class="ip">
                <input type="submit" id="submit">
            </div>
        </form>
    </div>
</div>`;
document.getElementById('createform')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = document.getElementById("createform");
    const formData = new FormData(form); 
    let formObj={};
formData.forEach((value,key)=>{
    formObj[key]=value;
});   
    try {
        const response = await fetch(`/user/accounts`, {
            method: 'POST',
            body: JSON.stringify(formObj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
      });

        const data = await response.json();

        if (response.ok) {
            alert('Creation successful!');
            window.location.href = 'admin-dashboard.html';
        } else {
            alert('Creating failed: ' + data.error);
        }
    } catch (error) {
        console.error('Error during Creation:', error);
    }
});

}

// Fetching Account Data for User Dashboard
async function fetchAccounts() {
    try {
        let a=localStorage.getItem('userid')
        const response = await fetch(`/user/accounts/${a}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const accounts = await response.json();
        const accountList = document.getElementById('accountList');
        if(!response.ok)
            {
               accountList.innerHTML=`<div class="nodata"><b>No Data Found</b></div>`;
            }
        else{
        accountList.innerHTML = '<h3>Your Accounts</h3>';
        accounts.forEach((account)=>{
            d=document.createElement('div');
            console.log(account);
            d.innerHTML = `
        <h2>Account Overview</h2>
        <p>Account Number: <span id="accountNumber">${account.account_number}</span></p>
        <p>Account Name: <span id="accountName">${account.account_name}</span></p>
        <p>Account Type: <span id="accountType">${account.account_type}</span></p>
        <p>Balance: <span id="balance">${account.balance}</span></p>
        <p>Opening Date: <span id="openingDate">${account.opening_date}</span></p>
        <p>Last Transaction Date: <span id="lastTransactionDate">${account.last_transaction_date}</span></p>
        <p>Status: <span id="status">${account.status}</span></p>
        <p>Branch Name: <span id="branchName">${account.branch_name}</span></p>
`
accountList.appendChild(d);
});}
    } catch (error) {
        console.error('Error fetching accounts:', error);
    }
}

// Logout Functionality
function logout() {
    localStorage.removeItem('token');
    if(localStorage.removeItem('userid')){
    localStorage.removeItem('userid');
    }
    window.location.href = 'login.html';
}

// Populate Account Overview
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('account-overview.html')) {
        const params = new URLSearchParams(window.location.search);
        const accountNumber = params.get('accountNumber');

        fetch(`/user/accounts/${accountNumber}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(account => {
            document.getElementById('accountNumber').textContent = account.account_number;
            document.getElementById('accountName').textContent = account.account_name;
            document.getElementById('accountType').textContent = account.account_type;
            document.getElementById('balance').textContent = account.balance;
            document.getElementById('openingDate').textContent = account.opening_date;
            document.getElementById('lastTransactionDate').textContent = account.last_transaction_date;
            document.getElementById('status').textContent = account.status;
            document.getElementById('branchName').textContent = account.branch_name;
        })
        .catch(error => console.error('Error fetching account details:', error));
    }
});
async function deletedata(id)
{
    let dl=confirm('Confirm to delete');
    if(dl)
    {
    let d=await fetch(`/admin/users/${id}`, {
        method: 'DELETE'
      });
      alert('deleted successfully')
    }
    else{
        alert('Not deleted')
    }
      window.location.href='/admin-dashboard.html';
}
async function makeadmin(id)
{
    let dl=confirm('Confirm as Admin');
    if(dl)
    {
    let d=await fetch(`/admin/make/${id}`);
      alert('Updated successfully')
    }
    else{
        alert('Not updated')
    }
      window.location.href='/admin-dashboard.html';
}
async function deleteaccount(id)
{
    let dl=confirm('Confirm to delete');
    if(dl)
    {
    let d=await fetch(`/user/accounts/${id}`, {
        method: 'DELETE',headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('deleted successfully')
    }
    else{
        alert('Not deleted')
    }
      window.location.href='/admin-dashboard.html';
}
async function editdata(id) {
    uL.style.display="none";
        ua.style.display="none";
    reg1.style.display="none";
    reg.style.display="block";
    var response=await fetch(`/admin/users/${id}`);
    var data=await response.json();
    var d=document.getElementById('regform');
    d.innerHTML=`<div class="container1">
    <h2>Register</h2>
    <form id="registerForm">
    <input type="text" id="username" placeholder="Username" required>
    <input type="email" id="email" placeholder="Email" required>
    <input type="password" id="password" placeholder="Password" required>
    <button type="submit">Update</button>
    </form>
    </div>`;
    document.getElementById('username').value=data[0].username;
    document.getElementById('email').value=data[0].email;
    document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch(`/admin/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
    
            const data = await response.json();
            
            if (response.ok) {
                alert('Updation successful!');
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Updation failed: ' + data.error);
            }
        } catch (error) {
            console.error('Error during updation:', error);
        }
    });
    
}
async function editaccount(id) {
    uL.style.display="none";
        ua.style.display="none";
    reg1.style.display="none";
    reg.style.display="block";
    var response=await fetch(`/user/accounts/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    );
    var data1=await response.json();
    var d=document.getElementById('regform');
    d.innerHTML=`<div class="mainform">
        <div class="mp" id="mp1">
        <form id="updateform">
            <div class="ip">
                <H2>ACCOUNT DETAILS</H2>
            </div>
            <hr>
            <div class="ip">
                <label for="user_id">User Id:</label><br>
                <input type="text" id="user_id" name="user_id" placeholder="Enter userId" required>
            </div>
            <div class="ip">
                <label for="account_number">Account Number:</label><br>
                <input type="text" id="account_number" name="account_number" placeholder="Enter account number" required>
            </div>
            <div class="ip">
                <label for="account_name">Account Name:</label><br>
                <input type="text" id="account_name" name="account_name" placeholder="Enter account name" required>
            </div>
            <div class="ip">
                <label for="account_type">Account Type:</label><br>
                <select id="account_type" name="account_type" required>
                    <option>SAVINGS</option>
                    <option>CURRENT</option>
                    <option>FIXED</option>
                </select>
            </div>
            <div class="ip">
                <label for="balance">Balance:</label><br>
                <input type="text" id="balance" name="balance" placeholder="Enter balance" required>
            </div>
            <div class="ip">
                <label for="opening_date">Opening Date:</label><br>
                <input type="date" id="opening_date" name="opening_date" required>
            </div>
            <div class="ip">
                <label for="last_transaction_date">Last transaction Date:</label><br>
                <input type="date" id="last_transaction_date" name="last_transaction_date" required>
            </div>
            <div class="ip">
                <label for="status">Status:</label><br>
                <input type="text" id="status" name="status" placeholder="active/inactive" required>
            </div>
            <div class="ip">
                <label for="branch_name">Branch Name:</label><br>
                <input type="text" id="branch_name" name="branch_name" placeholder="Enter Branch Name" required>
            </div>
            <div class="ip">
                <input type="submit" onsubmit="cc()" id="submit">
            </div>
        </form>
    </div>
</div>`;
document.getElementById('user_id').value=data1.user_id;
document.getElementById('account_number').value=data1.account_number;
document.getElementById('account_name').value=data1.account_name;
document.getElementById('account_type').value=data1.account_type;
document.getElementById('balance').value=data1.balance;
document.getElementById('opening_date').value=data1.opening_date;
document.getElementById('last_transaction_date').value=data1.last_transaction_date;
document.getElementById('status').value=data1.status;
document.getElementById('branch_name').value=data1.branch_name;
    document.getElementById('updateform')?.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const form = document.getElementById("updateform");
        const formData = new FormData(form); 
        let formObj={};
    formData.forEach((value,key)=>{
        formObj[key]=value;
    });   
        try {
            const response = await fetch(`/user/accounts/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formObj),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
          });
    
            const data = await response.json();
    
            if (response.ok) {
                alert('Updation successful!');
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Updation failed: ' + data.error);
            }
        } catch (error) {
            console.error('Error during updation:', error);
        }
    });

}
// function viewAccounts(){
function viewAccounts() {
    uL.style.display="none";
    reg1.style.display="none";
    reg.style.display="none";
    ua.style.display="block";
    const userm = document.querySelector('#account-management');
    userm.innerHTML=`<h2>Account Overview</h2>
    <table id="admin-account-table">
    <thead>
    <tr>
    <th>UserId</th>
    <th>Account Number</th>
    <th>Account Name</th>
    <th>Account Type</th>
    <th>Balance</th>
    <th>Opening Date</th>
    <th>Last Transaction Date</th>
    <th>Status</th>
    <th>Branch Name</th>
    <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <!-- Account data will be injected here by JavaScript -->
    </tbody>
    </table>`;
    const adminAccountTableBody = document.querySelector('#admin-account-table tbody');
    const userAccountTableBody = document.querySelector('#user-account-table tbody');
    
    function fetchAdminAccounts() {
        fetch('user/accounts',
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
        .then(response => response.json())
        .then(accounts => {
            adminAccountTableBody.innerHTML = '';
            accounts.forEach(account => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${account.user_id}</td>
                    <td>${account.account_number}</td>
                    <td>${account.account_name}</td>
                    <td>${account.account_type}</td>
                    <td>${account.balance}</td>
                    <td>${account.opening_date}</td>
                    <td>${account.last_transaction_date}</td>
                    <td>${account.status}</td>
                    <td>${account.branch_name}</td>
                    <td><div class="act">
       <button onclick="editaccount(${account.user_id})">Update</button>
       <button onclick="deleteaccount(${account.user_id})">Delete</button>
       </div></td>
                `;
                adminAccountTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching accounts:', error));
    }

    // Fetch accounts for the logged-in user
    function fetchUserAccounts() {
        fetch(`/user/accounts/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(accounts => {
            userAccountTableBody.innerHTML = '';
            accounts.forEach(account => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${account.account_number}</td>
                    <td>${account.account_name}</td>
                    <td>${account.account_type}</td>
                    <td>${account.balance}</td>
                    <td>${account.opening_date}</td>
                    <td>${account.last_transaction_date}</td>
                    <td>${account.status}</td>
                    <td>${account.branch_name}</td>
                `;
                userAccountTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching accounts:', error));
    }

        fetchAdminAccounts();
};
