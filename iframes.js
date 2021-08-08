function get_iframe_element() {
    const iframe_element = document.getElementById("iframe");
    return iframe_element
}


function get_current_iframe() {
    const iframe_element = get_iframe_element();
    const iframe = iframe_element.src;
    return iframe
}


function set_iframe(iframe) {
    const iframe_element = get_iframe_element();
    iframe_element.src = ( iframe + ".html" );
}
