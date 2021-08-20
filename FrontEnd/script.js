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
        $('#Station').append('<option value="Station NULL">Select Station...</option>'); //Add placeholder text outside of loop
        for (station in listOfBrooklynStations) {
            $('#Station').append('<option value="' + listOfBrooklynStations[station] + '">' + listOfBrooklynStations[station] + '</option>');
        }
    } else if ($('#NYC').val() == "Queens") {
        $('#Station').append('<option value="Station NULL">Select Station...</option>'); //Add placeholder text outside of loop
        for (station in listOfQueensStations) {
            $('#Station').append('<option value="' + listOfQueensStations[station] + '">' + listOfQueensStations[station] + '</option>');
        }
    } else if ($('#NYC').val() == "Manhattan") {
        $('#Station').append('<option value="Station NULL">Select Station...</option>'); //Add placeholder text outside of loop
        for (station in listOfManhattanStations) {
            $('#Station').append('<option value="' + listOfManhattanStations[station] + '">' + listOfManhattanStations[station] + '</option>');
        }
    } else if ($('#NYC').val() == "Bronx") {
        $('#Station').append('<option value="Station NULL">Select Station...</option>'); //Add placeholder text outside of loop
        for (station in listOfBronxStations) {
            $('#Station').append('<option value="' + listOfBronxStations[station] + '">' + listOfBronxStations[station] + '</option>');
        }
    } else if ($('#NYC').val() == "Staten Island") {
        $('#Station').append('<option value="Station NULL">Select Station...</option>'); //Add placeholder text outside of loop
        for (station in listOfStatenIslandStations) {
            $('#Station').append('<option value="' + listOfStatenIslandStations[station] + '">' + listOfStatenIslandStations[station] + '</option>');
        }
    } else {
        $('#Station').append('<option value="Station NULL">Select Station...</option><option value="NULL">Select...</option>');
    }
});

