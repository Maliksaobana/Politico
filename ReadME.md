<h1 style="text-align: center; text-transform: uppercase;">Politico</h1>


<h2 style="text-align: center;">Project Overview</h2>


<p style="text-align: justify;">The general elections are around corner, hence it’s a political season. It is a platform which both the politicians and citizens can use. Politico enables citizens give their mandate to politicians running for different government offices while building trust in the process through transparency.</p>

<h4>Features</h4>
<ul>
    <li> Users can sign up.</li> 
    <li> Users can login.</li> 
    <li> Admin (electoral body) can create political parties.</li> 
    <li> Admin (electoral body) can delete a political party.</li> 
    <li> Admin (electoral body) can create different ​political offices</li>
    <li> Users can vote for only one politician per ​political office</li>
    <li> Users can see the results of election.</li> 
</ul>

### The backend was deployed using **RENDER**. 
<a href="https://politico-dmqc.onrender.com">https://politico-dmqc.onrender.com</a>

### The Frontend was deployed using **GIT HUB PAGES**. 
<a href="https://maliksaobana.github.io/Politico/UI/index.html">https://maliksaobana.github.io/Politico/UI/index.html</a>

The project was tracked using **TRELLO**. <a href='https://trello.com/invite/b/6a39c25c680e926c690727e6/ATTI77ef082cccbcd99cb23346a863a12e43E72B1A7E/my-trello-board'>View Trello Tracker</a>

### **Table Showing API Endpoints and Methods**

