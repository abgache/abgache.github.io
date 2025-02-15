<?php
$uri = parse_url($_SERVER['REQUEST_URI'])['path'];
$file = __DIR__ . $uri;

if (is_file($file)) {
    return false;
} else {
    // Si le fichier n'existe pas, renvoyer vers 404.html
    include __DIR__ . '/404.html';
}
?>
