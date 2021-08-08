ranks = {
  "Admin": ["GoldenHandYT", "TWITCHgoldenhand", "Yucii", "PaxonicYT"],
  "Moderator": ["Asqvarna"],
  "Content": ["lpalex22", "DerTev", "DarfNichtMehr"],
  "Ehemaliges Mitglied": ["Dunkelmann", "zAwenix", "DasHausaufgabe"]
}


function get_api_page_url(username)
{
    const proxy = "https://api.goldenarmy.de/stats/";
    const url = ( proxy + username );
    return url
}


function get_profile_picture_url(username)
{
    const proxy = "https://minotar.net/bust/";
    const ending = "/1024.png";
    const url = ( proxy + username + ending);
    return url
}


function get_booster_url() {
    const url = "https://api.goldenarmy.de/booster";
    return url
}


function get_boosters()
{
    const url = get_booster_url();

    const request = new XMLHttpRequest();
    request.open("GET", url, false );
    request.send();

    if ( request.status == 200 )
    {
        return request.responseText;
    }
    else
    {
        console.log( "Error: " + request.status );
        return "";
    }
}


function get_stats(username)
{
    const url = get_api_page_url(username);

    const request = new XMLHttpRequest();
    request.open("GET", url, false );
    request.send();

    if ( request.status == 200 )
    {
        return request.responseText;
    }
    else
    {
        console.log( "Error: " + request.status );
        return "";
    }
}

function hide_loading_spin()
{
    document.getElementById("playerstats-loading").hidden = true;
    if ( ( document.getElementById("stats") ) != ( null ) ) {
        document.getElementById("stats").hidden = false;
    }
    else {
        document.getElementById("boosters").hidden = false;
    }
}


function show_loading_spin()
{
    document.getElementById("playerstats-loading").hidden = false;
    if ( ( document.getElementById("stats") ) != ( null ) ) {
        document.getElementById("stats").hidden = true;
    }
    else {
        document.getElementById("boosters").hidden = true;
    }
}


function hide_stats()
{
    const stats = document.getElementsByClassName("stats");
    for ( stat in stats ) {
        for ( children in stats[stat].children ) {
            if ( ( stats[stat].children[children].id != "" ) && ( stats[stat].children[children].id != null ) ) {
                document.getElementById(stats[stat].children[children].id).parentElement.hidden = true;
            }
        }
    }
}


function hide_boosters()
{
    const boosters = document.getElementsByClassName("boosters");
    for ( booster in boosters ) {
        boosters[booster].hidden = true;
    }
}


function set_booster_values(boosters)
{
    document.getElementById("boosters-active").hidden = true;
    document.getElementById("no-boosters-active").hidden = false;
    hide_boosters();
    for ( booster in boosters ) {
        if ( ( document.getElementById(booster) != null ) && ( boosters[booster] != "0" ) ) {
            document.getElementById( ( booster + "-level" ) ).parentElement.hidden = false;
            document.getElementById( ( booster + "-level" ) ).innerHTML = boosters[booster];

            document.getElementById("boosters-active").hidden = false;
            document.getElementById("no-boosters-active").hidden = true;
        }
    }
}


function set_stats_values(stats)
{
    document.getElementById("not-selected").hidden = true;
    document.getElementById("no-stats").hidden = false;
    hide_stats();
    for ( stat in stats ) {
        if ( document.getElementById(stat) != null ) {
            document.getElementById(stat).parentElement.hidden = false;
            document.getElementById("no-stats").hidden = true;
            document.getElementById(stat).innerHTML = stats[stat];
            if ( document.getElementById(stat).id == "kontostand" ) {
                document.getElementById(stat).innerHTML = ( stats[stat] + "$" );
            }
        }
    }
}


function get_rank_field()
{
    const rank_field = document.getElementById("rank");
    return rank_field
}


function show_rank(username)
{
    var rank_field = get_rank_field();
    for ( rank in ranks ) {
        const users = ranks[rank];
        for ( user in users ) {
            if ( users[user].toLowerCase() == username.toLowerCase() ) {
                rank_field.innerHTML = rank;
                return
            }
            else {
               rank_field.innerHTML = "";
            }
        }
    }
}


function show_boosters()
{
    show_loading_spin();

    const boosters = get_boosters();
    set_booster_values(JSON.parse(boosters));

    hide_loading_spin();
}



function show_playerstats()
{
    show_loading_spin();

    const username = document.getElementById("username-input").value;
    const userstats = get_stats(username);
    show_rank(username);
    document.getElementById("skin-preview").src = get_profile_picture_url(username);
    set_stats_values(JSON.parse(userstats));

    hide_loading_spin();
}