<table>
    <thead>
        <tr>
            <th>S/N</th>
            <th>Method</th>
            <th>Api Routes</th>
            <th>Api function</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>POST</td>
            <td><a href="/api/v1/auth/signin">/api/v1/auth/signin</a></td>
            <td>sign in user</td>
        </tr>
        <tr>
            <td>2</td>
            <td>POST</td>
            <td><a href="/api/v1/auth/signup">/api/v1/auth/signup</a></td>
            <td>register new user</td>
        </tr>
        <tr>
            <td>3</td>
            <td>POST</td>
            <td><a href="/api/v1/office/createoffice">/api/v1/office/createoffice</a></td>
            <td>create a political office admin only</td>
        </tr>
        <tr>
            <td>4</td>
            <td>POST</td>
            <td><a href="/api/v1/party/createparty">/api/v1/party/createparty</a></td>
            <td>create a political party admin only</td>
        </tr>
        <tr>
            <td>5</td>
            <td>POST</td>
            <td><a href="/api/v1/petition/makepetition/:id">/api/v1/petition/makepetition/:id</a></td>
            <td>create a petition against a political candidate</td>
        </tr>
        <tr>
            <td>6</td>
            <td>POST</td>
            <td><a href="/api/v1/office/register/:id">/api/v1/office/register/:id</a></td>
            <td>register a political candidate running for an office admin only</td>
        </tr>
        <tr>
            <td>7</td>
            <td>POST</td>
            <td><a href="/api/v1/winner/:id">/api/v1/winner/:id</a></td>
            <td>declare a political cabdidate winner of an office admin only</td>
        </tr>
        <tr>
                <td>8</td>
                <td>GET</td>
                <td><a href="/api/v1/auth/profile">/api/v1/auth/profile</a></td>
                <td>Use to get user Profile</td>
            </tr>
            <tr>
                <td>9</td>
                <td>GET</td>
                <td><a href="/api/v1/vote/">/api/v1/vote/</a></td>
                <td>Get all political participant</td>
            </tr>
            <tr>
                <td>10</td>
                <td>GET</td>
                <td><a href="/api/v1/vote/contestant/:id">/api/v1/vote/contestant/:id</a></td>
                <td>Get a Particular political participant</td>
            </tr>
            <tr>
                <td>11</td>
                <td>GET</td>
                <td><a href="/api/v1/winner/">/api/v1/winner/</a></td>
                <td>Get all Political winners</td>
            </tr>
            <tr>
                <td>12</td>
                <td>GET</td>
                <td><a href="/api/v1/office/register/">/api/v1/office/register/</a></td>
                <td>Get all candidate interested in running for office</td>
            </tr>
            <tr>
                <td>13</td>
                <td>GET</td>
                <td><a href="/api/v1/petition">/api/v1/petition</a></td>
                <td>Get all petition made against a candidate</td>
            </tr>
            <tr>
                <td>14</td>
                <td>GET</td>
                <td><a href="/api/v1/petition/petitiondetails/:id">/api/v1/petition/petitiondetails/:id</a></td>
                <td>Get petition detail made by a particular user</td>
            </tr>
            <tr>
                <td>15</td>
                <td>GET</td>
                <td><a href="/api/v1/party/partylist">/api/v1/party/partylist</a></td>
                <td>Get all political parties</td>
            </tr>
            <tr>
                <td>16</td>
                <td>GET</td>
                <td><a href="/api/v1/party/partylist/:id">/api/v1/party/partylist/:id</a></td>
                <td>Get a Particular political party</td>
            </tr>
            <tr>
                <td>17</td>
                <td>GET</td>
                <td><a href="/api/v1/office/officelst">/api/v1/office/office</a></td>
                <td>Get all political office</td>
            </tr>
            <tr>
                <td>18</td>
                <td>GET</td>
                <td><a href="/api/v1/office/officelist/:id">/api/v1/office/officelist/:id</a></td>
                <td>Get a particular political office</td>
            </tr>
            <tr>
                <td>19</td>
                <td>DELETE</td>
                <td><a href="/api/v1/office/officelist/:id">/api/v1/office/officelist/:id</a></td>
                <td>Delete a particular political office</td>
            </tr>
            <tr>
                <td>20</td>
                <td>DELETE</td>
                <td><a href="/api/v1/party/deleteparty/:id">/api/v1/party/deleteparty/:id</a></td>
                <td>Delete a particular Party</td>
            </tr>
            <tr>
                <td>21</td>
                <td>PATCH</td>
                <td><a href="/api/v1/auth/profile/edit">/api/v1/auth/profile/edit</a></td>
                <td>Use to Update user Profile</td>
            </tr>
            <tr>
                <td>22</td>
                <td>PATCH</td>
                <td><a href="/api/v1/vote/:id">/api/v1/vote/:id</a></td>
                <td>Vote for political participant of choice</td>
            </tr>
            <tr>
                <td>23</td>
                <td>PATCH</td>
                <td><a href="/api/v1/auth/forgetpassword">/api/v1/auth/forgetpassword</a></td>
                <td>Update a user Password</td>
            </tr>
            <tr>
                <td>24</td>
                <td>PATCH</td>
                <td><a href="/api/v1/winner/:id">/api/v1/winner/:id</a></td>
                <td>Declare a Political participant winner</td>
            </tr>
            <tr>
                <td>25</td>
                <td>PATCH</td>
                <td><a href="/api/v1/office/register/:id">/api/v1/office/register/:id</a></td>
                <td>Approve candidate interested in running for office</td>
            </tr>
            <tr>
                <td>26</td>
                <td>PATCH</td>
                <td><a href="/api/v1/petition/:id">/api/v1/petition/:id</a></td>
                <td>Edit petition detail made by a particular user, admin only</td>
            </tr>
            <tr>
                <td>27</td>
                <td>PATCH</td>
                <td><a href="/api/v1/party/partylist/join/:id">/api/v1/party/partylist</a></td>
                <td>Join a particular political party</td>
            </tr>
            <tr>
                <td>28</td>
                <td>PATCH</td>
                <td><a href="/api/v1/party/editparty/:id">/api/v1/party/editparty/:id</a></td>
                <td>Edit a Particular political party</td>
            </tr>
            <tr>
                <td>29</td>
                <td>PATCH</td>
                <td><a href="/api/v1/office/officelist/edit/:id">/api/v1/officelist/edit/:id</a></td>
                <td>Edit a partcular political office, admin only</td>
            </tr>
    </tbody>
</table>