/* Only show comment/date input boxes if a Station is selected */
// https://stackoverflow.com/questions/15566999/how-to-show-form-input-fields-based-on-select-value?noredirect=1&lq=1
async function showInput() {
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
async function createTable() {
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
    console.log($('#Station').val())
    let resp = await fetch("/api/SaveComment", {
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

const longlistOfBrooklynStations = "Fourth Avenue/Ninth Street station,Seventh Avenue station (BMT Brighton Line),Seventh Avenue station (IND Culver Line),Eighth Avenue station (BMT Sea Beach Line),Ninth Avenue station,15th Street–Prospect Park station,18th Avenue station (BMT Sea Beach Line),18th Avenue station (BMT West End Line),18th Avenue station (IND Culver Line),20th Avenue station (BMT Sea Beach Line),20th Avenue station (BMT West End Line),25th Avenue station,25th Street station (BMT Fourth Avenue Line),36th Street station (BMT Fourth Avenue Line),45th Street station (BMT Fourth Avenue Line),50th Street station (BMT West End Line),53rd Street station (BMT Fourth Avenue Line),55th Street station,59th Street station (BMT Fourth Avenue Line),71st Street station,75th Street–Elderts Lane station,77th Street station (BMT Fourth Avenue Line),79th Street station (BMT West End Line),86th Street station (BMT Fourth Avenue Line),86th Street station (BMT Sea Beach Line),Alabama Avenue station,Atlantic Avenue–Barclays Center station,Atlantic Avenue station (BMT Canarsie Line),Avenue H station,Avenue I station,Avenue J station,Avenue M station,Avenue N station,Avenue P station,Avenue U station (BMT Brighton Line),Avenue U station (BMT Sea Beach Line),Avenue U station (IND Culver Line),Avenue X station,Bay 50th Street station,Bay Parkway station (BMT Sea Beach Line),Bay Parkway station (BMT West End Line),Bay Parkway station (IND Culver Line),Bay Ridge–95th Street station,Bay Ridge Avenue station,Bedford Avenue station,Bedford–Nostrand Avenues station,Bergen Street station (IND Culver Line),Bergen Street station (IRT Eastern Parkway Line),Beverley Road station,Beverly Road station,Brighton Beach station (BMT Brighton Line),Broadway Junction station,Broadway station (IND Crosstown Line),Bushwick Avenue–Aberdeen Street station,Canarsie–Rockaway Parkway station,Carroll Street station,Central Avenue station (BMT Myrtle Avenue Line),Chauncey Street station,Church Avenue station (BMT Brighton Line),Church Avenue station (IND Culver Line),Church Avenue station (IRT Nostrand Avenue Line),Clark Street station,Classon Avenue station,Cleveland Street station,Clinton–Washington Avenues station (IND Crosstown Line),Clinton–Washington Avenues station (IND Fulton Street Line),Coney Island–Stillwell Avenue station,Cortelyou Road station,Borough Hall/Court Street station,Crescent Street station (BMT Jamaica Line),Crown Heights–Utica Avenue station,Cypress Hills station,DeKalb Avenue station (BMT Canarsie Line),DeKalb Avenue station (BMT lines),Ditmas Avenue station,East 105th Street station,Eastern Parkway–Brooklyn Museum station,Euclid Avenue station (IND Fulton Street Line),Flatbush Avenue–Brooklyn College station,Flushing Avenue station (BMT Jamaica Line),Flushing Avenue station (IND Crosstown Line),Fort Hamilton Parkway station (BMT Sea Beach Line),Fort Hamilton Parkway station (BMT West End Line),Fort Hamilton Parkway station (IND Culver Line),Franklin Avenue/Botanic Garden station,Franklin Avenue–Fulton Street station,Fulton Street station (IND Crosstown Line),Gates Avenue station,Graham Avenue station,Grand Army Plaza station,Grand Street station (BMT Canarsie Line),Grant Avenue station (IND Fulton Street Line),Greenpoint Avenue station,Halsey Street station (BMT Canarsie Line),Halsey Street station (BMT Jamaica Line),Hewes Street station,High Street station (IND Eighth Avenue Line),Hoyt Street station,Hoyt–Schermerhorn Streets station,Jay Street–MetroTech station,Jefferson Street station,Junius Street station,Kings Highway station (BMT Brighton Line),Kings Highway station (BMT Sea Beach Line),Kings Highway station (IND Culver Line),Kingston Avenue station,Kingston–Throop Avenues station,Knickerbocker Avenue station,Kosciuszko Street station,Lafayette Avenue station (IND Fulton Street Line),Liberty Avenue station,Livonia Avenue station,Metropolitan Avenue/Lorimer Street station,Lorimer Street station (BMT Jamaica Line),Marcy Avenue station,Montrose Avenue station,Morgan Avenue station,Myrtle Avenue station (BMT Jamaica Line),Myrtle–Willoughby Avenues station,Myrtle–Wyckoff Avenues station,Nassau Avenue station,Neck Road station,Neptune Avenue station,Nevins Street station,New Lots Avenue station (BMT Canarsie Line),New Lots Avenue station (IRT New Lots Line),62nd Street/New Utrecht Avenue station,Newkirk Avenue station,Newkirk Plaza station,Norwood Avenue station,Nostrand Avenue station (IND Fulton Street Line),Nostrand Avenue station (IRT Eastern Parkway Line),Ocean Parkway station,Park Place station (BMT Franklin Avenue Line),Parkside Avenue station,Pennsylvania Avenue station (IRT New Lots Line),President Street–Medgar Evers College station,Prospect Avenue station (BMT Fourth Avenue Line),Prospect Park station (BMT lines),Ralph Avenue station (IND Fulton Street Line),Rockaway Avenue station (IND Fulton Street Line),Rockaway Avenue station (IRT New Lots Line),Saratoga Avenue station (IRT New Lots Line),Sheepshead Bay station,Shepherd Avenue station,Smith–Ninth Streets station,Sterling Street station,Sutter Avenue–Rutland Road station,Sutter Avenue station,Union Street station (BMT Fourth Avenue Line),Utica Avenue station,Van Siclen Avenue station (BMT Jamaica Line),Van Siclen Avenue station (IND Fulton Street Line),Van Siclen Avenue station (IRT New Lots Line),West Eighth Street–New York Aquarium station,Wilson Avenue station,Winthrop Street station,York Street station (IND Sixth Avenue Line)";
const listOfBrooklynStations = longlistOfBrooklynStations.split(",");

const longlistOfManhattanStations = "First Avenue station (BMT Canarsie Line),Second Avenue station,Third Avenue station (BMT Canarsie Line),Seventh Avenue station (IND lines),Eighth Street–New York University station,14th Street/Eighth Avenue station,14th Street/Sixth Avenue station,14th Street–Union Square station,18th Street station (IRT Broadway–Seventh Avenue Line),23rd Street station (BMT Broadway Line),23rd Street station (IND Eighth Avenue Line),23rd Street station (IND Sixth Avenue Line),23rd Street station (IRT Broadway–Seventh Avenue Line),23rd Street station (IRT Lexington Avenue Line),28th Street station (BMT Broadway Line),28th Street station (IRT Broadway–Seventh Avenue Line),28th Street station (IRT Lexington Avenue Line),33rd Street station (IRT Lexington Avenue Line),34th Street–Penn Station (IND Eighth Avenue Line),34th Street–Penn Station (IRT Broadway–Seventh Avenue Line),34th Street–Herald Square station,34th Street–Hudson Yards station,42nd Street–Bryant Park/Fifth Avenue station,47th–50th Streets–Rockefeller Center station,49th Street station (BMT Broadway Line),50th Street station (IND lines),50th Street station (IRT Broadway–Seventh Avenue Line),57th Street–Seventh Avenue station,57th Street station (IND Sixth Avenue Line),59th Street–Columbus Circle station,66th Street–Lincoln Center station,68th Street–Hunter College station,72nd Street station (IND Eighth Avenue Line),72nd Street station (IRT Broadway–Seventh Avenue Line),72nd Street station (Second Avenue Subway),77th Street station (IRT Lexington Avenue Line),79th Street station (IRT Broadway–Seventh Avenue Line),81st Street–Museum of Natural History station,86th Street station (IND Eighth Avenue Line),86th Street station (IRT Broadway–Seventh Avenue Line),86th Street station (IRT Lexington Avenue Line),86th Street station (Second Avenue Subway),96th Street station (IND Eighth Avenue Line),96th Street station (IRT Broadway–Seventh Avenue Line),96th Street station (IRT Lexington Avenue Line),96th Street station (Second Avenue Subway),103rd Street station (IND Eighth Avenue Line),103rd Street station (IRT Broadway–Seventh Avenue Line),103rd Street station (IRT Lexington Avenue Line),110th Street station (IRT Lexington Avenue Line),116th Street–Columbia University station,116th Street station (IND Eighth Avenue Line),116th Street station (IRT Lenox Avenue Line),116th Street station (IRT Lexington Avenue Line),125th Street station (IND Eighth Avenue Line),125th Street station (IRT Broadway–Seventh Avenue Line),125th Street station (IRT Lenox Avenue Line),125th Street station (IRT Lexington Avenue Line),135th Street station (IND Eighth Avenue Line),135th Street station (IRT Lenox Avenue Line),137th Street–City College station,145th Street station (IND lines),145th Street station (IRT Broadway–Seventh Avenue Line),145th Street station (IRT Lenox Avenue Line),155th Street station (IND Concourse Line),155th Street station (IND Eighth Avenue Line),157th Street station,163rd Street–Amsterdam Avenue station,168th Street station (New York City Subway),175th Street station (IND Eighth Avenue Line),181st Street station (IND Eighth Avenue Line),181st Street station (IRT Broadway–Seventh Avenue Line),190th Street station,191st Street station,207th Street station,215th Street station,Astor Place station,Broadway–Lafayette Street/Bleecker Street station,Bowery station,Bowling Green station,Broad Street station (BMT Nassau Street Line),Brooklyn Bridge–City Hall/Chambers Street station,Canal Street station (IRT Broadway–Seventh Avenue Line),Canal Street station (IND Eighth Avenue Line),Canal Street station (New York City Subway),Cathedral Parkway–110th Street station (IND Eighth Avenue Line),Cathedral Parkway–110th Street station (IRT Broadway–Seventh Avenue Line),Central Park North–110th Street station,Chambers Street station (IRT Broadway–Seventh Avenue Line),Chambers Street–World Trade Center/Park Place/Cortlandt Street station,Christopher Street–Sheridan Square station,City Hall station (BMT Broadway Line),Delancey Street/Essex Street station,Dyckman Street station (IRT Broadway–Seventh Avenue Line),Dyckman Street station (IND Eighth Avenue Line),East Broadway station,Fifth Avenue–59th Street station,Fifth Avenue/53rd Street station,Franklin Street station (IRT Broadway–Seventh Avenue Line),Fulton Street station (New York City Subway),Grand Central–42nd Street station,Grand Street station (IND Sixth Avenue Line),Harlem–148th Street station,Houston Street station (IRT Broadway–Seventh Avenue Line),Inwood–207th Street station,Lexington Avenue/59th Street station,Lexington Avenue/51st Street station,Lexington Avenue–63rd Street station,Marble Hill–225th Street station,Prince Street station,Rector Street station (IRT Broadway–Seventh Avenue Line),Rector Street station (BMT Broadway Line),Roosevelt Island station,South Ferry/Whitehall Street station,Spring Street station (IND Eighth Avenue Line),Spring Street station (IRT Lexington Avenue Line),Times Square–42nd Street/Port Authority Bus Terminal station,Wall Street station (IRT Broadway–Seventh Avenue Line),Wall Street station (IRT Lexington Avenue Line),West Fourth Street–Washington Square station,WTC Cortlandt station";
const listOfManhattanStations = longlistOfManhattanStations.split(",");

const longlistOfQueensStations = "21st Street–Queensbridge station,21st Street station (IND Crosstown Line),30th Avenue station,33rd Street–Rawson Street station,36th Avenue station,36th Street station (IND Queens Boulevard Line),39th Avenue station (BMT Astoria Line),40th Street–Lowery Street station,46th Street–Bliss Street station,46th Street station (IND Queens Boulevard Line),52nd Street station (IRT Flushing Line),61st Street–Woodside station,63rd Drive–Rego Park station,65th Street station (IND Queens Boulevard Line),67th Avenue station,69th Street station (IRT Flushing Line),75th Avenue station,75th Street–Elderts Lane station,80th Street station (IND Fulton Street Line),82nd Street–Jackson Heights station,85th Street–Forest Parkway station,88th Street station,90th Street–Elmhurst Avenue station,103rd Street–Corona Plaza station,104th Street station (BMT Jamaica Line),104th Street station (IND Fulton Street Line),111th Street station (BMT Jamaica Line),111th Street station (IRT Flushing Line),111th Street station (IND Fulton Street Line),121st Street station (BMT Jamaica Line),169th Street station (IND Queens Boulevard Line),Aqueduct–North Conduit Avenue station,Aqueduct Racetrack station,Astoria–Ditmars Boulevard station,Astoria Boulevard station,Beach 25th Street station,Beach 36th Street station,Beach 44th Street station,Beach 60th Street station,Beach 67th Street station,Beach 90th Street station,Beach 98th Street station,Beach 105th Street station,Briarwood station,Broad Channel station,Broadway station (BMT Astoria Line),Court Square–23rd Street station,Elmhurst Avenue station,Far Rockaway–Mott Avenue station,Flushing–Main Street station (IRT Flushing Line),Forest Avenue station,Forest Hills–71st Avenue station,Fresh Pond Road station,Grand Avenue–Newtown station,Halsey Street station (BMT Canarsie Line),Howard Beach–JFK Airport station,Hunters Point Avenue station,Jamaica–179th Street station,Jamaica–Van Wyck station,Jamaica Center–Parsons/Archer station,Junction Boulevard station,Kew Gardens–Union Turnpike station,Mets–Willets Point station (IRT Flushing Line),Middle Village–Metropolitan Avenue station,Myrtle–Wyckoff Avenues station,Northern Boulevard station,Ozone Park–Lefferts Boulevard station,Parsons Boulevard station,Queens Plaza station,Queensboro Plaza station,Rockaway Boulevard station,Jackson Heights–Roosevelt Avenue/74th Street station,Seneca Avenue station,Steinway Street station,Sutphin Boulevard–Archer Avenue–JFK Airport station,Sutphin Boulevard station (IND Queens Boulevard Line),Vernon Boulevard–Jackson Avenue station,Woodhaven Boulevard station (BMT Jamaica Line),Woodhaven Boulevard station (IND Queens Boulevard Line)";
const listOfQueensStations = longlistOfQueensStations.split(",");

const longlistOfBronxStations = "Third Avenue–138th Street station,Third Avenue–149th Street station,138th Street–Grand Concourse station,149th Street–Grand Concourse station,161st Street–Yankee Stadium station,167th Street station (IND Concourse Line),167th Street station (IRT Jerome Avenue Line),170th Street station (IND Concourse Line),170th Street station (IRT Jerome Avenue Line),174th Street station (IRT White Plains Road Line),174th–175th Streets station,176th Street station,182nd–183rd Streets station,183rd Street station (IRT Jerome Avenue Line),219th Street station,225th Street station,231st Street station,233rd Street station,238th Street station,Allerton Avenue station,Baychester Avenue station,Bedford Park Boulevard–Lehman College station,Bedford Park Boulevard station,Bronx Park East station,Brook Avenue station,Buhre Avenue station,Burke Avenue station,Burnside Avenue station,Castle Hill Avenue station,Cypress Avenue station,East 143rd Street–St. Mary's Street station,East 149th Street station,East 180th Street station,Eastchester–Dyre Avenue station,Elder Avenue station,Fordham Road station (IND Concourse Line),Fordham Road station (IRT Jerome Avenue Line),Freeman Street station,Gun Hill Road station (IRT Dyre Avenue Line),Gun Hill Road station (IRT White Plains Road Line),Hunts Point Avenue station,Intervale Avenue station,Jackson Avenue station (IRT White Plains Road Line),Kingsbridge Road station (IND Concourse Line),Kingsbridge Road station (IRT Jerome Avenue Line),Longwood Avenue station,Middletown Road station,Morris Park station,Morrison Avenue–Soundview station,Mosholu Parkway station,Mount Eden Avenue station,Nereid Avenue station,Norwood–205th Street station,Parkchester station,Pelham Bay Park station,Pelham Parkway station (IRT Dyre Avenue Line),Pelham Parkway station (IRT White Plains Road Line),Prospect Avenue station (IRT White Plains Road Line),Simpson Street station,St. Lawrence Avenue station,Tremont Avenue station,Van Cortlandt Park–242nd Street station,Wakefield–241st Street station,West Farms Square–East Tremont Avenue station,Westchester Square–East Tremont Avenue station,Whitlock Avenue station,Woodlawn station (IRT Jerome Avenue Line),Zerega Avenue station";
const listOfBronxStations = longlistOfBronxStations.split(",");

const longlistOfStatenIslandStations = "Annadale station,Arthur Kill station,Bay Terrace station,Clifton station,Dongan Hills station,Eltingville station,Grant City station,Grasmere station,Great Kills station,Huguenot station,Jefferson Avenue station,New Dorp station,Oakwood Heights station,Old Town station,Pleasant Plains station,Prince's Bay station,Richmond Valley station,St. George Terminal,Stapleton station,Tompkinsville station,Tottenville station";
const listOfStatenIslandStations = longlistOfStatenIslandStations.split(",");