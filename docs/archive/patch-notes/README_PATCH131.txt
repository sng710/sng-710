SNG-710 PATCH 131

Purpose
- Convert the newly supplied Kutz family photos to WebP without rotating or otherwise changing the images.
- Add the converted images to the relevant Kutz family memorial pages in people.js.

Included changes
- assets/js/people.js
- assets/site-version.json (version 330)
- new WebP files under assets/img/

Kutz pages updated
- aviv_k
- livnat_k
- rotem_k
- yonatan_k
- yiftach_k

Notes
- No HTML templates were changed.
- No existing text content was changed.
- Images that include the full family were added to each relevant family member page.
- Images were converted to WebP losslessly and kept in their provided orientation.
