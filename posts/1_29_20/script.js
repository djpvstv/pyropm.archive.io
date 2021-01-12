
function open_json() {   
    return new Promise(function (resolve) {
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", "data.json");
        oReq.send();

        function reqListener () {
            resolve(JSON.parse(oReq.responseText))
        }
	})
}

function add_metadata(name, content) {
    var meta = document.createElement('meta');
    meta.name       = name;
    meta.content    = content;
    document.getElementsByTagName('head')[0].appendChild(meta);
}

var json_data = open_json();

document.title = json_data["title"] + " - PyroPM";
add_metadata("author",      json_data["author"]);
add_metadata("keywords",    "PyroPM, Project M, ProjectM, PM, project m, projectm, pm, ssbpm");
add_metadata("theme-color", "#66023C");
if (json_data.category == "post") {
    add_metadata("description", "Read the post from " + json_data["date"] + ".");
}
/*
if (json_data.category == "content") {
    add_metadata("description", json_data.description)
}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@nytimes">
<meta name="twitter:creator" content="@SarahMaslinNir">
<meta name="twitter:title" content="Parade of Fans for Houston’s Funeral">
<meta name="twitter:description" content="NEWARK - The guest list and parade of limousines with celebrities emerging from them seemed more suited to a red carpet event in Hollywood or New York than than a gritty stretch of Sussex Avenue near the former site of the James M. Baxter Terrace public housing project here.">
<meta name="twitter:image" content="http://graphics8.nytimes.com/images/2012/02/19/us/19whitney-span/19whitney-span-articleLarge.jpg"></meta>
*/
