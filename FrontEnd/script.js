/* When the user clicks on any dropdown menu,
toggle between hiding and showing the dropdown content */
/* https://www.javatpoint.com/how-to-make-a-dropdown-menu-in-html */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/* Change the contents of Station dropdown depending on borough selection */
// https://stackoverflow.com/questions/30671620/how-to-change-dropdowns-values-based-on-a-selection-of-another-dropdown-using-jq/30671798
$('#NYC').on('change', function () {
    console.log($('#NYC').val());
    $('#Station').html('');
    if ($('#NYC').val() == "Brooklyn") {
        $('#Station').append('<option value="Station NULL">Select Station...</option><option value="Station 1">Station 1: Brooklyn</option>');
    } else if ($('#NYC').val() == "Queens") {
        $('#Station').append('<option value="Station NULL">Select Station...</option><option value="Station 2">Station 2: Queens</option>');
    } else if ($('#NYC').val() == "Manhattan") {
        $('#Station').append('<option value="Station NULL">Select Station...</option><option value="Station 3">Station 3: Manhattan</option>');
    } else if ($('#NYC').val() == "Bronx") {
        $('#Station').append('<option value="Station NULL">Select Station...</option><option value="Station 4">Station 4: Bronx</option>');
    } else if ($('#NYC').val() == "Staten Island") {
        $('#Station').append('<option value="Station NULL">Select Station...</option><option value="Station 5">Station 5: Staten Island</option>');
    } else {
        $('#Station').append('<option value="Station NULL">Select Station...</option><option value="NULL">Select...</option>');
    }
});

/* Only show comment/date input boxes if a Station is selected */
// https://stackoverflow.com/questions/15566999/how-to-show-form-input-fields-based-on-select-value?noredirect=1&lq=1
async function showInput () {
    console.log($('#Station').val());
    if ($("#Station").val() != "Station NULL") {
        $("#userInput").show()
    }
    else {
        $("#userInput").hide()
    }
}

$('#Station').on('change', showInput);

/* When a borough is selected, call the creation of the user comment table  */
$('#NYC').on('change', createTable);

/* Create the user comment table when borough is selected */
//https://www.w3schools.com/html/html_tables.asp
async function createTable () {
    console.log($("#NYC").val())

    let resp = await fetch("/api/GetComments?NYC=" + $("#NYC").val());
    let data = await resp.json();
    console.log(data); //Fetch previous user comments from Cosmos DB and store in data

    var table = document.createElement("table");
    table.style.padding = '4px';
    table.style.tableLayout = 'fixed'; //Create a new table with added CSS

    var header_row = document.createElement("tr"); //Create header row

    /* Create three headers with specific CSS; Station Name, User Comment, Date Posted */
    var th1 = document.createElement("th");
    th1.style.textAlign = "center";
    th1.style.color = "hsla(207, 69%, 74%, 1)";
    th1.style.padding = "5px";
    th1.style.border = "1 px solid black";
    th1.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";

    var th2 = document.createElement("th");
    th2.style.textAlign = "center";
    th2.style.color = "hsla(207, 69%, 74%, 1)";
    th2.style.padding = "5px";
    th2.style.border = "1 px solid black";
    th2.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";

    var th3 = document.createElement("th");
    th3.style.textAlign = "center";
    th3.style.color = "hsla(207, 69%, 74%, 1)";
    th3.style.padding = "5px";
    th3.style.border = "1 px solid black";
    th3.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";

    console.log(header_row);

    //Set names of all three headers
    th1.innerHTML = "Station Name";
    th2.innerHTML = "User Comment";
    th3.innerHTML = "Date Posted"

    //Add cells to header row, and then to the table
    header_row.appendChild(th1);
    header_row.appendChild(th2);
    header_row.appendChild(th3);
    table.appendChild(header_row);

    //Insert station names/user comments/date posted into separate cells and rows using a for loop
    for (var userInput of data) {
        
        var row = document.createElement("tr"); //create new row
        console.log(row);

        var td1 = document.createElement("td"); //create new cell for station name
        td1.style.padding = "5px";
        td1.style.border = "1 px solid black";
        td1.style.whiteSpace = "normal";
        td1.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";

        var td2 = document.createElement("td"); //create new cell for user comment
        td2.style.padding = "5px";
        td2.style.border = "1 px solid black";
        td2.style.whiteSpace = "normal";
        td2.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";

        var td3 = document.createElement("td"); //create new cell for date posted
        td3.style.padding = "5px";
        td3.style.border = "1 px solid black";
        td3.style.whiteSpace = "normal";
        td3.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";

        //Insert data into appropriate cells
        td1.innerHTML = userInput.station;
        td2.innerHTML = userInput.comment;
        td3.innerHTML = userInput.date;

        //Add new cells to the new row
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);

        //Add new row to table; Loop again for next comment
        table.appendChild(row); 
        }

    //Call table ID in html file, and paste newly created table into the HTML slot
    var websiteTable = document.getElementById("websiteTable");
    websiteTable.innerHTML = ""; 
    websiteTable.appendChild(table);   
}

/*Adds user input to Cosmos DB by calling the SaveComment function; Collects station name, borough, comment, and date*/
//https://stackoverflow.com/questions/19995927/adding-html-input-to-table 
document.getElementById("add").onclick = async function () {
    let resp = await fetch("/api/SaveComment",{
        method: "POST",
        body: JSON.stringify({
            NYC: $("#NYC").val(),
            station: $("#Station").val(),
            comment: $("#input").val(),
            date: $("#date").val(),
        }),
        headers: {
            "content-type": "application/json"
        }
    }) 

    console.log($("input").val())

    await createTable();
}

/* List of SI stations */
const listOfStatenIslandStations = [
    {
        station_name: 'St. George'
    },
    {
        station_name: 'Tompkinsville'
    },
    {
        station_name: 'Stapleton'
    },
    {
        station_name: 'Clifton'
    },
    {
        station_name: 'Grasmere'
    },
    {
        station_name: 'Old Town'
    },
    {
        station_name: 'Dongan Hills'
    },
    {
        station_name: 'Jefferson Avenue'
    },
    {
        station_name: 'Grant City'
    },
    {
        station_name: 'New Dorp'
    },
    {
        station_name: 'Oakwood Heights'
    },
    {
        station_name: 'Bay Terrace'
    },
    {
        station_name: 'Great Kills'
    },
    {
        station_name: 'Eltingville'
    },
    {
        station_name: 'Annadale'
    },
    {
        station_name: 'Huguenot'
    },
    {
        station_name: "Prince's Bay"
    },
    {
        station_name: 'Pleasant Plains'
    },
    {
        station_name: 'Richmond Valley'
    },
    {
        station_name: 'Arthur Kill'
    },
    {
        station_name: 'Tottenville'
    },
]




