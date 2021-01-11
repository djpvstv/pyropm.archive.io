
const { link } = require("fs");

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
        result = xmlhttp.responseText;
    }
    return result;
}

var in_file = loadFile("https://pyropm.github.io/content/content.json");
var json_data = JSON.parse(in_file);
const installed_mods = json_data.mods;

var html_content = [];
var html_ids = [];

for (let i = 0; i < installed_mods.length; i++) {
    var mod_file = loadFile("https://pyropm.github.io/content/" + installed_mods[i].name);
    json_data = JSON.parse(mod_file);
    var id = i + " link";
    html_ids.push(i.toString());
    if (json_data.category == "character") {
        var html_block = (
            <div class = "mod_wrapper">
                <div class = "mod_body" id = {json_data.name}>
                    <div class = "mod_text" id = "mod_text">
                        <div class = "row mod_name">{json_data.name}</div>
                        <div class = "row mod_author">by {json_data.author}</div>
                        <div class = "row mod_description">{json_data.description}</div>
                        <div class = "mod_link_1" id = "mod_link">
                            <div class = "mod_download" id = "link" href = {json_data.download_direct}>Brawl Vault</div>
                        </div>
                        <div class = "mod_link_2" id = "mod_link">
                            <div class = "mod_download" id = "link" href = {json_data.download}>Direct Download</div>
                        </div>
                    </div>
                    <div class = "mod_image" id = "link" href = {json_data.image_album}>
                        <img class = "mod_img" src = {json_data.image}/>
                    </div>
                </div>
            </div>
        );
    }
    else if (json_data.category == "guide") {
        var link_blocks = [];
        for (let i = 0; i < json_data.links.length; i++) {
            link_blocks.push(<div class = "mod_link_1" id = "mod_link"><div class = "mod_download" id = "link" href = {json_data.links[i].href}>{json_data.links[i].name}</div></div>);
        }
        var html_block = (
            <div class = "mod_wrapper"><div class = "mod_body" id = {json_data.name}><div class = "mod_text" id = "mod_text"><div class = "row mod_name">{json_data.name}</div><div class = "row mod_author">by {json_data.author}</div><div class = "row mod_description">{json_data.description}</div>{link_blocks}</div></div></div>
        );
    }
    html_content.push(html_block);
}

ReactDOM.render(
    html_content,
    document.getElementById("mod_container")
);
