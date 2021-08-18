
/* https://www.javatpoint.com/how-to-make-a-dropdown-menu-in-html */
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
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

// https://stackoverflow.com/questions/30671620/how-to-change-dropdowns-values-based-on-a-selection-of-another-dropdown-using-jq/30671798
//Change the contents of Station dropdown depending on previous selection
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

/* Show/Hide input box if station is/isn't selected */
// https://stackoverflow.com/questions/15566999/how-to-show-form-input-fields-based-on-select-value?noredirect=1&lq=1
$('#Station').on('change', createTable)
//https://www.w3schools.com/html/html_tables.asp
async function createTable () {
    console.log($("#Station").val())

    if ($("#NYC").val() != "Station NULL") {
        $("#userInput").show()
    }
    else {
        $("#userInput").hide()
    }

    let resp = await fetch("/api/GetComments?station=" + $("#Station").val());
    let data = await resp.json();
    console.log(data);

    var table = document.createElement("table");
    table.style.border = '1pix solid black';

    var header_row = document.createElement("tr");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    console.log(header_row);

    th1.innerHTML = "Station Name";
    th2.innerHTML = "User Comment";

    header_row.appendChild(th1);
    header_row.appendChild(th2);
    table.appendChild(header_row);

    for (var userInput of data) {
        
        var row = document.createElement("tr");
        console.log(row);

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");

        td1.innerHTML = userInput.station;
        td2.innerHTML = userInput.comment;

        row.appendChild(td1);
        row.appendChild(td2);

        table.appendChild(row); }

    var websiteTable = document.getElementById("websiteTable");
    websiteTable.innerHTML = ""; 
    websiteTable.appendChild(table);   
}

/* Add user input to table that shows Station Name and User Input (not yet connected to Cosmos, does not save input) */
//https://stackoverflow.com/questions/19995927/adding-html-input-to-table 

document.getElementById("add").onclick = async function () {
    let resp = await fetch("/api/SaveComment",{
        method: "POST",
        body: JSON.stringify({
            station: $("#Station").val(),
            comment: $("#input").val()
        }),
        headers: {
            "content-type": "application/json"
        }
    }) 

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




