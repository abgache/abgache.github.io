<?php
$request_uri = $_SERVER['REQUEST_URI'];
$base_path = '/';  // Ajustez selon votre configuration

// Liste des pages valides
$valid_pages = [
    'index.html',
    'reglement.html',
    'faq.html',
    'mentions-legales.html',
    'confidentialite.html'
];

// Nettoyage de l'URI
$requested_page = trim(str_replace($base_path, '', $request_uri), '/');
if (empty($requested_page)) {
    $requested_page = 'index.html';
}

// Vérification si la page existe
if (in_array($requested_page, $valid_pages) && file_exists($requested_page)) {
    include($requested_page);
} else {
    include('404.html');
}
?>
